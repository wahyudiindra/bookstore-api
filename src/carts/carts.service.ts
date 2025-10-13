import { BadRequestException, Injectable } from '@nestjs/common';
import { Book, Cart, Prisma } from '@prisma/client';
import { BaseRepository } from 'src/common/base-repository';
import { PrismaService } from 'src/common/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { PayloadOfUser } from 'src/auth/strategies/jwt.strategy';
import { BooksService } from 'src/books/books.service';
import { FindCartsDto } from './dto/find-carts.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartsService extends BaseRepository {
    constructor(
        private prisma: PrismaService,
        private booksService: BooksService,
    ) {
        super(prisma, Prisma.ModelName.Cart);
    }

    findCarts(query: FindCartsDto, user: PayloadOfUser) {
        const filter: Prisma.CartWhereInput = { userId: user.id, book: { stock: { gt: 0 } } };
        const include: Prisma.CartInclude = { book: !!query.includeBook };
        return super.findAll({ ...query, filter, include });
    }

    async createCart({ qty, bookId }: CreateCartDto, user: PayloadOfUser) {
        const book = await this.booksService.findBook(bookId, user);
        if (book.stock < qty) throw new BadRequestException('The requested quantity exceeds the available stock');

        const newBook: Prisma.CartUncheckedCreateInput = { qty, bookId, userId: user.id };
        return await super.create(newBook);
    }

    async updateCart(id: string, data: UpdateCartDto, user: PayloadOfUser) {
        const include: Prisma.CartInclude = { book: true };
        const cart: Cart & { book: Book } = await this.findOne(id, { include });
        if (cart.userId !== user.id) {
            throw new BadRequestException(`You don't have access`);
        } else if (cart.book.stock < data.qty) {
            throw new BadRequestException('The requested quantity exceeds the available stock');
        }

        if (data.qty < 1) {
            const deletedCart = await this.prisma.cart.delete({ where: { id } });
            return { ...deletedCart, qty: 0 };
        }

        return this.prisma.cart.update({ where: { id }, data });
    }
}
