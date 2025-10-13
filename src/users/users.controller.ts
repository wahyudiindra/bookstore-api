import { Controller, Get, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authorize, Roles } from 'src/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import { FindUsersDto } from './dto/find-users.dto';

@Authorize()
@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get()
    @Roles([Role.ADMIN])
    findAll(@Query() query: FindUsersDto) {
        return this.usersService.findAll(query);
    }
}
