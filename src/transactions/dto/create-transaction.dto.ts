import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTransactionDto {
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ApiProperty()
    cartIds: string[];
}
