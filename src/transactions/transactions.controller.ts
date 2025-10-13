import { Body, Controller, Post, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Authorize, Roles } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Authorize()
@ApiBearerAuth()
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    @Roles([Role.CUSTOMER])
    create(@Body() data: CreateTransactionDto, @Request() req) {
        return this.transactionsService.createTransaction(data, req.user);
    }
}
