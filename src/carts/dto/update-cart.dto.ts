import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateCartDto {
    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ default: 1 })
    qty: number;
}
