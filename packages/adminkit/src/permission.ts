export class PermissionManager {
  private permissions: Set<string>
  private roles: Set<string>

  constructor(permissions: string[] = [], roles: string[] = []) {
    this.permissions = new Set(permissions)
    this.roles = new Set(roles)
  }

  hasPermission(code: string): boolean {
    return this.permissions.has(code)
  }

  hasRole(role: string): boolean {
    return this.roles.has(role)
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this.roles.has(role))
  }

  hasAllRoles(roles: string[]): boolean {
    return roles.every((role) => this.roles.has(role))
  }
}

export const hasPermission = (manager: PermissionManager, code: string): boolean => manager.hasPermission(code)
export const hasRole = (manager: PermissionManager, role: string): boolean => manager.hasRole(role)
export const hasAnyRole = (manager: PermissionManager, roles: string[]): boolean => manager.hasAnyRole(roles)
export const hasAllRoles = (manager: PermissionManager, roles: string[]): boolean => manager.hasAllRoles(roles)
