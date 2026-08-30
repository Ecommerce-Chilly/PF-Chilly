function hasPermission(payload = {}, permission) {
  const scopes =
    typeof payload.scope === 'string' ? payload.scope.split(' ') : [];
  const permissions = Array.isArray(payload.permissions)
    ? payload.permissions
    : [];

  return scopes.includes(permission) || permissions.includes(permission);
}

module.exports = { hasPermission };
