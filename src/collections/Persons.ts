import type { CollectionConfig } from 'payload'

export const Persons: CollectionConfig = {
  slug: 'persons',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'position'],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['fullName']
          },
        ],
        afterRead: [
          ({ data }) => {
            return `${data?.firstName} ${data?.lastName}`
          },
        ],
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          index: true,
        },
        {
          name: 'lastName',
          type: 'text',
          index: true,
        },
      ],
    },
    {
      name: 'position',
      type: 'text',
      required: false,
      index: true,
    },
  ],
}
