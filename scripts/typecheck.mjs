import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 Executando verificação de integridade e sintaxe...');

try {
  // 1. Validação de manifesto JSON
  const manifestPath = path.join(rootDir, 'src', 'manifest.json');
  const manifestRaw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestRaw);
  if (!manifest.name || !manifest.icons || !manifest.start_url) {
    throw new Error('manifest.json incompleto: campos name, icons ou start_url ausentes.');
  }

  // 2. Validação básica de JavaScript do Service Worker
  const swPath = path.join(rootDir, 'src', 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');
  new Function(swContent.replace(/import\s.*?;/g, ''));

  // 3. Validação de estrutura do HTML principal
  const htmlPath = path.join(rootDir, 'src', 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  if (!html.includes('<title>') || !html.includes('id="root"') || !html.includes('manifest.json')) {
    throw new Error('index.html não contém as tags vitais para a aplicação SPA e PWA.');
  }

  console.log('✅ Typecheck / Verificação de sintaxe aprovada sem erros.');
} catch (err) {
  console.error('❌ Falha na verificação:', err.message);
  process.exit(1);
}
