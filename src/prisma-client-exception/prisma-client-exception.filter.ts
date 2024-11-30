import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode: number = HttpStatus.BAD_REQUEST;
    const code = exception.code;
    const name = exception.name;
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': // "Unique constraint failed on the {constraint}"
        statusCode = HttpStatus.CONFLICT;
        response.status(statusCode).json({ statusCode, name, code, message });
        break;
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        response.status(statusCode).json({ statusCode, name, code, message });
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
