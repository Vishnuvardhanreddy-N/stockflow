import { Body, Controller, HttpStatus, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Res() res, @Body() dto: SignupDto) {
    try {
      const data = await this.authService.signup(dto);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }

  @Post('login')
  async login(@Res() res, @Body() dto: LoginDto) {
    try {
      const data = await this.authService.login(dto);
      res.status(HttpStatus.OK).send({ message: 'success', data });
    } catch (e) {
      this.logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Service unavailable', data: {} });
    }
  }
}
