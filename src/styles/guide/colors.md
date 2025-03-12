
# Color System

RestoPOS uses a Saudi-themed color system with green as primary color:

## Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#004d40` | Main brand color, primary buttons, headers |
| Secondary Green | `#00695c` | Secondary elements, highlights |
| Accent Orange | `#ff5722` | Call-to-action, important actions |

## Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `hsl(142, 76%, 36%)` | Success states, confirmations |
| Destructive | `hsl(0, 84.2%, 60.2%)` | Error states, deletions |
| Muted | `hsl(240, 3.8%, 46.1%)` | Secondary text, disabled states |

## Using Colors

Colors should be used through CSS variables or Tailwind classes:

```css
/* CSS Variable usage */
color: var(--primary);

/* Tailwind usage */
<div className="bg-primary text-primary-foreground">Content</div>
```

## Color Variables

All color variables are defined in the theme configuration and should be used consistently:

```css
:root {
  --background: 0 0% 98%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 167 100% 15%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 167 80% 15%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 167 100% 95%;
  --accent-foreground: 167 100% 15%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --success: 142 76% 36%;
  --success-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 167 100% 15%;
}
```
