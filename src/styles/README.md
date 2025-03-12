
# RestoPOS Styling System

This README provides an overview of how styling is organized in the RestoPOS application.

## Directory Structure

```
src/
├── styles/
│   ├── core/
│   │   ├── scrollbar.css       - Scrollbar styling
│   │   ├── containers.css      - Container layouts
│   │   ├── responsive.css      - Responsive design utilities
│   │   ├── aspect-ratio.css    - Aspect ratio helpers
│   │   ├── input-methods.css   - Touch/mouse input optimizations
│   │   └── flex.css            - Flexbox utilities
│   ├── saudi-theme.css         - Saudi Arabia themed styles
│   ├── StyleGuide.md           - Comprehensive styling guidelines
│   └── README.md               - This file
├── index.css                   - Global styles and CSS imports
└── App.css                     - Application styles and core CSS imports
```

## How Styles Are Organized

1. **Core Styles**: Foundational styling utilities in the `core/` directory
2. **Theme Styles**: Theme-specific styles in the root of the `styles/` directory
3. **Component Styles**: Component-specific styles using Tailwind classes

## How to Use This System

1. **For Global Styles**: Add to the appropriate core CSS file
2. **For New Components**: Use Tailwind classes and shadcn/ui components
3. **For Theme Variations**: Modify the theme CSS files

## Best Practices

1. Follow the [Style Guide](./StyleGuide.md) for detailed guidelines
2. Use Tailwind utility classes whenever possible
3. Keep custom CSS to a minimum
4. Maintain RTL support for all UI elements

## Importing Styles

Styles are imported in the following files:

- `index.css`: Imports Tailwind, theme files, and fonts
- `App.css`: Imports all core CSS files

## Working with RTL

The application is designed to support RTL (Right-to-Left) layouts for Arabic language:

- Use the built-in RTL support in Tailwind with `rtl:` variants
- Test all UI components in both LTR and RTL modes

## Questions?

If you have questions about the styling system, refer to the [Style Guide](./StyleGuide.md) or contact the development team.
