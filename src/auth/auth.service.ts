import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheType } from 'src/common/enums/cache-type';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async validateUser(identifier: string, password: string): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { email: identifier } });
        if (!user) throw new BadRequestException('Invalid Credential');

        const cacheKey = `${CacheType.LOGIN_ATTEMP}:${user.id}`;
        let loginAttemp = Number(await this.cacheManager.get(cacheKey)) || 0;
        if (loginAttemp >= 5) throw new BadRequestException('Too many failed attemps');

        const authorized = await bcrypt.compare(password, user.password);
        if (!authorized) {
            loginAttemp++;
            await this.cacheManager.set(cacheKey, loginAttemp, 5 * 60 * 1000);
            if (loginAttemp >= 5) throw new BadRequestException('Too many failed attemps');

            throw new BadRequestException('Invalid Credential');
        }

        return user;
    }

    async signIn(user: User) {
        const { id, email, name, role } = user;
        const accessToken = this.jwtService.sign({ id, email, name, role });

        await this.prisma.session.updateMany({ where: { userId: id }, data: { isActive: false } });
        await this.prisma.session.create({
            data: {
                userId: id,
                accessToken,
                isActive: true,
                expiredAt: dayjs(this.jwtService.decode(accessToken).exp * 1000).toDate(),
            },
        });
        return { accessToken, user };
    }
}
