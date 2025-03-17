import { SoundConfig } from "./src/types/config";
import path from "path";

/**
 * Configuration for the sound-mcp server
 * Customize sounds and playback settings here
 */
const config: SoundConfig = {
  // Default sound to play when no specific sound is requested
  defaultSound: "success.wav",

  // Default volume level (0.0 to 1.0)
  volume: 1,

  // Custom sound mappings
  // Keys are sound names, values are filenames in the public/sounds directory
  customSounds: {
    success: "success.wav",
    warning: "warning.wav",
    error: "error.wav",
  },
};

export default config;
