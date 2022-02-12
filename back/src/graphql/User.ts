import { extendType, inputObjectType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
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
          .findUnique({
            where: { id: root.id },
          })
          .profile()
      },
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

export const UserInputType = inputObjectType({
  name: 'FilterInputType',
  definition(t) {
    t.field
    t.int('userId')
    t.string('usernameFilter')
    t.string('emailFilter')
    t.int('skip')
    t.int('take')
  },
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('allUsers', {
      type: 'AllUsers',
      args: {
        data: UserInputType,
      },
      async resolve(_root, args, ctx, _info) {
        const where: any = {}

        if (args.data?.emailFilter)
          where.OR = [{ email: args.data?.emailFilter }]
        if (args.data?.usernameFilter)
          if (where.OR)
            where.OR = [
              ...where.OR,
              { username: args.data?.usernameFilter },
            ]
          else where.OR = [{ username: args.data?.usernameFilter }]

        console.log(where)
        const users = await ctx.prisma.user.findMany({
          where,
          skip: args.data?.skip as number | undefined,
          take: args.data?.take as number | undefined,
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
