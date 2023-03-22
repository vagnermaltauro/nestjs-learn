import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
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

  async list() {
    return this.prisma.users.findMany();
  }

  async listOne(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, data: UpdatePutUserDTO) {
    return this.prisma.users.update({
      data,
      where: {
        id
      }
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    return this.prisma.users.update({
      data,
      where: {
        id
      }
    });
  }
}
