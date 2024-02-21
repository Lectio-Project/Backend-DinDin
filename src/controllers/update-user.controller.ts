import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'

const identifierParamSchema = z.object({
  id: z.string().length(24).optional(),
})

type IdentifierParamSchema = z.infer<typeof identifierParamSchema>

const userDataBodySchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(5).optional(),
})

type UserDataBodySchema = z.infer<typeof userDataBodySchema>

@Controller('/user')
export class UpdateUserController {
  constructor(private prisma: PrismaService) {}

  @Patch(':id')
  @HttpCode(200)
  @UsePipes(
    new ZodValidationPipe(identifierParamSchema),
    new ZodValidationPipe(userDataBodySchema),
  )
  async updateUser(
    @Param() param: IdentifierParamSchema,
    @Body() body: UserDataBodySchema,
  ) {
    const { id } = identifierParamSchema.parse(param)

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    const { name, email, password } = userDataBodySchema.parse(body)

    if (!name && !email && !password) {
      throw new BadRequestException('Enter the data you want to update!')
    }

    if (name) {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
        },
      })
    }

    if (email) {
      const emailAlreadyExists = await this.prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (emailAlreadyExists) {
        throw new ConflictException(
          'User with same e-mail address already exists!',
        )
      }

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email,
        },
      })
    }

    if (password) {
      const hashedPassword = await hash(password, 8)

      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          password: hashedPassword,
        },
      })
    }

    return {
      message: 'User updated successfully!',
    }
  }
}
