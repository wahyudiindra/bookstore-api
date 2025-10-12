import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'admin@bookstore.id' })
    identifier: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'password' })
    password: string;
}
