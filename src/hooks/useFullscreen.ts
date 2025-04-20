
// This is a minimal replacement for the removed fullscreen functionality
// It provides the interface that existing code expects but with no functionality

export const useFullscreen = () => {
  return {
    isFullscreen: false,
    toggleFullscreen: () => {},
    enableFullscreen: () => {},
    disableFullscreen: () => {},
  };
};
