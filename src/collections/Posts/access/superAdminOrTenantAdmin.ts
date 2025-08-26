import { getUserTenantIDs } from "@/utilities/getUserTenantIDs";
import { isSuperAdmin } from "../../../access/isSuperAdmin";
import { Access } from "payload";

/**
 * Tenant admins and super admins can will be allowed access
 */
export const superAdminOrTenantAdminAccess: Access = ({ req }) => {
  if (!req.user) {
    return false;
  }

  const { user } = req;

  if (isSuperAdmin(req.user)) {
    return true;
  }

  /* const adminTenantAccessIDs = getUserTenantIDs(req.user, "tenant-admin");
      const requestedTenant = req?.data?.tenant;
      console.log({ adminTenantAccessIDs, requestedTenant });
    
      if (requestedTenant && adminTenantAccessIDs.includes(requestedTenant)) {
        return true;
      }
    
      return false; */
  return {
    "tenants.tenant": {
      in: getUserTenantIDs(user, "tenant-admin"),
    },
  };
};
