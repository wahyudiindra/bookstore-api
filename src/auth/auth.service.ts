import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async validateUser(identifier: string, password: string): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { email: identifier } });
        if (!user) throw new BadRequestException('Invalid Credential');

        const authorized = await bcrypt.compare(password, user.password);
        if (!authorized) throw new BadRequestException('Invalid Credential');

        return user;
    }

    async signIn(user: User) {
        const { id, email, name, role } = user;
        return { accessToken: this.jwtService.sign({ id, email, name, role }), user };
    }
}
