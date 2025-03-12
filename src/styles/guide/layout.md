
# Spacing & Layout

## Container System

Use the container classes for consistent widths:

- `container-standard`: Default size (1280px max)
- `container-compact`: Smaller container (1024px max)
- `container-large`: Wider container (1536px max)

## Spacing Scale

Follow Tailwind's spacing scale for consistency:

- `p-1`, `m-1`: 0.25rem (4px)
- `p-2`, `m-2`: 0.5rem (8px)
- `p-3`, `m-3`: 0.75rem (12px)
- `p-4`, `m-4`: 1rem (16px)
- `p-6`, `m-6`: 1.5rem (24px)
- `p-8`, `m-8`: 2rem (32px)

## Flexbox Layout

Use the utility classes from `flex.css`:

```html
<div className="flex-container">
  <div className="flex-item">Item 1</div>
  <div className="flex-item">Item 2</div>
</div>
```

## App Layout

The main application layout consists of:

```html
<div className="app-layout">
  <Sidebar />
  <main className="app-content">
    <div className="responsive-container">
      <Outlet />
    </div>
  </main>
</div>
```

## Grid Layouts

Use the grid utility classes for multi-column layouts:

```html
<div className="grid-container grid-cols-auto-fit">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

## Layout Classes

- `app-layout`: Main application layout
- `app-content`: Content area of the application
- `app-section`: Section within the content area
- `flex-container`: Basic flex container
- `flex-container-center`: Centered flex container
- `flex-column-center`: Centered column container
- `flex-row`: Row of items
- `flex-between`: Items with space between
- `flex-center`: Centered items
- `grid-container`: Basic grid container

## Section Components

Use the appropriate section components for content areas:

```html
<div className="app-section">
  <h2 className="text-xl font-semibold mb-4">Section Title</h2>
  <div className="grid-container grid-cols-auto-fit">
    <!-- Content goes here -->
  </div>
</div>
```
