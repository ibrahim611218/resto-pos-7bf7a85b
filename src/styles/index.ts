
// Import all CSS files to be used in the application
// Order matters for Tailwind's layer system
import './base-elements.css';
import './utilities.css';
import './saudi-theme.css';
import './restopos-theme.css';
import './responsive-grid.css';
import './base.css';
import './pos.css';
import './products.css';
import './compact-ui.css';
import './mobile.css';
import './desktop.css';
import './fullscreen.css';
import './touch.css';

// Export a dummy function to make this a valid module
export const loadStyles = () => {
  console.log('All styles loaded');
};
