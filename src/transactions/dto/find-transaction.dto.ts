import { PickType } from '@nestjs/swagger';
import { FindTransactionsDto } from './find-transactions.dto';

export class FindTransactionDto extends PickType(FindTransactionsDto, ['includeUser', 'includeItems']) {}
