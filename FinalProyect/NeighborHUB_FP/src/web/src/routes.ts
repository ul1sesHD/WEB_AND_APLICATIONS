export const ROUTES = {
  landing:          '/',
  login:            '/login',
  register:         '/register',
  home:             '/home',
  explore:          '/explore',
  businessDetail:   (id: string) => `/business/${id}`,
  registerBusiness: '/register-business',
  circular:         '/circular',
  profile:          '/profile',
  whyLocal:         '/why-local',
  myImpact:         '/my-impact',
  adminLink:        '/admin-link',
  admin:            '/admin', // external — Angular bundle
} as const;
