import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  // there are second params for the name of strategy, by default it is the name of the file, so 'jwt', but we can modify it
  //'jwt-refresh' // for export
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }) {
    // console.log({
    //   payload,
    // });
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    delete user.hash;
    return user;
  }
}
