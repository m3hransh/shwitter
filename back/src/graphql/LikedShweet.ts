import { objectType, extendType, nonNull, intArg } from 'nexus'

export const LikedShweet = objectType({
  name: 'LikedShweet',
  definition(t) {
    t.nonNull.int('userId')
    t.nonNull.int('shweetId')
    t.field('shweet', { // NOTE: This can be null because of findUnique 
      type: 'Shweet',
      async resolve(root, _args, ctx) {
        return  ctx.prisma.likedShweet.findUnique({
          where: { shweetId_userId:{shweetId:root.shweetId, userId:root.userId} },
        }).shweet()
      },
    })
    t.field('user', { 
      type: 'User',
      resolve(root, _args, ctx) {
        return  ctx.prisma.likedShweet.findUnique({
          where: { shweetId_userId:{shweetId:root.shweetId, userId:root.userId} },
        }).user()
    }})
    t.nonNull.dateTime('likedAt')
  },
})

export const LikedShweetMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('like', {
      type: 'LikedShweet',
      args: {
        shweetId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx) {
        const { userId } = ctx
        const { shweetId } = args

        if (!userId) {
          throw new Error('Cannot like without logging in.')
        }

        const likedShweet = await ctx.prisma.likedShweet.create({
          data: {
            userId: userId,
            shweetId: shweetId
          },
        })


        return likedShweet
      },
    })
  },
})
