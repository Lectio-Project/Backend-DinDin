import { BadRequestException, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error: unknown) {
      const isZodError = error instanceof ZodError

      if (isZodError) {
        const { fieldErrors } = error.flatten()
        const errors = Object.keys(fieldErrors).reduce((acc, key) => {
          const message = fieldErrors[key]?.at(0)
          return { ...acc, [key]: message }
        }, {})

        throw new BadRequestException(errors)
      }

      throw new BadRequestException('Validation failed')
    }
  }
}
