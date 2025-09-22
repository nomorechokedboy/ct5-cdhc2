import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Tenants } from './collections/Tenants'
import Users from './collections/Users'
import { Media } from './collections/Media'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { isSuperAdmin } from './access/isSuperAdmin'
import type { Config } from './payload-types'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import { seed } from './seed'
import { type Payload } from 'payload'
import type { PayloadHandler } from 'payload'
import MyCustomStyles from './components/Mystyle/MyCustomStyles'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// eslint-disable-next-line no-restricted-exports
export default buildConfig({
	admin: {
		user: 'users',
		dateFormat: 'dd/MM/yyyy', // Format ngày tháng

		components: {
			logout: { Button: '@/components/logout-button' }
			// beforeLogin: [MyCustomStyles], // inject CSS/JS trước login
			// afterDashboard: [MyCustomStyles], // hoặc inject sau dashboard
		},
		importMap: {
			baseDir: path.resolve(dirname)
		}
	},
	collections: [Pages, Users, Tenants, Categories, Posts, Media],

	db: sqliteAdapter({
		client: {
			url: process.env.DATABASE_URI!
		},
		prodMigrations: migrations
	}),
	onInit: async (args) => {
		if (process.env.SEED_DB) {
			await seed(args)
		}
	},
	editor: lexicalEditor({}),
	graphQL: {
		schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql')
	},
	secret: process.env.PAYLOAD_SECRET as string,
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts')
	},
	plugins: [
		multiTenantPlugin<Config>({
			collections: {
				pages: {}
			},
			tenantField: {
				access: {
					read: () => true,
					update: ({ req }) => {
						if (isSuperAdmin(req.user)) {
							return true
						}
						return getUserTenantIDs(req.user).length > 0
					}
				}
			},
			tenantsArrayField: {
				includeDefaultField: false
			},
			userHasAccessToAllTenants: (user) => isSuperAdmin(user)
		})
	],
	endpoints: [
		{
			path: '/public/tenants',
			method: 'get',
			handler: async (req) => {
				try {
					const tenants = await req.payload.find({
						collection: 'tenants',
						limit: 1000,
						depth: 1 // lấy dữ liệu quan hệ cấp 1
					})

					return Response.json(tenants.docs)
				} catch (error) {
					console.error('Error fetching tenants:', error)
					return Response.json(
						{ error: 'Failed to fetch tenants' },
						{ status: 500 }
					)
				}
			}
		}
	]
})
