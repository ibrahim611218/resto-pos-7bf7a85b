
# Accessibility

## Color Contrast

- Ensure text has sufficient contrast (minimum 4.5:1 for normal text)
- Use the `text-foreground` on appropriate backgrounds
- Test color combinations with accessibility tools

## Focus States

- Don't remove focus outlines
- Use the built-in focus styles from shadcn/ui
- Ensure all interactive elements can be navigated with keyboard

Example of maintaining focus states:
```tsx
<Button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Accessible Button
</Button>
```

## Screen Readers

- Use appropriate ARIA attributes when needed
- Use semantic HTML elements
- Provide text alternatives for images

Example:
```tsx
<img src="/logo.png" alt="Company Logo" />
<button aria-label="Close dialog" onClick={closeDialog}>
  <XIcon />
</button>
```

## Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Use correct tab order
- Implement keyboard shortcuts with appropriate ARIA labels

## Text Sizing

- Allow text to be resizable
- Use relative units (rem, em) instead of fixed units (px)
- Test with different font sizes

## RTL Support

- Ensure UI works correctly in RTL mode
- Use appropriate CSS properties that respect RTL:
  - Use `margin-inline-start` instead of `margin-left`
  - Use `start` and `end` instead of `left` and `right`

## Touch Targets

- Make touch targets at least 44px × 44px
- Provide adequate spacing between interactive elements
- Use the `touch-ui` class for touch-optimized interfaces

```html
<button className="touch-target">
  Submit
</button>
```

## ARIA Landmarks

Use proper ARIA landmarks to help users navigate:

```html
<header role="banner">Header</header>
<nav role="navigation">Navigation</nav>
<main role="main">Main content</main>
<aside role="complementary">Sidebar</aside>
<footer role="contentinfo">Footer</footer>
```
