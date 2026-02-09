# TraceVenue Revamped 🎯

A modern React application for venue booking and management, built with Vite, React Router, and a custom design system.

## 🚀 Quick Start


```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── assets/          # Images, icons, and static assets
├── components/      # Reusable UI components
│   └── common/      # Design system components (Button, Card, Input, etc.)
├── pages/           # Page-level components
├── services/        # API services and data fetching
├── styles/          # Global CSS and design tokens
│   ├── colors.css   # Color variables
│   ├── layouts.css  # Layout & spacing tokens
│   ├── base.css     # Base element styles
│   ├── variants.css # Component variants & utilities
│   └── index.css    # Main entry point
└── utils/           # Helper functions and utilities
```

## 🎨 Design System

### Using Components
Import components from the common folder:
```jsx
import { Button, Card, Badge, Input } from '../components/common';

<Button variant="primary">Click Me</Button>
<Card variant="gradient" padding="md">Content</Card>
```

### CSS Utility Classes
Use these utility classes for quick styling:
```jsx
// Text colors
<p className="text-primary">Primary text</p>
<p className="text-success">Success text</p>
<p className="text-error">Error text</p>

// Background colors
<div className="bg-primary">Primary background</div>
<div className="bg-success-light">Light success bg</div>

// Borders
<div className="border border-primary">Primary border</div>
```

### CSS Variables
Access design tokens via CSS variables:
```css
color: var(--color-primary);
background: var(--color-background);
border-radius: var(--radius-lg);
```
### 📚 Component Documentation
Visit `/docs` route to see live examples of all components with code snippets.

---

## 🔀 Git Workflow

### Branch Naming
| Type     | Format                | Example                    |
| -------- | --------------------- | -------------------------- |
| Feature  | `feat/<feature-name>` | `feat/user-authentication` |
| Bug Fix  | `fix/<bug-name>`      | `fix/login-error`          |
| Refactor | `refactor/<area>`     | `refactor/api-services`    |
| Docs     | `docs/<update>`       | `docs/readme-update`       |

### Commit Messages
Format: `<keyword>: <description> - <your-name>`

| Keyword    | Use For                     |
| ---------- | --------------------------- |
| `feat`     | New feature                 |
| `fix`      | Bug fix                     |
| `docs`     | Documentation               |
| `style`    | Formatting (no code change) |
| `refactor` | Code restructuring          |
| `perf`     | Performance improvement     |
| `chore`    | Build/config changes        |

**Examples:**
```bash
git commit -m "feat: add venue search filter - prince"
git commit -m "fix: resolve date picker error - john"
git commit -m "docs: update component examples - sarah"
```




### Workflow Steps
```bash
# 1. Create branch
git checkout -b feat/your-feature

# 2. Make changes & commit
git add .
git commit -m "feat: your description - your-name"

# 3. Push & create PR
git push origin feat/your-feature
```

⚠️ **Never commit directly to `main`** - Always use Pull Requests!

---

## 📜 Rules for Interns

1. **Use existing components** - Check `/docs` before creating new ones
2. **Follow CSS patterns** - Use CSS variables, not hardcoded colors
3. **Small commits** - One feature/fix per commit
4. **Test locally** - Run `npm run dev` before pushing
5. **Ask questions** - When in doubt, ask before implementing

## 🔗 Useful Links
- **Component Docs**: `http://localhost:5174/docs` (local) or `/docs` (production)
- **Vite Docs**: https://vitejs.dev/
- **React Router**: https://reactrouter.com/


