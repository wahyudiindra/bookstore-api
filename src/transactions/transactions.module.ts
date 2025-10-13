import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [CommonModule],
    controllers: [TransactionsController],
    providers: [TransactionsService],
})
export class TransactionsModule {}
