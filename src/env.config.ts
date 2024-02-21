import { registerAs } from '@nestjs/config'

export default registerAs('env', () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}))
