import {
  arg,
  extendType,
  inputObjectType,
  nonNull,
  objectType,
} from 'nexus'

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.nonNull.int('userId')
    t.dateTime('createdAt')
    t.string('avatar')
    t.string('bio')
    t.string('location')
    t.string('website')
  },
})

export const ProfileInput = inputObjectType({
  name: 'ProfileInput',
  definition(t) {
    t.string('bio')
    t.string('location')
    t.string('website')
    t.string('avatar')
  },
})

export const ProfileMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('editProfile', {
      type: 'Profile',
      args: {
        data: nonNull(
          arg({
            type: 'ProfileInput',
          }),
        ),
      },
      resolve: (_root, args, ctx) => {
        const { userId } = ctx
        if (!userId) throw new Error('Could not authenticate user.')

        // update profile, or create that profile record
        // if it does not exist
        return ctx.prisma.profile.upsert({
          where: {
            userId
          },
          update:{
            bio: args.data.bio,
            location: args.data.location,
            website: args.data.website,
            avatar: args.data.avatar,
          },
          create: {
            bio: args.data.bio,
            location: args.data.location,
            website: args.data.website,
            avatar: args.data.avatar,
            user: { connect: { id: userId } },
          },
        })
      },
    })
  },
})
