
# Responsive Design

## Screen Size Classes

Use the classes from `responsive.css`:

- `screen-size-standard`: Default size
- `screen-size-compact`: Smaller size
- `screen-size-large`: Larger size

## Input Method Detection

Use the classes from `input-methods.css`:

- `touch-ui`: Touch-friendly UI with larger tap targets
- `mouse-ui`: Mouse-friendly UI with hover effects

## Media Queries

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

## Responsive Containers

Use the `responsive-container` class for automatic width adjustment:

```html
<div className="responsive-container">
  <div className="app-section">Content goes here</div>
</div>
```

## Mobile Optimization

For touch devices, apply these principles:

- Use minimum 44px hit targets for interactive elements
- Increase padding on mobile views
- Simplify UI on smaller screens
- Use stack layouts instead of grids

Example:
```jsx
<div className="grid-container md:grid-cols-2 lg:grid-cols-3">
  {/* Will stack on mobile, 2 columns on md, 3 columns on lg */}
  <div className="touch-target">Item 1</div>
  <div className="touch-target">Item 2</div>
  <div className="touch-target">Item 3</div>
</div>
```

## Responsive Table

For responsive tables that adapt to mobile:

```html
<div className="responsive-table">
  <table>
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Header 1">Data 1</td>
        <td data-label="Header 2">Data 2</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Content Areas

Apply appropriate padding based on screen size:

```html
<div className="content-area">
  <!-- Content here will have responsive padding -->
</div>
```
