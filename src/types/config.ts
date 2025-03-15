/**
 * Configuration interface for the sound-mcp server
 * Defines settings for sound playback and custom sound mappings
 */
export interface SoundConfig {
  /**
   * Default sound file to play if no specific sound is specified
   */
  defaultSound: string;

  /**
   * Default volume level (0.0 to 1.0)
   */
  volume: number;

  /**
   * Custom sound mappings where keys are sound names and values are file paths
   */
  customSounds: Record<string, string>;
}
