import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
@Controller('users')
export class UserController {
  // Add a authoriezd guard for the route, AuthGuard is created by passport library, jwt is the default
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    console.log({
      user: req.user,
    });
    return req.user;
  }
}
