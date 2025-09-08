import type { CollectionConfig } from 'payload'

import { ensureUniqueSlug } from './hooks/ensureUniqueSlug'
import { superAdminOrTenantAdminAccess } from '@/collections/Pages/access/superAdminOrTenantAdmin'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import {
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  ParagraphFeature,
  ChecklistFeature,
  OrderedListFeature,
  UnorderedListFeature,
  IndentFeature,
  LinkFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: () => true,
    update: superAdminOrTenantAdminAccess,
  },
  admin: {
    useAsTitle: 'title',
  },

   labels: {
    singular: {
      en: 'Post',
      vi: 'Bài viết',
    },
    plural: {
      en: 'Posts', 
      vi: 'Bài viết',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
       localized: true,
    },
    {
      name: 'excerpt',
      type: 'text',
       localized: true,
    },
     {
      name: 'content',
      type: 'richText',
       localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // Hoặc bạn có thể khai báo cụ thể từng feature
          HeadingFeature({
            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          InlineCodeFeature(),
          ParagraphFeature(),
          ChecklistFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          IndentFeature(),
          LinkFeature({
            enabledCollections: ['posts'],
            fields: ({ defaultFields }) => [
              ...defaultFields,
              {
                name: 'rel',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
                admin: {
                  description: 'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                },
              },
            ],
          }),
          RelationshipFeature({
            enabledCollections: ['posts'],
          }),
          BlockquoteFeature(),
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'alt',
                    type: 'text',
                    // required: true,
                  },
                ],
              },
            },
          }),
          HorizontalRuleFeature(),
          InlineToolbarFeature(),
          FixedToolbarFeature(),
        ],
      }),
    },

    //update
     {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'categories',
    },

    
  ],
}
