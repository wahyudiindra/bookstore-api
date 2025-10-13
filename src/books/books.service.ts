import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
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
}
