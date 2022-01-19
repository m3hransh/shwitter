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

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('description')
    t.nonNull.string('url')
    t.nonNull.dateTime('createdAt')
    t.field('postedBy', {
      type: 'User',
      resolve(root, _args, ctx) {
        return ctx.prisma.link
          .findUnique({ where: { id: root.id } })
          .postedBy()
      },
    })
    t.nonNull.list.nonNull.field('voters', {
      type: 'User',
      resolve(root, _args, ctx) {
        return ctx.prisma.link
          .findUnique({ where: { id: root.id } })
          .voters()
      },
    })
  },
})

export const Sort = enumType({
  name: 'Sort',
  members: ['asc', 'desc'],
})
export const LinkOrderByInput = inputObjectType({
  name: 'LinkOrderByInput',
  definition(t) {
    t.field('desciption', { type: Sort })
    t.field('url', { type: Sort })
    t.field('createdAt', { type: Sort })
  },
})

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.nonNull.list.nonNull.field('links', {type: Link })
    t.nonNull.int('count')
  }
})

export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('feed', {
      type: 'Feed',
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
        orderBy: arg({ type: list(nonNull(LinkOrderByInput)) }),
      },
      async resolve(_root, args, ctx, _info) {
        const where = args.filter
          ? {
              OR: [
                { description: { contains: args.filter } },
                { url: { contains: args.filter } },
              ],
            }
          : {}

        const links = await ctx.prisma.link.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args?.orderBy as
            | Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput>
            | undefined,
        })

        const count = await ctx.prisma.link.count({ where })

        return {
          links,
          count,
        }
      },
    })
  },
})

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },

      resolve(_root, args, ctx) {
        const { description, url } = args
        const { userId } = ctx

        if (!userId) {
          throw new Error('Cannot post without logging in.')
        }

        const newLink = ctx.prisma.link.create({
          data: {
            description,
            url,
            postedBy: { connect: { id: userId } },
          },
        })

        return newLink
      },
    })
    t.nonNull.field('updateLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
        url: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      async resolve(_root, args, ctx) {
        const { id, description, url } = args

        let updatedLink: NexusGenObjects['Link']
        try {
          updatedLink = await ctx.prisma.link.update({
            where: {
              id,
            },
            data: {
              description,
              url,
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

        return updatedLink
      },
    }),
      t.nonNull.field('deleteLink', {
        type: 'Link',
        args: {
          id: nonNull(intArg()),
        },
        async resolve(_root, args, ctx) {
          const { id } = args
          let deletedLink: NexusGenObjects['Link']
          try {
            deletedLink = await ctx.prisma.link.delete({
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
          return deletedLink
        },
      })
  },
})
