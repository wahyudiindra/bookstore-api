import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from 'src/common/base-repository';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UsersService extends BaseRepository {
    constructor(prisma: PrismaService) {
        super(prisma, Prisma.ModelName.User);
    }
}
