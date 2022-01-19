import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('links', {
      type: 'Link',
      resolve(root, _args, ctx) {
        return ctx.prisma.user
          .findUnique({
            where: { id: root.id },
          })
          .links()
      },
    })
  },
})
