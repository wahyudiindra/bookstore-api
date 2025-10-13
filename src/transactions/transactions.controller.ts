import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Authorize, Roles } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionsDto } from './dto/find-transactions.dto';

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

    @Get()
    findAll(@Query() query: FindTransactionsDto, @Request() req) {
        return this.transactionsService.findTransactions(query, req.user);
    }
}
