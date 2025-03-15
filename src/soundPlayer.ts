import player from "play-sound";
import path from "path";
import fs from "fs";
import config from "../config";
import { getSoundsDirectory } from "./utils/paths";

/**
 * SoundPlayer class to handle sound playback functionality
 */
class SoundPlayer {
  private player: any;
  private soundsDir: string;

  /**
   * Constructor initializes the sound player
   */
  constructor() {
    // Initialize the player instance
    this.player = player({});

    // Determine the sounds directory path using our utility function
    this.soundsDir = getSoundsDirectory();
  }

  /**
   * Get the full path to a sound file
   * @param soundName The name of the sound to play
   * @returns The full path to the sound file
   */
  private getSoundPath(soundName: string): string {
    // Check if the sound name exists in custom sounds
    const soundFile = config.customSounds[soundName] || soundName;

    // If the soundFile already has a path, return it
    if (path.isAbsolute(soundFile) && fs.existsSync(soundFile)) {
      return soundFile;
    }

    // Otherwise, join with the sounds directory
    return path.join(this.soundsDir, soundFile);
  }

  /**
   * Play a sound file
   * @param options Options for playing the sound
   * @returns Promise that resolves when the sound has finished playing
   */
  async playSound(options: { sound?: string; volume?: number; repeat?: number }): Promise<void> {
    // Default options
    const sound = options.sound || config.defaultSound;
    const volume = options.volume !== undefined ? options.volume : config.volume;
    const repeat = options.repeat || 1;

    // Get the full path to the sound file
    const soundPath = this.getSoundPath(sound);

    // Check if the sound file exists
    if (!fs.existsSync(soundPath)) {
      throw new Error(`Sound file not found: ${soundPath}`);
    }

    // Play the sound the specified number of times
    const playPromises = [];
    for (let i = 0; i < repeat; i++) {
      playPromises.push(this.playSingleSound(soundPath, volume));

      // If we're repeating, add a small delay between plays
      if (i < repeat - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    // Wait for all sounds to finish playing
    await Promise.all(playPromises);
  }

  /**
   * Play a single sound file
   * @param soundPath The full path to the sound file
   * @param volume The volume level (0.0 to 1.0)
   * @returns Promise that resolves when the sound has finished playing
   */
  private playSingleSound(soundPath: string, volume: number): Promise<void> {
    return new Promise((resolve, reject) => {
      // Prepare options for the player
      const options: any = {};

      // Add volume if specified
      if (volume !== undefined) {
        options.afplay = ["-v", volume.toString()];
        options.mplayer = ["-volume", (volume * 100).toString()];
      }

      // Play the sound
      this.player.play(soundPath, options, (err: any) => {
        if (err) {
          console.error("Error playing sound:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * List all available sounds
   * @returns An array of available sound names
   */
  listSounds(): string[] {
    try {
      // Get all custom sounds from config
      const configSounds = Object.keys(config.customSounds);

      // Get all files in the sounds directory
      const soundFiles = fs.existsSync(this.soundsDir)
        ? fs
            .readdirSync(this.soundsDir)
            .filter((file: string) => /\.(mp3|wav|ogg)$/i.test(file))
            .map((file: string) => {
              // Extract the sound name from the filename without extension
              const soundName = path.basename(file, path.extname(file));
              return soundName;
            })
        : [];

      // Combine and deduplicate
      return [...new Set([...configSounds, ...soundFiles])];
    } catch (error) {
      console.error("Error listing sounds:", error);
      return Object.keys(config.customSounds);
    }
  }
}

// Export a singleton instance
export const soundPlayer = new SoundPlayer();

// Export the class for testing and extension
export default SoundPlayer;
