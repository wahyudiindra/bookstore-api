import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CallbackTransactionDto {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    transactionId: string;

    @IsString()
    @ApiProperty()
    status: string;

    @IsString()
    @ApiPropertyOptional()
    someData?: string;
}
