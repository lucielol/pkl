export type Crumb = {
  name: string;
  href?: string;
};

export type AppBreadcrumbProps = {
  items: Crumb[];
};
