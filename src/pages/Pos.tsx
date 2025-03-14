
import React, { useEffect } from "react";
import Pos from "@/features/pos/Pos";
import { useFullscreen } from "@/hooks/useFullscreen";

const PosPage: React.FC = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Force the page to take the full viewport on mount
  useEffect(() => {
    // Add fix to prevent touch event issues - add passive: false to document
    document.addEventListener('touchstart', function() {}, { passive: false });
    document.addEventListener('touchmove', function() {}, { passive: false });

    // Save original styles to restore on unmount
    const originalHtmlStyle = {
      height: document.documentElement.style.height,
      overflow: document.documentElement.style.overflow
    };
    
    const originalBodyStyle = {
      height: document.body.style.height,
      overflow: document.body.style.overflow,
      margin: document.body.style.margin,
      padding: document.body.style.padding
    };
    
    // Add fullscreen classes to the root elements
    document.documentElement.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    
    // Add POS-specific class
    document.body.classList.add('pos-active');
    
    // Force root elements to be interactive
    document.body.style.pointerEvents = "auto";
    document.documentElement.style.pointerEvents = "auto";
    
    // Force layout recalculation
    window.dispatchEvent(new Event('resize'));
    
    // Set multiple timeouts to trigger resize events after components have rendered
    const timeoutIds = [];
    [100, 300, 600, 1000, 2000].forEach(delay => {
      const id = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, delay);
      timeoutIds.push(id);
    });
    
    // Set an interval to check periodically for the first few seconds
    const intervalId = setInterval(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
    
    // Clear the interval after 5 seconds
    const clearIntervalId = setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
    
    // Special event to help other components know POS is active
    window.dispatchEvent(new CustomEvent('pos-active', { detail: { active: true } }));
    
    // Do not force collapse the sidebar, let the user control it
    // window.dispatchEvent(new CustomEvent('toggle-sidebar', { detail: { forceCollapse: true } }));
    
    // Cleanup on unmount
    return () => {
      document.documentElement.style.height = originalHtmlStyle.height;
      document.documentElement.style.overflow = originalHtmlStyle.overflow;
      document.body.style.height = originalBodyStyle.height;
      document.body.style.overflow = originalBodyStyle.overflow;
      document.body.style.margin = originalBodyStyle.margin;
      document.body.style.padding = originalBodyStyle.padding;
      document.body.classList.remove('pos-active');
      document.body.style.pointerEvents = "";
      document.documentElement.style.pointerEvents = "";
      
      // Remove touch event listeners
      document.removeEventListener('touchstart', function() {}, { passive: false } as EventListenerOptions);
      document.removeEventListener('touchmove', function() {}, { passive: false } as EventListenerOptions);
      
      // Clear all timeouts
      timeoutIds.forEach(id => clearTimeout(id));
      clearTimeout(clearIntervalId);
      clearInterval(intervalId);
      
      // Notify components that POS is no longer active
      window.dispatchEvent(new CustomEvent('pos-active', { detail: { active: false } }));
    };
  }, [isFullscreen, toggleFullscreen]);

  // Listen for window resize events and orientation changes
  useEffect(() => {
    const handleResize = () => {
      // Force another resize event after a short delay
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Re-apply styles when fullscreen state changes
  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add('in-fullscreen');
      document.documentElement.classList.add('in-fullscreen');
    } else {
      document.body.classList.remove('in-fullscreen');
      document.documentElement.classList.remove('in-fullscreen');
    }
  }, [isFullscreen]);

  return (
    <div className="min-h-screen max-w-full w-full h-full overflow-hidden m-0 p-0 pos-screen" 
      style={{ 
        pointerEvents: 'auto',
        touchAction: 'auto',
        // Set a lower z-index to ensure the sidebar can overlay
        zIndex: 0
      }}>
      <Pos />
    </div>
  );
};

export default PosPage;
