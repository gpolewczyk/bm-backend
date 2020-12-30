import {
  Controller,
  Req,
  Post,
  Body,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { RegisterUserDto } from 'src/core/dto/user.dto';
import { LocalAuthGuard } from 'src/core/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { ValidationPipe } from 'src/core/pipe/custom-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }
}
