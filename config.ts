import { SoundConfig } from "./src/types/config";
import path from "path";

/**
 * Configuration for the sound-mcp server
 * Customize sounds and playback settings here
 */
const config: SoundConfig = {
  // Default sound to play when no specific sound is requested
  defaultSound: "notification.mp3",

  // Default volume level (0.0 to 1.0)
  volume: 0.8,

  // Custom sound mappings
  // Keys are sound names, values are filenames in the public/sounds directory
  customSounds: {
    notification: "notification.mp3",
    success: "success.mp3",
    warning: "warning.mp3",
    error: "error.mp3",
    complete: "complete.mp3",
  },
};

export default config;
