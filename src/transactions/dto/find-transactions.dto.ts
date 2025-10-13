import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { FindManyDto } from 'src/common/base-repository/dto/find-many.dto';

export class FindTransactionsDto extends OmitType(FindManyDto, ['include', 'searchBy', 'search', 'filter'] as const) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'createdAt',
        description: 'Can only be one of the fields: id, status, totalAmount, userId, createdAt, and updatedAt',
    })
    orderBy?: string = 'createdAt';

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['true', 'false'] })
    @Transform(({ value }) => ['true', '1', true, 1].includes(value))
    includeUser?: string;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['true', 'false'] })
    @Transform(({ value }) => ['true', '1', true, 1].includes(value))
    includeItems?: string;
}
