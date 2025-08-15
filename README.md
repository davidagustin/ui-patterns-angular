# UI Patterns Angular

A comprehensive Angular application showcasing interactive UI design patterns with working examples and code demonstrations.

## 🎯 Overview

This project is an Angular-based learning platform that demonstrates common UI patterns used in modern web applications. Each pattern includes:

- **Interactive Examples** - Working demonstrations you can click and interact with
- **Code Samples** - Complete HTML, CSS/SCSS, and TypeScript implementations
- **Design Guidelines** - Best practices and use cases for each pattern
- **Responsive Design** - Mobile-first approach with dark mode support

## 🚀 Live Demo

Visit the live application: [UI Patterns Angular](https://your-deployment-url.com)

## 📋 Available Patterns

### Navigation & Layout
- **Accordion Menu** - Expandable content sections with smooth animations
- **Tabs** - Organize content into navigable sections with icons and disabled states
- **Modal** - Overlay dialogs with backdrop, focus management, and form support
- **Dropdown Menu** - Interactive dropdowns with separators, icons, and disabled items

### Data & Forms
- **Cards** - Content cards with filtering, grid/list views, and interactive actions
- **Forms** - Comprehensive form patterns with validation and reactive forms
- **Pagination** - Page navigation with customizable page ranges and item counts

### Component Library
- **90+ Additional Patterns** identified for conversion from React source
- **Shared Components** - CodeTabsComponent, PatternHeaderComponent for consistency

## 🛠️ Tech Stack

- **Framework**: Angular 15+
- **Language**: TypeScript 4.9+
- **Styling**: Pure SCSS with CSS Custom Properties
- **Build**: Angular CLI with Webpack
- **Testing**: Jasmine & Karma
- **Forms**: Angular Reactive Forms

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm 8+
- Angular CLI 15+

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/ui-patterns-angular.git
cd ui-patterns-angular

# Install dependencies
npm install

# Start development server
ng serve

# Open browser to http://localhost:4200
```

## 🏗️ Development

### Available Commands

```bash
# Development server
ng serve                    # Start dev server on localhost:4200

# Building
ng build                    # Build for development
ng build --prod            # Build for production

# Testing
ng test                     # Run unit tests
ng lint                     # Run linting

# Code generation
ng generate component name  # Generate new component
ng generate service name    # Generate new service
```

### Project Structure

```
src/
├── app/
│   ├── home/                    # Home page component
│   ├── patterns/                # UI pattern components
│   │   ├── accordion-menu/      # Accordion pattern
│   │   ├── cards/               # Cards pattern
│   │   ├── dropdown-menu/       # Dropdown pattern
│   │   ├── forms/               # Forms pattern
│   │   ├── modal/               # Modal pattern
│   │   └── tabs/                # Tabs pattern
│   ├── shared/                  # Shared components
│   │   └── components/          # Reusable components
│   ├── app-routing.module.ts    # Application routing
│   ├── app.component.*          # Root component
│   └── app.module.ts            # Application module
├── assets/                      # Static assets
├── styles.scss                  # Global styles
└── index.html                   # Main HTML file
```

## 🎨 Pattern Implementation

Each UI pattern follows a consistent structure:

### Component Architecture
```typescript
// pattern.component.ts
interface PatternData {
  id: string;
  title: string;
  // ... pattern-specific properties
}

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.scss']
})
export class PatternComponent {
  // Component logic
  
  // Code examples for learning
  get htmlCode(): string { /* HTML example */ }
  get scssCode(): string { /* SCSS example */ }
  get typescriptCode(): string { /* TypeScript example */ }
}
```

### Template Structure
```html
<!-- pattern.component.html -->
<div class="pattern-container">
  <!-- Pattern header -->
  <div class="pattern-header">
    <h1>Pattern Name</h1>
    <p>Description</p>
  </div>
  
  <!-- Interactive example -->
  <div class="pattern-demo">
    <!-- Working implementation -->
  </div>
  
  <!-- Code examples -->
  <app-code-tabs 
    [htmlCode]="htmlCode"
    [scssCode]="scssCode" 
    [typescriptCode]="typescriptCode">
  </app-code-tabs>
  
  <!-- Features and use cases -->
  <div class="pattern-info">
    <!-- Additional information -->
  </div>
</div>
```

## 🎯 Key Features

### ✨ Interactive Learning
- **Live Examples**: Click, hover, and interact with each pattern
- **Code Viewing**: Switch between HTML, CSS, and TypeScript examples
- **Copy-Paste Ready**: All code examples are production-ready

### 🎨 Design System
- **Pure SCSS**: Custom SCSS with CSS variables and mixins (no Tailwind dependency)
- **Dark Mode**: Automatic dark/light theme switching via CSS media queries
- **Responsive**: Mobile-first responsive design with breakpoint mixins
- **Accessibility**: ARIA attributes, keyboard navigation, and focus management

### 🔧 Developer Experience
- **TypeScript**: Full type safety throughout
- **Modern Angular**: Latest Angular features and best practices
- **Modular Architecture**: Easily extendable component structure
- **Performance**: Optimized builds with tree-shaking

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Mobile Support

Fully responsive design optimized for:
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 13+

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Adding a New Pattern

1. **Generate Component**
   ```bash
   ng generate component patterns/your-pattern
   ```

2. **Add Route**
   ```typescript
   // app-routing.module.ts
   { path: 'patterns/your-pattern', component: YourPatternComponent }
   ```

3. **Register Component**
   ```typescript
   // app.module.ts
   import { YourPatternComponent } from './patterns/your-pattern/your-pattern.component';
   
   @NgModule({
     declarations: [YourPatternComponent]
   })
   ```

4. **Update Home Page**
   ```typescript
   // home/home.component.ts
   patterns: [
     { name: "Your Pattern", path: "/patterns/your-pattern", description: "..." }
   ]
   ```

### Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/new-pattern`)
3. **Follow** the existing code style and structure
4. **Test** your changes (`ng test` and `ng build`)
5. **Commit** using conventional commits (see below)
6. **Push** to your branch and create a Pull Request

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add carousel pattern component
fix: resolve modal backdrop click issue
docs: update README with new patterns
style: improve button hover animations
refactor: optimize component performance
test: add unit tests for dropdown component
```

## 📊 Bundle Analysis

Current bundle sizes (production build):

| Chunk     | Size     | Gzipped |
|-----------|----------|---------|
| main      | 349.4 kB | 81.3 kB |
| polyfills | 33.1 kB  | 10.7 kB |
| styles    | 1.6 kB   | 0.6 kB  |
| **Total** | **384.9 kB** | **93.1 kB** |

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build for production
ng build --prod

# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --prod

FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Design Community** - For UI pattern inspiration and best practices

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/ui-patterns-angular/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ui-patterns-angular/discussions)
- **Email**: your-email@example.com

---

**Built with ❤️ using Angular and TypeScript**

*Star ⭐ this repository if you find it helpful!*