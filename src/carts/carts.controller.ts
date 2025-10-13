import { Body, Controller, Post, Request } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Role } from '@prisma/client';
import { Authorize, Roles } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCartDto } from './dto/create-book.dto';

@Authorize()
@ApiBearerAuth()
@ApiTags('Carts')
@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @Post()
    @Roles([Role.CUSTOMER])
    create(@Body() data: CreateCartDto, @Request() req) {
        return this.cartsService.createCart(data, req.user);
    }
}
