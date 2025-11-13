const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const OUT_DIR = path.join(ROOT, `local_backup_${timestamp}`);

const EXCLUDE_TOP = new Set(['node_modules', '.git', 'dist', 'build', 'out', '.vscode', '.cache']);

async function shouldExclude(relPath) {
  if (!relPath) return false;
  const parts = relPath.split(path.sep);
  return EXCLUDE_TOP.has(parts[0]);
}

let fileCount = 0;
let byteCount = 0;

async function walkAndCopy(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    const rel = path.relative(ROOT, full);
    if (await shouldExclude(rel)) continue;

    if (ent.isDirectory()) {
      await walkAndCopy(full);
    } else if (ent.isFile()) {
      const dest = path.join(OUT_DIR, rel);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      try {
        const stat = await fs.stat(full);
        await fs.copyFile(full, dest);
        fileCount += 1;
        byteCount += stat.size;
      } catch (err) {
        console.error(`Failed to copy ${rel}:`, err.message);
      }
    }
  }
}

(async () => {
  console.log(`Creating local backup at: ${OUT_DIR}`);
  try {
    await fs.mkdir(OUT_DIR, { recursive: true });
    await walkAndCopy(ROOT);
    const summary = {
      timestamp: new Date().toISOString(),
      outDir: OUT_DIR,
      filesCopied: fileCount,
      bytesCopied: byteCount,
    };
    await fs.writeFile(path.join(OUT_DIR, 'backup-summary.json'), JSON.stringify(summary, null, 2), 'utf8');
    console.log('Backup completed.');
    console.log(`Files copied: ${fileCount}, bytes: ${byteCount}`);
    console.log(`Backup location: ${OUT_DIR}`);
  } catch (err) {
    console.error('Backup failed:', err);
    process.exitCode = 1;
  }
})();
