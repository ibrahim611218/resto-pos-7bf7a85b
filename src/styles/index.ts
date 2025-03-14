
// Import base styles first to ensure proper ordering
import './base.css';
import './base-elements.css';
import './utilities.css';

// Import component-specific styles
import './desktop.css';
import './mobile.css';
import './fullscreen.css';
import './pos.css';
import './touch.css'; // Touch-related fixes
import './products.css';
import './compact-ui.css';
import './responsive-grid.css';

// Import theme styles
import './restopos-theme.css';
import './saudi-theme.css';

// Export a loadStyles function that doesn't do anything
// but satisfies the TypeScript import in main.tsx
export const loadStyles = (): void => {
  // All styles are already imported above
  // This function exists to provide the export that main.tsx expects
  console.log('Styles loaded');
};
