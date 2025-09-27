type SanityConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
  autoUpdates: boolean;
  browserToken: string | false;
  serverToken: string | false;
  queries: string;
  types: string;
};

export const SANITY_CONFIG: SanityConfig = {
  projectId: "ppkzed19",
  dataset: "production",
  apiVersion: "2025-09-20",
  useCdn: true,
  autoUpdates: true,
  browserToken: false,
  serverToken: false,
  queries: "apps/web/app/lib/sanity/queries.ts",
  types: "apps/web/app/lib/sanity/types.ts",
};
