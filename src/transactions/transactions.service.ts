import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Role, Transaction, TransactionStatus } from '@prisma/client';
import { BaseRepository } from 'src/common/base-repository';
import { PrismaService } from 'src/common/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PayloadOfUser } from 'src/auth/strategies/jwt.strategy';
import { FindTransactionsDto } from './dto/find-transactions.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';

@Injectable()
export class TransactionsService extends BaseRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Transaction);
    }

    findTransactions(query: FindTransactionsDto, user: PayloadOfUser) {
        const filter: Prisma.TransactionWhereInput = { ...(user.role === Role.CUSTOMER && { userId: user.id }) };
        const include = this.constructInclude(query);

        return super.findAll({ ...query, filter, include });
    }

    async findTransaction(id: string, query: FindTransactionDto, user: PayloadOfUser) {
        const include = this.constructInclude(query);

        const transaction: Transaction = await super.findOne(id, { include });
        if (user.role === Role.CUSTOMER && transaction.userId !== user.id) {
            throw new BadRequestException(`You don't have access`);
        }

        return transaction;
    }

    async createTransaction({ cartIds }: CreateTransactionDto, user: PayloadOfUser) {
        let totalAmount = 0;
        let items: Prisma.TransactionItemCreateManyTransactionInput[] = [];

        const carts = await this.prisma.cart.findMany({
            where: { id: { in: cartIds }, userId: user.id },
            include: { book: true },
        });
        if (carts.length !== cartIds.length) throw new BadRequestException('Invalid cart ids');

        return this.prisma.$transaction(async (prisma) => {
            await Promise.all(
                carts.map(async ({ book, ...cart }) => {
                    if (book.stock < cart.qty) {
                        throw new BadRequestException(`The quantity of '${book.title}' exceeds the available stock`);
                    }

                    await prisma.book.update({ where: { id: cart.bookId }, data: { stock: { decrement: cart.qty } } });

                    totalAmount += cart.qty * Number(book.price);

                    items.push({ bookId: cart.bookId, price: book.price, quantity: cart.qty });
                }),
            );

            await prisma.cart.deleteMany({ where: { id: { in: cartIds } } });

            return prisma.transaction.create({
                data: {
                    totalAmount,
                    userId: user.id,
                    items: { createMany: { data: items } },
                    status: TransactionStatus.PENDING,
                },
            });
        });
    }

    constructInclude(query: FindTransactionsDto): Prisma.TransactionInclude {
        return {
            user: !!query.includeUser,
            ...(!!query.includeItems && {
                items: { include: { book: { select: { title: true, author: true, description: true } } } },
            }),
        };
    }
}
