import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from 'src/common/base-repository';
import { PrismaService } from 'src/common/prisma.service';
import { CreateCartDto } from './dto/create-book.dto';
import { PayloadOfUser } from 'src/auth/strategies/jwt.strategy';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class CartsService extends BaseRepository {
    constructor(
        prisma: PrismaService,
        private booksService: BooksService,
    ) {
        super(prisma, Prisma.ModelName.Cart);
    }

    async createCart({ qty, bookId }: CreateCartDto, user: PayloadOfUser) {
        const book = await this.booksService.findBook(bookId, user);
        if (book.stock < qty) throw new BadRequestException('The requested quantity exceeds the available stock');

        const newBook: Prisma.CartUncheckedCreateInput = { qty, bookId, userId: user.id };
        return await super.create(newBook);
    }
}
