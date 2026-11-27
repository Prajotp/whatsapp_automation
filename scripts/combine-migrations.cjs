const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'supabase', 'migrations');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();
const outPath = path.join(__dirname, '..', 'supabase', 'combined_migrations.sql');

let combined = '-- Combined Supabase Migrations for WACRM\n\n';
for (const f of files) {
  combined += `\n-- ============================================================\n-- Migration: ${f}\n-- ============================================================\n\n`;
  combined += fs.readFileSync(path.join(dir, f), 'utf-8') + '\n';
}

fs.writeFileSync(outPath, combined, 'utf-8');
console.log(`Combined ${files.length} migrations into ${outPath} (Total bytes: ${fs.statSync(outPath).size})`);
