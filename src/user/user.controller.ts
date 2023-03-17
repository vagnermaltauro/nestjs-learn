import { CreateUserDTO } from './dto/create-user.dto';
import { Body, Controller, Post, Get, Param, Put, Patch, Delete } from '@nestjs/common';

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
  async update(@Body() body, @Param() params) {
    return {
      method: 'put',
      body,
      params
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param() params) {
    return {
      method: 'patch',
      body,
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
