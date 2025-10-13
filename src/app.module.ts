import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CartsModule } from './carts/carts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ExceptionsFilter } from './common/filters/exceptions.filter';
import { CommonModule } from './common/common.module';
import { ThrottleLimit } from './common/throttle.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot({ throttlers: [ThrottleLimit.MEDIUM.default] }),
        AuthModule,
        BooksModule,
        CartsModule,
        TransactionsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: ExceptionsFilter },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
    ],
})
export class AppModule {}
