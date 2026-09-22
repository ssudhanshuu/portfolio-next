const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages_old');
const appDir = path.join(__dirname, 'src', 'app');

const routes = [
  { old: 'Home.jsx', new: 'page.jsx' },
  { old: 'Admin/AdminDeshbord.jsx', new: 'admin/dashboard/page.jsx' },
  { old: 'Admin/AdminSkill.jsx', new: 'admin/skills/page.jsx' },
  { old: 'Admin/AdminCreateSkills.jsx', new: 'admin/create/skill/page.jsx' },
  { old: 'Admin/AdminContect.jsx', new: 'admin/contect/page.jsx' },
  { old: 'Admin/AdminBlogs.jsx', new: 'admin/blogs/page.jsx' },
  { old: 'Admin/AdminCreateBlogs.jsx', new: 'admin/create/blog/page.jsx' },
  { old: 'Admin/AdminProjectCreate.jsx', new: 'admin/projects-create/page.jsx' },
  { old: 'Admin/AdminCreateProject.jsx', new: 'admin/create/page.jsx' }
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

routes.forEach(route => {
  const oldPath = path.join(pagesDir, route.old);
  const newPath = path.join(appDir, route.new);

  if (fs.existsSync(oldPath)) {
    ensureDir(newPath);
    let content = fs.readFileSync(oldPath, 'utf8');
    content = `"use client";\n\n` + content;
    fs.writeFileSync(newPath, content);
    console.log(`Migrated ${route.old} to ${route.new}`);
  } else {
    console.log(`File not found: ${oldPath}`);
  }
});

// For components, we just prepend "use client"; to them since they likely use React hooks.
function prependUseClientToDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      prependUseClientToDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('"use client"')) {
        content = `"use client";\n\n` + content;
        fs.writeFileSync(fullPath, content);
      }
    }
  });
}

prependUseClientToDir(path.join(__dirname, 'src', 'components'));
prependUseClientToDir(path.join(__dirname, 'src', 'context'));
