import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({email, name, password}: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    return await this.prisma.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
      }
    });
  }

  async list() {
    return this.prisma.users.findMany();
  }

  async listOne(id: number) {
    await this.exists(id);

    return this.prisma.users.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, {email, name, password, role}: UpdatePutUserDTO) {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prisma.users.update({
      data:{email, name, password: hashedPassword, role},
      where: {
        id
      }
    });
  }

  async updatePartial(id: number, {email, name, password, role}: UpdatePatchUserDTO) {

    const data: any = {};

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

      data.password = hashedPassword;
    }

    if (role) {
      data.role = role;
    }

    return this.prisma.users.update({
      data,
      where: {
        id
      }
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.users.delete({
      where: {
        id
      }
    });
  }

  async exists(id: number) {
    if (!(await this.prisma.users.count({
      where: {
        id
      }
    }))) {
      throw new NotFoundException(`ID ${id} not found in db`);
    }
  }
}
