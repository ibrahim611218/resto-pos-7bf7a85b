
# CSS Organization

Our CSS is organized into modular files based on functionality:

## Core CSS Files

| File | Purpose |
|------|---------|
| `scrollbar.css` | Styling for scrollbars across the application |
| `containers.css` | Container layouts and sizing options |
| `responsive.css` | Screen size adaptations and display options |
| `aspect-ratio.css` | Maintaining proper media aspect ratios |
| `input-methods.css` | Touch and mouse input optimizations |
| `flex.css` | Flexbox layout utilities |

## Theme Files

| File | Purpose |
|------|---------|
| `saudi-theme.css` | Saudi-specific styling theme with green primary colors |

## Import Structure

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

## Adding New Styles

When adding new styles:

1. Determine the appropriate file based on functionality
2. If creating a new category, add a new file in the appropriate directory
3. Update imports in `App.css` or other relevant files
4. Document any new variables or classes in this guide
