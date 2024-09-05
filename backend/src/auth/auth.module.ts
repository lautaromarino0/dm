import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constant';
import { jwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({imports: [TypeOrmModule.forFeature([User]),JwtModule.register({secret: jwtConstants.secret, signOptions: {expiresIn: '1d'}})],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy,UserService],
})
export class AuthModule {}
