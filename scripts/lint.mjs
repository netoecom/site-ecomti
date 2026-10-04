import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧹 Executando lint de conformidade DevOps e PWA...');

const errors = [];
const srcDir = path.join(rootDir, 'src');

// 1. Verificar se não há arquivos PHP residuais em src/
const files = fs.readdirSync(srcDir);
if (files.some(f => f.endsWith('.php'))) {
  errors.push('Arquivo .php encontrado em src/. O build estático deve conter apenas ativos limpos.');
}

// 2. Verificar meta tags recomendadas em index.html
const htmlContent = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const requiredTags = [
  'theme-color',
  'viewport',
  'apple-mobile-web-app-capable',
  'rel="manifest"'
];

for (const tag of requiredTags) {
  if (!htmlContent.includes(tag)) {
    errors.push(`Tag obrigatória ausente em index.html: ${tag}`);
  }
}

if (errors.length > 0) {
  console.error('❌ Erros de lint encontrados:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}

console.log('✅ Lint aprovado: todos os padrões de DevOps e PWA foram atendidos.');
