// Vercel project configuration
// See https://vercel.com/docs/project-configuration/vercel-ts

interface VercelConfig {
  framework?: string;
  buildCommand?: string;
  outputDirectory?: string;
  crons?: { path: string; schedule: string }[];
}

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  crons: [],
};
