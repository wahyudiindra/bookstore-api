import { BadRequestException, Injectable } from '@nestjs/common';
import { Book, Prisma, Role, TransactionStatus } from '@prisma/client';
import { BaseRepository } from 'src/common/base-repository';
import { PrismaService } from 'src/common/prisma.service';
import { PayloadOfUser } from 'src/auth/strategies/jwt.strategy';
import { FindBooksDto } from './dto/find-books.dto';
import { FindBookDto } from './dto/find-book.dto';

@Injectable()
export class BooksService extends BaseRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Book);
    }

    findBooks(query: FindBooksDto, user: PayloadOfUser) {
        const include = this.constructInclude(query, user);
        const filter: Prisma.BookWhereInput = {
            ...(user.role === Role.CUSTOMER && { stock: { gt: 0 }, isActive: true }),
        };
        return super.findAll({ ...query, filter, include });
    }

    async findBook(id: string, query: FindBookDto, user: PayloadOfUser): Promise<Book> {
        const include = this.constructInclude(query, user);
        const book: Book = await super.findOne(id, { include });
        if (user.role === Role.CUSTOMER) {
            if (!book.isActive) throw new BadRequestException(`You don't have access`);
            else if (!book.stock) throw new BadRequestException(`Stock is empty`);
        }

        return book;
    }

    constructInclude(query: FindBooksDto, user: PayloadOfUser): Prisma.BookInclude {
        if (user.role === Role.ADMIN) return {};

        return {
            ...(!!query.includeCarts && { carts: { where: { userId: user.id } } }),
            ...(!!query.includeTransactions && { transactionItems: { where: { transaction: { userId: user.id } } } }),
        };
    }
}
