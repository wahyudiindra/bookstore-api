import { Body, Controller, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authorize, Roles } from 'src/auth/decorators/auth.decorator';
import { FindBooksDto } from './dto/find-books.dto';
import { Role } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Authorize()
@ApiBearerAuth()
@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findAll(@Query() query: FindBooksDto, @Request() req) {
        return this.booksService.findBooks(query, req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.booksService.findBook(id, req.user);
    }

    @Get(':id/report')
    @Roles([Role.ADMIN])
    findReport(@Param('id') id: string) {
        return this.booksService.findReport(id);
    }

    @Post()
    @Roles([Role.ADMIN])
    create(@Body() data: CreateBookDto) {
        return this.booksService.create(data);
    }

    @Patch(':id')
    @Roles([Role.ADMIN])
    update(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.booksService.update(id, data);
    }
}
