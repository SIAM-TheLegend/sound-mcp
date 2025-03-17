# Sound Files for sound-mcp

This directory contains sound files that can be played by the sound-mcp server.

## Default Sounds

The package comes with these default notification sounds:

- `success.wav` - Success sound (default)
- `warning.wav` - Warning sound
- `error.wav` - Error sound

## Adding Custom Sounds

To add your own custom sounds:

1. Place MP3, WAV, or OGG files in this directory
2. Update the `config.ts` file to include your custom sounds:

```typescript
const config: SoundConfig = {
  // ... other config properties
  customSounds: {
    // ... existing sounds
    myCustomSound: "my-custom-sound.wav",
  },
};
```

3. You can then play your custom sound using:

```
npx sound-mcp play --sound=myCustomSound
```

## Sound Requirements

- Supported formats: MP3, WAV, OGG
- Keep sound files small for quick loading (recommended < 1MB)
- Short sounds (1-3 seconds) work best for notifications
