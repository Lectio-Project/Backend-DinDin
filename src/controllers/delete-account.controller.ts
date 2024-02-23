import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { PrismaService } from 'src/prisma/prisma.service'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const identifierParamSchema = z.object({
  id: z.string().length(24).optional(),
})

type IdentifierParamSchema = z.infer<typeof identifierParamSchema>

@Controller('/delete')
@UseGuards(JwtAuthGuard)
export class DeleteUserController {
  constructor(private prisma: PrismaService) {}

  @Delete(':id')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(identifierParamSchema))
  async deleteUser(@Param() param: IdentifierParamSchema) {
    const { id } = identifierParamSchema.parse(param)

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    })

    return {
      message: 'User deleted successfully!',
    }
  }
}
