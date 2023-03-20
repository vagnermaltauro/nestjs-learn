import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({email, name, password}: CreateUserDTO) {
    return await this.prisma.users.create({
      data: {
        email,
        name,
        password,
      }
    });
  }
}
