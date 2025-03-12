
# Best Practices

1. **Use Tailwind Classes First**: Prefer using Tailwind utility classes over writing custom CSS
   ```jsx
   // Good
   <div className="flex items-center justify-between p-4 bg-card rounded-lg">
     
   // Avoid
   <div className="header-container">
   ```

2. **Follow BEM for Custom CSS**: When writing custom CSS, follow BEM naming convention
   ```css
   /* Block */
   .card {}
   
   /* Element */
   .card__title {}
   
   /* Modifier */
   .card--featured {}
   ```

3. **Maintain RTL Support**: Ensure UI works correctly in RTL mode
   ```jsx
   // Use logical properties
   <div className="ms-4"> // margin-inline-start instead of margin-left
   ```

4. **Component-Based Styling**: Keep styling close to components
   ```jsx
   // Good
   function Card({ className, ...props }) {
     return <div className={cn("bg-card p-4 rounded-lg", className)} {...props} />
   }
   
   // Avoid global styles for specific components
   ```

5. **Theme Consistency**: Use the design tokens and variables defined in the theme
   ```jsx
   // Good
   <div className="bg-primary text-primary-foreground">
   
   // Avoid
   <div style={{ backgroundColor: '#004d40', color: 'white' }}>
   ```

6. **Optimize for Mobile**: Always consider mobile-first approach
   ```jsx
   // Mobile first
   <div className="w-full md:w-1/2 lg:w-1/3">
   ```

7. **Keep It Organized**: Follow the file structure defined in this guide
   - Keep related styles together
   - Use the appropriate CSS files for different concerns
   - Document new style additions

8. **Document Exceptions**: If you need to diverge from these guidelines, document why
   ```css
   /* 
    * Exception to standard button styling.
    * Special case for checkout button that needs to be more prominent.
    */
   .checkout-button {
     font-size: 1.25rem;
   }
   ```

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

## Code Review Checklist

When reviewing code, check for these styling considerations:

- [ ] Uses Tailwind utility classes when appropriate
- [ ] Follows consistent naming conventions
- [ ] Maintains responsive design principles
- [ ] Uses theme colors and variables
- [ ] Respects accessibility guidelines
- [ ] Supports RTL layout
- [ ] Follows component architecture
- [ ] Avoids unnecessary custom CSS
