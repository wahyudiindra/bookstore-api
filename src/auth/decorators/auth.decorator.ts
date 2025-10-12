import { SetMetadata, UseGuards } from '@nestjs/common';
import { JwtGuard } from './../guards/jwt.guard';
import { Role } from '@prisma/client';
import { CustomGuard } from '../guards/custom.guard';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Roles = (roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const Authorize = () => UseGuards(JwtGuard, CustomGuard);
