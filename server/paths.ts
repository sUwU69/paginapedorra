import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

export function resolveSharedPath(path: string) {
  return resolve(rootDir, 'shared', path);
}

// Import shared modules using dynamic import
export async function importShared<T>(path: string): Promise<T> {
  const fullPath = resolveSharedPath(path);
  return (await import(fullPath)).default;
}