import { soundPlayer } from "./soundPlayer";
import { PlayCommandOptions, ListCommandOptions } from "./types/commands";

/**
 * Main server class for the MCP sound player
 * Handles command processing and execution
 */
class SoundMcpServer {
  /**
   * Initialize the server
   */
  constructor() {
    // Server initialization logic can go here if needed in the future
  }

  /**
   * Play a sound with the specified options
   * @param options The options for playing the sound
   * @returns Promise that resolves when the sound has finished playing
   */
  async playSound(options: PlayCommandOptions): Promise<void> {
    try {
      if (options.debug) {
        console.log("Playing sound with options:", options);
      }

      await soundPlayer.playSound({
        sound: options.sound,
        volume: options.volume,
        repeat: options.repeat,
      });

      if (options.debug) {
        console.log("Sound playback completed");
      }
    } catch (error) {
      console.error("Error playing sound:", error);
      throw error;
    }
  }

  /**
   * List available sounds
   * @param options Options for listing sounds
   * @returns Array of sound names
   */
  listSounds(options: ListCommandOptions): string[] {
    try {
      const sounds = soundPlayer.listSounds();

      if (options.debug) {
        console.log(`Found ${sounds.length} available sounds`);
      }

      // Format the output based on the specified format
      if (options.format === "json") {
        console.log(JSON.stringify(sounds, null, 2));
      } else if (options.format === "table") {
        console.log("Available Sounds:");
        console.log("----------------");
        sounds.forEach((sound, index) => {
          console.log(`${index + 1}. ${sound}`);
        });
      } else {
        // Simple format (default)
        console.log("Available sounds:", sounds.join(", "));
      }

      return sounds;
    } catch (error) {
      console.error("Error listing sounds:", error);
      return [];
    }
  }
}

// Export a singleton instance
export const soundMcpServer = new SoundMcpServer();

// Export the class for testing and extension
export default SoundMcpServer;
