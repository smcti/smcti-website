export function getRedirectPathByRole(role: string | undefined): string {
  if (!role) return '/login';

  const roleRoutes: Record<string, string> = {
    admin:            '/painel-admin',
    gestor_mentorias: '/painel-admin/mentorias',
    empresario:       '/painel',
    empresa:          '/painel',
    usuario:          '/',
  };

  return roleRoutes[role] ?? '/painel-admin';
}
