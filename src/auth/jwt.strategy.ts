import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z.string(),
})

type userPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const secretKey = config.get('JWT_SECRET_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(secretKey, 'base64'),
      algorithms: ['HS256'],
    })
  }

  async validate(payload: userPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}
