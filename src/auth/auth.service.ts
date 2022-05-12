import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    // return response, nest will handle the response type (text or json etc)
    return { message: 'I am signed up' };
  }

  signin() {
    return { message: 'I am signed in' };
  }
}
