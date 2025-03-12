
# Typography

## Font Families

- Primary: `'Tajawal'` (RTL)
- Secondary: `'Cairo'` (RTL)
- Fallback: `'Inter'` (LTR)

## Font Sizes

Use Tailwind's font size classes for consistency:

- `text-xs`: 0.75rem (12px) - Very small text, footnotes
- `text-sm`: 0.875rem (14px) - Small text, secondary information
- `text-base`: 1rem (16px) - Body text 
- `text-lg`: 1.125rem (18px) - Large body text
- `text-xl`: 1.25rem (20px) - Subtitles
- `text-2xl`: 1.5rem (24px) - Section headings
- `text-3xl`: 1.875rem (30px) - Page headings

## Font Weights

- `font-light`: 300
- `font-normal`: 400 (body text)
- `font-medium`: 500 (emphasis)
- `font-semibold`: 600 (headings)
- `font-bold`: 700 (important elements)

## Text Direction

The application uses RTL (Right-to-Left) text direction to support Arabic language:

```html
<html dir="rtl" lang="ar">
```

## Font Imports

Fonts are imported in the `index.css` file:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');
```

## Text Formatting

Use the appropriate Tailwind classes for text formatting:

- `text-foreground`: Primary text color
- `text-muted-foreground`: Secondary text color
- `text-primary`: Brand color text
- `text-center`, `text-right`, `text-left`: Text alignment
- `truncate`: Truncate text with ellipsis
- `whitespace-nowrap`: Prevent text wrapping
- `text-balance`: Balance text for better readability

## Example Usage

```jsx
<h1 className="text-2xl font-semibold text-foreground">Page Title</h1>
<p className="text-base text-muted-foreground">This is a paragraph of text that provides additional information.</p>
<span className="text-sm font-medium text-primary">Important detail</span>
```
