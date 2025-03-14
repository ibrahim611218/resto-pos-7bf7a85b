
import { useState, useEffect, useCallback } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check if fullscreen is supported
  const fullscreenEnabled = 
    document.fullscreenEnabled ||
    // @ts-ignore - Vendor prefixed properties
    document.webkitFullscreenEnabled ||
    // @ts-ignore
    document.mozFullScreenEnabled ||
    // @ts-ignore
    document.msFullscreenEnabled;

  // Update state when fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = 
        document.fullscreenElement ||
        // @ts-ignore - Vendor prefixed properties
        document.webkitFullscreenElement ||
        // @ts-ignore
        document.mozFullScreenElement ||
        // @ts-ignore
        document.msFullscreenElement;
      
      setIsFullscreen(!!fullscreenElement);
      
      // Add/remove fullscreen class to body
      if (fullscreenElement) {
        document.body.classList.add('in-fullscreen');
        document.documentElement.classList.add('in-fullscreen');
        
        // Force resize event to update layout
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      } else {
        document.body.classList.remove('in-fullscreen');
        document.documentElement.classList.remove('in-fullscreen');
        
        // Force resize event to update layout
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!fullscreenEnabled) return;

    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (
        // @ts-ignore - Vendor prefixed methods
        document.webkitExitFullscreen
      ) {
        // @ts-ignore
        document.webkitExitFullscreen();
      } else if (
        // @ts-ignore
        document.mozCancelFullScreen
      ) {
        // @ts-ignore
        document.mozCancelFullScreen();
      } else if (
        // @ts-ignore
        document.msExitFullscreen
      ) {
        // @ts-ignore
        document.msExitFullscreen();
      }
    } else {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (
        // @ts-ignore - Vendor prefixed methods
        docEl.webkitRequestFullscreen
      ) {
        // @ts-ignore
        docEl.webkitRequestFullscreen();
      } else if (
        // @ts-ignore
        docEl.mozRequestFullScreen
      ) {
        // @ts-ignore
        docEl.mozRequestFullScreen();
      } else if (
        // @ts-ignore
        docEl.msRequestFullscreen
      ) {
        // @ts-ignore
        docEl.msRequestFullscreen();
      }
    }
  }, [isFullscreen, fullscreenEnabled]);

  return {
    isFullscreen,
    toggleFullscreen,
    fullscreenEnabled
  };
};
