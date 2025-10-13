import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { isObject } from 'class-validator';
import { PrismaService } from '../prisma.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    constructor(private prisma: PrismaService) {}

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        if (exception instanceof HttpException) {
            const statusCode = exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

            let message = exception.getResponse() || 'Internal server error';
            if (isObject(message)) message = message?.['message'];

            response.status(statusCode).json({ statusCode, message });
        } else {
            await this.prisma.errorLog.create({
                data: {
                    message: (exception as any)?.message || 'An unexpected error occurred',
                    stack: exception instanceof Error ? exception.stack : null,
                    endpoint: request.url,
                },
            });
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                ...(process.env.NODE_ENV !== 'production' && {
                    error: (exception as any)?.message || 'An unexpected error occurred',
                    timestamp: new Date().toISOString(),
                    path: request.url,
                }),
            });
        }
    }
}
