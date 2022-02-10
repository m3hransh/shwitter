import { extendType, intArg, objectType, stringArg } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('shweets', {
      type: 'Shweet',
      resolve(root, _args, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: { id: root.id },
          })
          .shweets()
      },
    })
    t.field('profile', {
      type: 'Profile',
      resolve(root, _args, ctx) {
        return ctx.prisma.user
          .findUnique(
            {
              where: {id: root.id}
            }
          ).profile()
      }
    })
  },
})

export const AllUsers = objectType({
  name: 'AllUsers',
  definition(t) {
    t.nonNull.list.nonNull.field('users', { type: User })
    t.nonNull.int('count')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('allUsers', {
      type: 'AllUsers',
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(_root, args, ctx, _info) {
        const where = args.filter
          ? {
              OR: [
                { name: { contains: args.filter } },
                { email: { contains: args.filter } },
              ],
            }
          : {}

        const users = await ctx.prisma.user.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
        })

        const count = await ctx.prisma.user.count()

        return {
          users,
          count,
        }
      },
    })
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx) {
        const { userId } = ctx
        return ctx.prisma.user.findUnique({
          where: {
            id: userId,
          },
        })
      },
    })
  },
})
