import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { FindBooksDto } from './find-books.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindBookDto extends PickType(FindBooksDto, ['includeCarts', 'includeTransactions']) {
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ enum: ['true', 'false'] })
    @Transform(({ value }) => ['true', '1', true, 1].includes(value))
    includeReport?: string;
}
