// Role hierarchy and permissions

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN_STAFF: 'ADMIN_STAFF',
  PASTORAL_STAFF: 'PASTORAL_STAFF',
  MINISTRY_LEADER: 'MINISTRY_LEADER',
  READ_ONLY: 'READ_ONLY',
};

export const PERMISSIONS = {
  // Member permissions
  CREATE_MEMBER: [ROLES.SUPER_ADMIN, ROLES.ADMIN_STAFF, ROLES.PASTORAL_STAFF],
  UPDATE_MEMBER: [ROLES.SUPER_ADMIN, ROLES.ADMIN_STAFF, ROLES.PASTORAL_STAFF],
  DELETE_MEMBER: [ROLES.SUPER_ADMIN, ROLES.ADMIN_STAFF],
  VIEW_MEMBER: Object.values(ROLES),

  // System permissions
  MANAGE_USERS: [ROLES.SUPER_ADMIN],
  VIEW_AUDIT_LOGS: [ROLES.SUPER_ADMIN, ROLES.ADMIN_STAFF],
};

export const hasPermission = (userRole, permission) => {
  if (!PERMISSIONS[permission]) {
    console.warn(`Permission ${permission} not defined`);
    return false;
  }
  return PERMISSIONS[permission].includes(userRole);
};

export const canCreateMember = (userRole) => hasPermission(userRole, 'CREATE_MEMBER');
export const canUpdateMember = (userRole) => hasPermission(userRole, 'UPDATE_MEMBER');
export const canDeleteMember = (userRole) => hasPermission(userRole, 'DELETE_MEMBER');
export const canViewMember = (userRole) => hasPermission(userRole, 'VIEW_MEMBER');
