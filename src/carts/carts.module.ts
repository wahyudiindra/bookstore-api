import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CommonModule } from 'src/common/common.module';
import { BooksModule } from 'src/books/books.module';

@Module({
    imports: [CommonModule, BooksModule],
    controllers: [CartsController],
    providers: [CartsService],
})
export class CartsModule {}
