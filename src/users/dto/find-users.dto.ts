import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { FindManyDto } from 'src/common/base-repository/dto/find-many.dto';
import { JOINER, PaginationUtils } from 'src/common/base-repository/pagination.utils';

const searchBy: Prisma.UserScalarFieldEnum[] = ['email', 'name'];

export class FindUsersDto extends OmitType(FindManyDto, ['include', 'searchBy', 'filter'] as const) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'createdAt',
        description: 'Can only be one of the fields: id, email, name, role, createdAt, and updatedAt',
    })
    orderBy?: string = 'createdAt';

    @IsArray()
    @IsOptional()
    @Transform(PaginationUtils.constructArray)
    @ApiPropertyOptional({
        type: 'string',
        default: searchBy.join(JOINER),
        description: `Can only be a combination of fields: ${searchBy.join(', ')}`,
    })
    searchBy?: string[];
}
