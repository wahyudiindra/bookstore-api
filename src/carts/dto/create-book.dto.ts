import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCartDto {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ default: 1 })
    qty: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    bookId: string;
}
