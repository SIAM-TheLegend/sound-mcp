/**
 * Defines the available commands for the sound-mcp CLI
 */

/**
 * Base interface for all command options
 */
export interface BaseCommandOptions {
  /**
   * Debug mode toggle for verbose output
   */
  debug?: boolean;
}

/**
 * Options for the play command
 */
export interface PlayCommandOptions extends BaseCommandOptions {
  /**
   * Name of the sound to play
   */
  sound?: string;

  /**
   * Volume level for playback (0.0 to 1.0)
   */
  volume?: number;

  /**
   * Number of times to repeat the sound
   */
  repeat?: number;
}

/**
 * Options for the list command
 */
export interface ListCommandOptions extends BaseCommandOptions {
  /**
   * Format of the list output
   */
  format?: "table" | "json" | "simple";
}
