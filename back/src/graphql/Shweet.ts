import { Prisma } from '@prisma/client'
import {
  arg,
  enumType,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'
import { NexusGenObjects } from '../nexus-typegen'

export const Shweet = objectType({
  name: 'Shweet',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
    t.nonNull.string('content')
    t.field('author', {
      type: 'User',
      resolve(root, _args, ctx) {
        return ctx.prisma.shweet
          .findUnique({ where: { id: root.id } })
          .author()
      },
    })
    t.nonNull.list.nonNull.field('likedShweet', {
      type: 'LikedShweet',
      resolve(root, _args, ctx) {
        return ctx.prisma.shweet.findUnique({
          where: { id: root.id },
        }).likedShweets()
      },
    })
  },
})

export const Sort = enumType({
  name: 'Sort',
  members: ['asc', 'desc'],
})

export const ShweetOrderByInput = inputObjectType({
  name: 'ShweetOrderByInput',
  definition(t) {
    t.field('content', { type: Sort })
    t.field('createdAt', { type: Sort })
  },
})

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.nonNull.list.nonNull.field('shweets', { type: Shweet })
    t.nonNull.int('count')
  },
})

export const ShweetQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('feed', {
      type: 'Feed',
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({ type: list(nonNull(ShweetOrderByInput)) }),
      },
      async resolve(_root, args, ctx, _info) {
        const where = args.filter
          ? { content: { contains: args.filter } }
          : {}

        const shweets = await ctx.prisma.shweet.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args?.orderBy as
            | Prisma.Enumerable<Prisma.ShweetOrderByWithAggregationInput>
            | undefined,
        })

        const count = await ctx.prisma.shweet.count({ where })

        return {
          shweets,
          count,
        }
      },
    })
  },
})

export const ShweetMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('shweet', {
      type: 'Shweet',
      args: {
        content: nonNull(stringArg()),
      },

      resolve(_root, args, ctx) {
        const { content } = args
        const { userId } = ctx
        // TODO: use protected shield instead
        if (!userId) {
          throw new Error('Cannot post without logging in.')
        }

        const newShweet = ctx.prisma.shweet.create({
          data: {
            content,
            author: { connect: { id: userId } },
          },
        })

        return newShweet
      },
    })

    t.nonNull.field('updateShweet', {
      type: 'Shweet',
      args: {
        id: nonNull(intArg()),
        content: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const { id, content } = args

        let updatedShweet: NexusGenObjects['Shweet']
        try {
          updatedShweet = await ctx.prisma.shweet.update({
            where: {
              id,
            },
            data: {
              content,
            },
          })
        } catch (e) {
          console.log(e)

          if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === 'P2001'
          )
            throw new Error(`Could not find the post with id: ${id}`)
          else throw e
        }

        return updatedShweet
      },
    }),
      t.nonNull.field('deleteShweet', {
        type: 'Shweet',
        args: {
          id: nonNull(intArg()),
        },
        async resolve(_root, args, ctx) {
          const { id } = args
          let deletedShweet: NexusGenObjects['Shweet']
          try {
            deletedShweet = await ctx.prisma.shweet.delete({
              where: {
                id,
              },
            })
          } catch (e) {
            console.log(e)

            if (
              e instanceof Prisma.PrismaClientKnownRequestError &&
              e.code === 'P2001'
            )
              throw new Error(`Could not find the post with id: ${id}`)
            else throw e
          }
          return deletedShweet
        },
      })
  },
})
