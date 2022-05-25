import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ROUTE: POST /auth/signup
  @Post('signup')
  // signup(@Req() request: Request) {
  signup(@Body() dto: AuthDto) {
    console.log(
      '🚀 ~ file: auth.controller.ts ~ line 14 ~ AuthController ~ signup ~ dto',
      dto,
    );

    return this.authService.signup(dto);
  }

  // ROUTE: POST /auth/signin
  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
