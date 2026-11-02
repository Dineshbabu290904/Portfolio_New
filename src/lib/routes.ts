// Project pages live under /projects, so the Projects tab stays lit there too.
export const isActiveRoute = (pathname: string, route: string) =>
  route === '/projects' ? pathname === route || pathname.startsWith('/projects/') : pathname === route;
