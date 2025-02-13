import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User.name)
      private readonly userModel: Model<User>,
      private jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string}> {
      const { name, username, password } = signUpDto

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await this.userModel.create({
        name,
        username,
        password: hashedPassword
      })

      const token = this.jwtService.sign({ id: user._id})

      return { token }
    }

    async login( loginDto: LoginDto): Promise<{ token: string }> {
      const { username, password } = loginDto;

      const user = await this.userModel.findOne({ username });
      if (!user ||!(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const token = this.jwtService.sign({ id: user._id})

      return { token }
    }
}
