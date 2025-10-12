import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/auth/decorators/auth.decorator';

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
}
