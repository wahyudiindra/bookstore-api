import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Authorize, Public, Roles } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionsDto } from './dto/find-transactions.dto';
import { FindTransactionDto } from './dto/find-transaction.dto';
import { CallbackTransactionDto } from './dto/callback-transaction.dto';
import { SkipThrottle } from '@nestjs/throttler';

@Authorize()
@ApiBearerAuth()
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    findAll(@Query() query: FindTransactionsDto, @Request() req) {
        return this.transactionsService.findTransactions(query, req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Query() query: FindTransactionDto, @Request() req) {
        return this.transactionsService.findTransaction(id, query, req.user);
    }

    @Post()
    @Roles([Role.CUSTOMER])
    create(@Body() data: CreateTransactionDto, @Request() req) {
        return this.transactionsService.createTransaction(data, req.user);
    }

    @Public()
    @SkipThrottle()
    @Post('callback')
    async callback(@Body() data: CallbackTransactionDto) {
        return this.transactionsService.callback(data);
    }
}
