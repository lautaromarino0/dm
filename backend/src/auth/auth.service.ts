import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { LoginDto } from 'src/user/dto/login.dto';
import { RegisterDto } from 'src/user/dto/register.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository : Repository<User>,
  private jwtService: JwtService
  ) {}

  async register(user: RegisterDto){
    const { password } = user;
    const plainToHash = await hash(password, 10);
    user = { ...user, password: plainToHash };
    return this.userRepository.save(user);
  }
  async login(user: LoginDto){
    const {email, password} = user;
    const findUser = await this.userRepository.findOne({where: {email: email}});
    if(!findUser){
      throw new HttpException('User not found', 404);
    }

    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword){
      throw new HttpException('Invalid password', 401);
    }

    const payload = { email: findUser.email, id: findUser.id, username: findUser.username };
    const token = this.jwtService.sign(payload);  

    const data ={
      token: token,
      user: findUser
    }

    return data;
  }
}
