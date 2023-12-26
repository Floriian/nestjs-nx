import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { RtGuard } from './guards/rt.guard';
import { Request } from 'express';
import { GetUserId } from './decorators/get-user-id.decorator';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Public()
  @Post('/sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @UseGuards(RtGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  refresh(@Req() req: Request, @GetUserId() id: number) {
    const token = req.user['refreshToken'];
    return this.authService.refreshTokens(id, token);
  }
}
