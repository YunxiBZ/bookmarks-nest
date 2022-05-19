import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signup() {
    // return response, nest will handle the response type (text or json etc)
    return { message: 'I am signed up' };
  }

  signin() {
    return { message: 'I am signed in' };
  }
}
