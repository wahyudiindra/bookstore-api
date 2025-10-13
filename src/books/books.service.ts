import { BadRequestException, Injectable } from '@nestjs/common';
import { Book, Prisma, Role } from '@prisma/client';
import { BaseRepository } from 'src/common/base-repository';
import { PrismaService } from 'src/common/prisma.service';
import { FindBooksDto } from './dto/find-books.dto';
import { PayloadOfUser } from 'src/auth/strategies/jwt.strategy';

@Injectable()
export class BooksService extends BaseRepository {
    constructor(prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Book);
    }

    findBooks(query: FindBooksDto, { role }: PayloadOfUser) {
        const filter: Prisma.BookWhereInput = { ...(role === Role.CUSTOMER && { stock: { gt: 0 }, isActive: true }) };
        return super.findAll({ ...query, filter });
    }

    async findBook(id: string, { role }: PayloadOfUser) {
        // TODO: need set include transaction or cart

        const book: Book = await super.findOne(id, {});
        if (role === Role.CUSTOMER) {
            if (!book.isActive) throw new BadRequestException(`You don't have access`);
            else if (!book.stock) throw new BadRequestException(`Stock is empty`);
        }

        return book;
    }
}
