
# RestoPOS Style Guide

This document provides guidelines for maintaining consistent styling across the RestoPOS application.

## Table of Contents
1. [CSS Organization](#css-organization)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Responsive Design](#responsive-design)
7. [Accessibility](#accessibility)
8. [Best Practices](#best-practices)

## CSS Organization

Our CSS is organized into modular files based on functionality:

### Core CSS Files

| File | Purpose |
|------|---------|
| `scrollbar.css` | Styling for scrollbars across the application |
| `containers.css` | Container layouts and sizing options |
| `responsive.css` | Screen size adaptations and display options |
| `aspect-ratio.css` | Maintaining proper media aspect ratios |
| `input-methods.css` | Touch and mouse input optimizations |
| `flex.css` | Flexbox layout utilities |

### Theme Files

| File | Purpose |
|------|---------|
| `saudi-theme.css` | Saudi-specific styling theme with green primary colors |

### Import Structure

CSS files are imported in `index.css` and `App.css` using the following pattern:

```css
/* In index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./styles/saudi-theme.css";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');

/* In App.css */
@import "./styles/core/scrollbar.css";
@import "./styles/core/containers.css";
@import "./styles/core/responsive.css";
@import "./styles/core/aspect-ratio.css";
@import "./styles/core/input-methods.css";
@import "./styles/core/flex.css";
```

## Color System

RestoPOS uses a Saudi-themed color system with green as primary color:

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#004d40` | Main brand color, primary buttons, headers |
| Secondary Green | `#00695c` | Secondary elements, highlights |
| Accent Orange | `#ff5722` | Call-to-action, important actions |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `hsl(142, 76%, 36%)` | Success states, confirmations |
| Destructive | `hsl(0, 84.2%, 60.2%)` | Error states, deletions |
| Muted | `hsl(240, 3.8%, 46.1%)` | Secondary text, disabled states |

### Using Colors

Colors should be used through CSS variables or Tailwind classes:

```css
/* CSS Variable usage */
color: var(--primary);

/* Tailwind usage */
<div className="bg-primary text-primary-foreground">Content</div>
```

## Typography

### Font Families

- Primary: `'Tajawal'` (RTL)
- Secondary: `'Cairo'` (RTL)
- Fallback: `'Inter'` (LTR)

### Font Sizes

Use Tailwind's font size classes for consistency:

- `text-xs`: 0.75rem (12px) - Very small text, footnotes
- `text-sm`: 0.875rem (14px) - Small text, secondary information
- `text-base`: 1rem (16px) - Body text 
- `text-lg`: 1.125rem (18px) - Large body text
- `text-xl`: 1.25rem (20px) - Subtitles
- `text-2xl`: 1.5rem (24px) - Section headings
- `text-3xl`: 1.875rem (30px) - Page headings

### Font Weights

- `font-light`: 300
- `font-normal`: 400 (body text)
- `font-medium`: 500 (emphasis)
- `font-semibold`: 600 (headings)
- `font-bold`: 700 (important elements)

## Spacing & Layout

### Container System

Use the container classes for consistent widths:

- `container-standard`: Default size (1280px max)
- `container-compact`: Smaller container (1024px max)
- `container-large`: Wider container (1536px max)

### Spacing Scale

Follow Tailwind's spacing scale for consistency:

- `p-1`, `m-1`: 0.25rem (4px)
- `p-2`, `m-2`: 0.5rem (8px)
- `p-3`, `m-3`: 0.75rem (12px)
- `p-4`, `m-4`: 1rem (16px)
- `p-6`, `m-6`: 1.5rem (24px)
- `p-8`, `m-8`: 2rem (32px)

### Flexbox Layout

Use the utility classes from `flex.css`:

```html
<div className="flex-container">
  <div className="flex-item">Item 1</div>
  <div className="flex-item">Item 2</div>
</div>
```

## Components

RestoPOS uses shadcn/ui components with customized styling.

### Buttons

Button variants:
- `default`: Primary actions
- `secondary`: Secondary actions
- `destructive`: Dangerous actions
- `outline`: Bordered buttons
- `ghost`: Low-emphasis buttons
- `link`: Text-only buttons

Button sizes:
- `default`: Standard size
- `sm`: Small buttons
- `lg`: Large buttons
- `icon`: Square icon buttons

Example:
```jsx
<Button variant="default" size="default">Submit</Button>
```

### Cards

Use the shadcn/ui Card component for consistent card styling:

```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    Card Content
  </CardContent>
  <CardFooter>
    Card Footer
  </CardFooter>
</Card>
```

### Forms

Form components should use the shadcn/ui components (Input, Select, Checkbox, etc.) for consistency.

## Responsive Design

### Screen Size Classes

Use the classes from `responsive.css`:

- `screen-size-standard`: Default size
- `screen-size-compact`: Smaller size
- `screen-size-large`: Larger size

### Input Method Detection

Use the classes from `input-methods.css`:

- `touch-ui`: Touch-friendly UI with larger tap targets
- `mouse-ui`: Mouse-friendly UI with hover effects

### Media Queries

Follow Tailwind's responsive breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

Example:
```jsx
<div className="w-full md:w-1/2 lg:w-1/3">Responsive Element</div>
```

## Accessibility

### Color Contrast

- Ensure text has sufficient contrast (minimum 4.5:1 for normal text)
- Use the `text-foreground` on appropriate backgrounds

### Focus States

- Don't remove focus outlines
- Use the built-in focus styles from shadcn/ui

### Screen Readers

- Use appropriate ARIA attributes when needed
- Use semantic HTML elements

## Best Practices

1. **Use Tailwind Classes First**: Prefer using Tailwind utility classes over writing custom CSS
2. **Follow BEM for Custom CSS**: When writing custom CSS, follow BEM naming convention
3. **Maintain RTL Support**: Ensure UI works correctly in RTL mode
4. **Component-Based Styling**: Keep styling close to components
5. **Theme Consistency**: Use the design tokens and variables defined in the theme
6. **Optimize for Mobile**: Always consider mobile-first approach
7. **Keep It Organized**: Follow the file structure defined in this guide
8. **Document Exceptions**: If you need to diverge from these guidelines, document why

## Adding New Styles

When adding new styles:

1. Determine the appropriate file based on functionality
2. If creating a new category, add a new file in the appropriate directory
3. Update imports in `App.css` or other relevant files
4. Document any new variables or classes in this guide

## Examples

### Good Example:

```jsx
// Using Tailwind classes for most styling
<div className="p-4 rounded-lg bg-card shadow-md">
  <h2 className="text-xl font-semibold mb-2">Section Title</h2>
  <p className="text-sm text-muted-foreground">Description text</p>
  <div className="mt-4 flex justify-end">
    <Button>Action</Button>
  </div>
</div>
```

### Bad Example:

```jsx
// Inline styles or inconsistent spacing
<div style={{padding: '18px', backgroundColor: '#f5f5f5'}}>
  <h2 style={{fontSize: '22px', marginBottom: '10px'}}>Section Title</h2>
  <p style={{color: 'gray'}}>Description text</p>
  <div style={{marginTop: '20px', textAlign: 'right'}}>
    <button className="custom-btn">Action</button>
  </div>
</div>
```
