import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private userRepository: Repository<User>
) {}
async register(user: RegisterDto){
    return this.userRepository.save(user);
    }
async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({id}, updateUserDto);
  }

async findOne(email: string) {
    return this.userRepository.findOne({where: {email: email}});
  }

async findAll() {
    return this.userRepository.find();
  }

async delete(id: number) {
    return this.userRepository.delete(id);
  }
}