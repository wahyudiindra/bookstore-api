import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CustomGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const { user } = context.switchToHttp().getRequest();
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        return !roles || roles.includes(user?.role);
    }
}
