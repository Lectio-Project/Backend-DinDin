import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from 'src/env'
import { loginUserBodySchema } from './zodSchemas/login-user-zod.schema'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './auth/users.module'
import { ZodValidationPipe } from './pipes/zod-validation-pipe'
import { PrismaModule } from './prisma/prisma.module'
import { UpdateUserController } from './controllers/update-user.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [CreateAccountController, UpdateUserController],
  providers: [
    PrismaService,
    AuthService,
    { provide: 'LOGIN-USER-BODY-SCHEMA', useValue: loginUserBodySchema },
    ZodValidationPipe,
  ],
})
export class AppModule {}
