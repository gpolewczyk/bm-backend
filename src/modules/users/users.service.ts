import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/core/schema/user.schema';
import { RegisterUserDto } from 'src/core/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string) {
    return await this.userModel.findOne({ username });
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerUserDto.password, salt);

    const createdUser = new this.userModel({
      ...registerUserDto,
      password: hashedPassword,
    });
    return await createdUser.save();
  }
}
