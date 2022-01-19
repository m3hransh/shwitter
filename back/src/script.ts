import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // await prisma.user.create({
  //   data: {
  //     name: 'Mehran',
  //     email: 'Mehran@gmail.com',
  //     password: '123',
  //   },
  // })
  // await prisma.link.updateMany({
  //   data: {
  //     postedById: 1,
  //   },
  // })
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
