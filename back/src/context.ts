import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { decodeAuthHeader } from './utils/auth'

export const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  userId?: number
}

// Apollo server is smart enough to call this like
// a HTTP request when is provided to its constructor
export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null

  return {
    prisma,
    userId: token?.userId,
  }
}
