import path from "path";
import fs from "fs";

/**
 * Utilities for handling file paths in the sound-mcp application
 */

/**
 * Get the absolute path to the sounds directory
 * This handles both development and production environments
 * @returns The path to the sounds directory
 */
export function getSoundsDirectory(): string {
  // In development, sounds are in /public/sounds
  // In production (when installed via npm/npx), they're in /dist/public/sounds

  // First, try the development path (relative to the src directory)
  const devPath = path.resolve(__dirname, "../../../public/sounds");
  if (fs.existsSync(devPath)) {
    return devPath;
  }

  // Then try the production path (relative to the installed package)
  const prodPath = path.resolve(__dirname, "../../public/sounds");
  if (fs.existsSync(prodPath)) {
    return prodPath;
  }

  // If neither exists, create the development path and return it
  try {
    fs.mkdirSync(devPath, { recursive: true });
    return devPath;
  } catch (error) {
    console.error("Error creating sounds directory:", error);
    // Fall back to a temporary directory
    return path.resolve(process.cwd(), "sounds");
  }
}

/**
 * Ensure a directory exists, creating it if necessary
 * @param dirPath The directory path to ensure exists
 * @returns The directory path
 */
export function ensureDirectoryExists(dirPath: string): string {
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch (error) {
      console.error(`Error creating directory ${dirPath}:`, error);
    }
  }
  return dirPath;
}
