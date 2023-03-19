import { CreateUserDTO } from './dto/create-user.dto';
import { Body, Controller, Post, Get, Param, Put, Patch, Delete } from '@nestjs/common';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() {email, name, password}: CreateUserDTO) {
    return { email, name, password };
  }

  @Get()
  async list() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param() params) {
    return { user: {}, params };
  }

  @Put(':id')
  async update(@Body() {email, name, password}: UpdatePutUserDTO, @Param() params) {
    return {
      method: 'put',
      email, name, password,
      params
    };
  }

  @Patch(':id')
  async updatePartial(@Body() {email, name, password}: UpdatePatchUserDTO, @Param() params) {
    return {
      method: 'patch',
      email, name, password,
      params
    };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      params
    };
  }
}
