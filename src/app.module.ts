import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { CartsModule } from './carts/carts.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, BooksModule, CartsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
