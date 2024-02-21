import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Env } from 'src/env'
import { LoginUserController } from 'src/controllers/login-user.controller'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const secretKey = config.get('JWT_SECRET_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'HS256' },
          privateKey: Buffer.from(secretKey, 'base64'),
          publicKey: Buffer.from(secretKey, 'base64'),
        }
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [LoginUserController],
  exports: [AuthService],
})
export class AuthModule {}
