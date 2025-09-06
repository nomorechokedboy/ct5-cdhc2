import type { Access } from 'payload'
import { User } from '../payload-types'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  // return isSuperAdmin(req.user)

   if (req.payloadAPI === 'REST' || req.payloadAPI === 'GraphQL') {
    // API thì luôn cho full quyền
    return true
  }

  // Còn trong Admin UI thì check role
  if (req.user) {
    return isSuperAdmin(req.user)
  }

  return true
}

export const isSuperAdmin = (user: User | null): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}
