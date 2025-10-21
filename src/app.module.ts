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
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis, { Keyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';

@Module({
    imports: [
        CommonModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot({ throttlers: [ThrottleLimit.MEDIUM.default] }),
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async () => {
                return {
                    stores: [
                        new Keyv({ store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }) }),
                        new KeyvRedis(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`),
                    ],
                };
            },
        }),
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
