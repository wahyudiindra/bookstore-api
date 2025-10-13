import { BadRequestException } from '@nestjs/common';
import { isNotEmptyObject } from 'class-validator';
import { PrismaService } from 'src/common/prisma.service';
import { FindOneDto } from './dto/find-one.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PayloadOfUser } from 'src/auth/strategies/jwt.strategy';
import { PaginationResponseType, PaginationUtils } from './pagination.utils';

export class BaseRepository {
    private prismaService: PrismaService;

    public get resource(): any {
        return this.prismaService[`${this.resourceName}`];
    }

    constructor(
        prisma: PrismaService,
        private resourceName: string,
    ) {
        this.prismaService = prisma;
    }

    async findAll(query: PaginationQueryDto): Promise<PaginationResponseType> {
        const { skip, take, orderBy, include, select, where } = PaginationUtils.transform(query);
        const total = await this.resource.count({ where });
        const data = await this.resource.findMany({
            skip,
            take,
            where,
            orderBy,
            ...(isNotEmptyObject(select) ? { select } : { ...(isNotEmptyObject(include) && { include }) }),
        });

        return { total, data };
    }

    async findOne(id: string | number, query?: FindOneDto) {
        const data = await this.resource.findUnique({
            where: { id },
            ...(query?.include && { include: query?.include }),
        });

        if (!data) throw new BadRequestException('Data not found');
        return data;
    }

    async create(data: any) {
        try {
            return await this.resource.create({ data });
        } catch (err) {
            throw new BadRequestException(
                err.code === 'P2002'
                    ? `Duplicated data (${err?.meta?.target}).`
                    : (err?.response?.message ?? err?.message),
            );
        }
    }

    async update(id: string | number, data: any, user?: PayloadOfUser) {
        await this.findOne(id);

        try {
            return await this.resource.update({ where: { id }, data });
        } catch (err) {
            throw new BadRequestException(
                err.code === 'P2002'
                    ? `Duplicated data (${err?.meta?.target}).`
                    : (err?.response?.message ?? err?.message),
            );
        }
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.resource.delete({ where: { id } });
    }
}
