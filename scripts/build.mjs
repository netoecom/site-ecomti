import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Iniciando build de produção da ECOM TI...');

// 1. Limpeza do diretório dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Cópia recursiva de src para dist
function copyDirRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const entries = fs.readdirSync(source, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(target, entry.name);

    // Ignora arquivos PHP residuais ou temporários
    if (entry.name.endsWith('.php') || entry.name === 'DO_NOT_UPLOAD_HERE') {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive(srcDir, distDir);

// 3. Verificação de integridade dos arquivos obrigatórios
const requiredFiles = ['index.html', 'manifest.json', 'sw.js', 'robots.txt'];
const missing = requiredFiles.filter(file => !fs.existsSync(path.join(distDir, file)));

if (missing.length > 0) {
  console.error(`❌ Erro no build: Arquivos obrigatórios ausentes: ${missing.join(', ')}`);
  process.exit(1);
}

// 4. Estatísticas de saída
function countFiles(dir) {
  let count = 0;
  let totalSize = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = countFiles(fullPath);
      count += sub.count;
      totalSize += sub.totalSize;
    } else {
      count++;
      totalSize += fs.statSync(fullPath).size;
    }
  }
  return { count, totalSize };
}

const stats = countFiles(distDir);
console.log(`✅ Build concluído com sucesso em dist/!`);
console.log(`📦 Total de arquivos gerados: ${stats.count}`);
console.log(`📊 Tamanho total dos ativos: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
