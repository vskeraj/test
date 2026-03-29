const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const srcPagesDir = path.join(projectDir, 'src', 'pages');

// Update Next Config
fs.writeFileSync(path.join(projectDir, 'next.config.js'), `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: [] }
}
module.exports = nextConfig
`);

// Delete old Vite files safely
['index.html', 'vite.config.ts', 'vitest.config.ts', 'src/main.tsx', 'src/App.tsx'].forEach(f => {
  const fp = path.join(projectDir, f);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
});

// Rename Index.tsx to index.tsx
const indexSrc = path.join(srcPagesDir, 'Index.tsx');
if (fs.existsSync(indexSrc)) {
  fs.renameSync(indexSrc, path.join(srcPagesDir, 'index.tsx'));
}

// Convert routing in pages
function replaceInFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let content = fs.readFileSync(filepath, 'utf8');

  // React Router -> Next.js Link
  content = content.replace(/import\s+\{(.*?)\}\s+from\s+["']react-router-dom["'];?/g, (match, p1) => {
    let newImports = [];
    if (p1.includes('Link')) newImports.push("import Link from 'next/link';");
    if (p1.includes('useNavigate') || p1.includes('useParams') || p1.includes('useSearchParams')) {
      newImports.push("import { useRouter } from 'next/router';");
    }
    return newImports.join('\n');
  });

  // useNavigate -> useRouter
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, "const router = useRouter();\n  const navigate = router.push;");
  
  // useParams
  content = content.replace(/const\s+\{\s*id\s*\}\s*=\s*useParams\(\);?/g, "const router = useRouter();\n  const { id } = router.query;");
  
  // useSearchParams
  content = content.replace(/const\s+\[searchParams,\s*setSearchParams\]\s*=\s*useSearchParams\(\);?/g, "const router = useRouter();\n  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();\n  const setSearchParams = (p) => { const url = new URL(window.location.href); Object.keys(p).forEach(key => url.searchParams.set(key, p[key])); router.push(url.pathname + url.search); };");

  // Link to -> Link href
  content = content.replace(/<Link(.*?)to=(["'{].*?["'}])/g, "<Link$1href=$2");

  fs.writeFileSync(filepath, content);
}

// apply to components too
const srcComponentsDir = path.join(projectDir, 'src', 'components');
if (fs.existsSync(srcComponentsDir)) {
  fs.readdirSync(srcComponentsDir).filter(f => f.endsWith('.tsx')).forEach(p => replaceInFile(path.join(srcComponentsDir, p)));
}

const pages = fs.readdirSync(srcPagesDir).filter(f => f.endsWith('.tsx'));
pages.forEach(p => replaceInFile(path.join(srcPagesDir, p)));

console.log('Migration script completed.');
