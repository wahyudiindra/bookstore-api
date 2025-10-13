import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
    filter?: any;
    include?: any;
    select?: any;

    @IsOptional()
    @IsNumber()
    take?: number = 10;

    @IsOptional()
    @IsNumber()
    skip?: number = 0;

    @IsOptional()
    orderBy?: any = { createdAt: 'desc' };

    @IsOptional()
    @IsString()
    where?: string | any = undefined;
}
