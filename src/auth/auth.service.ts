import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // delete the hash before return user info
      delete user.hash;
      // return the saved user
      // return response, nest will handle the response type (text or json etc)
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //  'P2002' is a Prisma Error Code : "Unique constraint failed on the {constraint}"
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  signin() {
    return { message: 'I am signed in' };
  }
}
