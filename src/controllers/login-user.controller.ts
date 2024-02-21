import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import {
  LoginUserBodySchema,
  loginUserBodySchema,
} from 'src/zodSchemas/login-user-zod.schema'

@Controller('/login')
export class LoginUserController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(loginUserBodySchema))
  async login(@Body() body: LoginUserBodySchema) {
    const { email, password } = loginUserBodySchema.parse(body)
    const result = await this.authService.signIn(email, password)
    return result
  }
}
