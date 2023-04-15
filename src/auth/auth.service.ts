import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async createToken(user: users) {
    // return this.JWTService.sign();
  }

  async checkToken(token: string) {
    // return this.JWTService.verify();
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('email our password is not correct!');
    }

    return user;
  }

  async forget(email: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('email is not correct!');
    }

    // TO DO: send email...

    return true;
  }

  async reset(password: string, token: string) {
    const id = 0;

    await this.prisma.users.update({
      where: {
        id
      },
      data: {
        password: password,
      }
    });
  }
}
