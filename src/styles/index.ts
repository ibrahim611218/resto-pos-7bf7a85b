
// Import styles from the root directory
import '../index.css';
import './themes.css';

// Export a function to be used in main.tsx
export const loadStyles = () => {
  // This function exists just to allow importing the CSS files
  console.log("Styles loaded successfully");
};
