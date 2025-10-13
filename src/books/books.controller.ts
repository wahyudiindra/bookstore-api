import { Controller, Get, Param, ParseIntPipe, Query, Request } from '@nestjs/common';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/auth/decorators/auth.decorator';
import { FindBooksDto } from './dto/find-books.dto';

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
}
