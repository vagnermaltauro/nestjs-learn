import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: users) {
    return {
      accessToken: this.JWTService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      }, {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: 'API NestJS',
        audience: 'users',
      }),
    };
  }

  async checkToken(token: string){
    try {
      const data =  this.JWTService.verify(token, {
        audience: 'users',
        issuer: 'API NestJS',
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async isValidToken(token: string) {
    try {
      await this.checkToken(token);

      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('email or password is not correct!');
    }

    return this.createToken(user);
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

    const user = await this.prisma.users.update({
      where: {
        id
      },
      data: {
        password: password,
      }
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
