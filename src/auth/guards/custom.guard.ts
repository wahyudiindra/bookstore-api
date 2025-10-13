import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/common/prisma.service';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';

@Injectable()
export class CustomGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const { user, headers } = context.switchToHttp().getRequest();
        const accessToken = this.extractToken(headers['authorization'] || headers['Authorization']);
        if (!accessToken) throw new UnauthorizedException('Missing token');
        const session = await this.prisma.session.findUnique({ where: { accessToken, isActive: true } });
        if (!session) throw new UnauthorizedException('Session expired or replaced');

        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        return !roles || roles.includes(user?.role);
    }

    private extractToken(authorization: string): string | null {
        if (!authorization || !authorization.startsWith('Bearer ')) return null;
        return authorization.substring(7);
    }
}
