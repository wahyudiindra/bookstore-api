import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type PayloadOfUser = {
    id: string;
    email: string;
    name: string;
    role: Role;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY as string,
        });
    }

    async validate(payload: any): Promise<PayloadOfUser> {
        return {
            id: payload.id,
            email: payload.email,
            name: payload.name,
            role: payload.role,
        };
    }
}
