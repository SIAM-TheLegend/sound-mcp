# Sound MCP Server

A Model Context Protocol (MCP) server that plays notification sounds when triggered remotely through any Agent or AI SDK using `npx`.

## Overview

This project implements a lightweight MCP server that plays sound notifications using TypeScript. The server is designed to be available via `npx`, allowing you to trigger sound notifications through simple commands in the AI Agent interface without needing to maintain local files or services.

## Features

- 🔔 Play customizable notification sounds
- 🌐 Remote triggering through AI Agents via `npx`
- ☁️ No installation needed (runs directly with `npx`)
- 🔌 Simple command-line interface
- 🔄 Stateless operation
- 📝 Type-safe implementation with TypeScript
- 🔧 MCP Tool integration for AI agent tool calls

## Prerequisites

- Node.js (v16+)
- npm (for `npx` functionality)
- Access to AI Agent interface or Claude Desktop App
- TypeScript knowledge (for development)

## Usage with AI Agents

Once published to npm, the MCP server can be triggered directly with npx:

```bash
npx sound-mcp play --sound=notification
```

This approach is commonly used with MCP commands and doesn't require you to install anything locally.

### Direct Command for AI Assistants

If you're using this with an AI Assistant directly, you can provide this command:

```bash
!mcp npx sound-mcp play --sound=notification
```

## Command-Line Interface

The `sound-mcp` CLI offers several commands:

```bash
# List available sounds
npx sound-mcp list

# Play a sound
npx sound-mcp play --sound=notification

# Set volume
npx sound-mcp play --sound=notification --volume=0.5

# Play multiple times
npx sound-mcp play --sound=success --repeat=3

# Start the MCP server (for AI tool integration)
npx sound-mcp server --port=8080
```

## Using as an MCP Tool

The sound-mcp server can be used as an MCP tool that AI agents can call directly:

### Starting the Tool Server

Start the MCP server to expose the sound playing tools:

```bash
npx sound-mcp server --port=8080
```

This starts an HTTP server that listens for tool requests from AI agents.

### Available Tools

The server exposes two tools:

1. **play_sound** - Plays a notification sound

   - Parameters:
     - `sound` (string): Name of sound to play
     - `volume` (number): Volume level (0.0 to 1.0)
     - `repeat` (integer): Number of times to repeat

2. **list_sounds** - Lists all available notification sounds
   - No parameters required

### Integration with Claude Desktop App

Claude Desktop App can be configured to use these tools by registering the MCP tool server endpoint in your preferences or workspace settings.

```json
{
  "mcpServers": {
    // Other MCP servers
    "Sound MCP": {
      "command": "npx",
      "args": [
        "sound-mcp",
        "play",
        "--sound=notification"
      ]
    }
  }
}
```

## Customization

### Adding Custom Sounds

1. Fork this repository
2. Add your custom sounds to the `public/sounds/` directory
3. Update the `config.ts` file to include your custom sounds or configurations:

   ```typescript
   const config: SoundConfig = {
     defaultSound: "success.mp3", // Default ringtone sound
     volume: 0.8, // Default volume level
     customSounds: {
       // Add your custom sound mappings here
       success: "success.mp3",
       warning: "warning.mp3",
       error: "error.mp3",
     },
   };
   ```

4. Build this using `npm run build` or publish your own version to npm with a different package name

### Changing Default Behavior

You can modify the default behavior by editing the configuration options in `config.ts` before publishing.

## Troubleshooting

If you encounter issues with sound not playing:

1. Ensure you have Node.js v16+ installed
2. Try clearing your npm cache: `npm cache clean --force`
3. Check that your package is properly published on npm
4. Verify that your system has audio playback capabilities
5. Check permissions for audio playback on your system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The AI agent developers for their contributions
- The open-source audio libraries used in this project
