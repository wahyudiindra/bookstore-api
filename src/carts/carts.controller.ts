import { Body, Controller, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { CartsService } from './carts.service';
import { Role } from '@prisma/client';
import { Authorize, Roles } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCartDto } from './dto/create-cart.dto';
import { FindCartsDto } from './dto/find-carts.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Authorize()
@ApiBearerAuth()
@ApiTags('Carts')
@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) {}

    @Get()
    @Roles([Role.CUSTOMER])
    findAll(@Query() query: FindCartsDto, @Request() req) {
        return this.cartsService.findCarts(query, req.user);
    }

    @Post()
    @Roles([Role.CUSTOMER])
    create(@Body() data: CreateCartDto, @Request() req) {
        return this.cartsService.createCart(data, req.user);
    }

    @Put(':id')
    @Roles([Role.CUSTOMER])
    update(@Param('id') id: string, @Body() data: UpdateCartDto, @Request() req) {
        return this.cartsService.updateCart(id, data, req.user);
    }
}
