
import { IDatabaseService } from "../types";

// Function to determine if we're running in Electron
export const isElectron = (): boolean => {
  // @ts-ignore - window.db is defined in Electron's preload script
  return !!window.db;
};

// Abstract base class with common functionality
export abstract class BaseService {
  protected isElectron(): boolean {
    // @ts-ignore - window.db is defined in Electron's preload script
    return !!window.db;
  }
}
