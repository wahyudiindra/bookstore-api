import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationUtils } from '../pagination.utils';

export class FindManyDto {
    filter?: any;
    include?: any;
    select?: any;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({ default: 1 })
    page?: number = 1;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({ default: 10 })
    take?: number = 10;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ default: 'createdAt' })
    orderBy?: string = 'createdAt';

    @IsOptional()
    @IsEnum(Prisma.SortOrder)
    @ApiPropertyOptional({ enum: Prisma.SortOrder, default: 'desc' })
    sortBy?: Prisma.SortOrder = 'desc';

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    search?: string = undefined;

    @IsArray()
    @IsOptional()
    @Transform(PaginationUtils.constructArray)
    @ApiPropertyOptional({ type: 'string', description: 'Search only for string data type.' })
    searchBy?: string[];
}
