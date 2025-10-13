import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'Friendship vol.3' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ default: 'Isabella Rivera' })
    author?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ default: 'A moving tale about friendship, loss, and the courage to start over again.' })
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ default: 150000 })
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ default: 5 })
    stock: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isActive: boolean;
}
