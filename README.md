# Sound MCP Server

A Model Context Protocol (MCP) server that plays notification sounds when triggered remotely through the Cursor AI SDK using `npx`.

## Overview

This project implements a lightweight MCP server that plays sound notifications using TypeScript. The server is designed to be available via `npx`, allowing you to trigger sound notifications through simple commands in the Cursor AI SDK without needing to maintain local files or services.

## Features

- 🔔 Play customizable notification sounds
- 🌐 Remote triggering through Cursor AI SDK via `npx`
- ☁️ No installation needed (runs directly with `npx`)
- 🔌 Simple command-line interface
- 🔄 Stateless operation
- 📝 Type-safe implementation with TypeScript

## Prerequisites

- Node.js (v16+)
- npm (for `npx` functionality)
- Cursor AI SDK access
- TypeScript knowledge (for development)

## Project Structure

```
sound-mcp/
├── src/
│   ├── server.ts        # Main MCP server implementation
│   ├── soundPlayer.ts   # Sound playing functionality
│   ├── types/           # TypeScript type definitions
│   │   ├── config.ts    # Configuration interface
│   │   └── commands.ts  # Command interface definitions
│   └── utils/           # Helper utilities
├── public/
│   └── sounds/          # Default notification sounds
├── config.ts            # Configuration options
├── bin/                 # Command-line interface
│   └── sound-mcp.ts     # CLI entry point
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md            # This documentation
```

## Setup

1. Clone this repository:

   ```
   git clone https://github.com/yourusername/sound-mcp.git
   cd sound-mcp
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure your sound preferences in `config.ts`:

   ```typescript
   interface SoundConfig {
     defaultSound: string;
     volume: number;
     customSounds: Record<string, string>;
   }

   const config: SoundConfig = {
     defaultSound: "notification.mp3",
     volume: 0.8,
     customSounds: {
       // Add your custom sound mappings here
       success: "success.mp3",
       warning: "warning.mp3",
       error: "error.mp3",
     },
   };

   export default config;
   ```

4. Build the TypeScript code:
   ```
   npm run build
   ```

## Publishing to npm

To make your MCP server available via `npx`, you'll need to publish it to npm:

1. Make sure your `package.json` includes a "bin" entry and TypeScript build scripts:

   ```json
   {
     "name": "sound-mcp",
     "version": "1.0.0",
     "bin": {
       "sound-mcp": "./dist/bin/sound-mcp.js"
     },
     "scripts": {
       "build": "tsc",
       "prepublishOnly": "npm run build"
     },
     "devDependencies": {
       "typescript": "^4.9.5",
       "@types/node": "^18.14.0"
     }
   }
   ```

2. Set up your TypeScript configuration in `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "outDir": "./dist",
       "rootDir": "./",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*", "bin/**/*", "config.ts"],
     "exclude": ["node_modules", "dist"]
   }
   ```

3. Publish to npm:
   ```
   npm login
   npm publish
   ```

## Usage with Cursor AI SDK

Once published to npm, the MCP server can be triggered directly with npx:

```
npx sound-mcp play --sound=notification
```

This approach is commonly used with MCP commands and doesn't require you to install anything locally.

### Direct Command for Cursor

If you're using this with the Cursor AI directly, you can provide this command:

```
!mcp npx sound-mcp play --sound=notification
```

## Command-Line Interface

The `sound-mcp` CLI offers several commands:

```
# Play a sound
npx sound-mcp play --sound=notification

# List available sounds
npx sound-mcp list

# Set volume
npx sound-mcp play --sound=notification --volume=0.5

# Play multiple times
npx sound-mcp play --sound=success --repeat=3
```

## How It Works

When using the `npx` approach:

1. The Cursor AI SDK executes the npx command
2. The sound-mcp package is temporarily downloaded (if not already cached)
3. The CLI tool processes the command and plays the requested sound

## Why TypeScript?

TypeScript was chosen for this project for several benefits:

- **Type Safety**: Ensures command parameters are handled correctly
- **Better Developer Experience**: Improved IDE support with autocomplete
- **Self-documenting Code**: Types serve as built-in documentation
- **Maintainability**: Easier to maintain and extend with type checks
- **Error Prevention**: Catch errors during development rather than runtime

## Security Considerations

- The npm package is publicly available but does not expose any API endpoints
- Limited to playing sounds on the local machine where the command is executed
- Consider adding command validation to prevent abuse
- TypeScript helps ensure proper validation of inputs

## Customization

### Adding Custom Sounds

1. Fork this repository
2. Add your custom sounds to the `public/sounds/` directory
3. Update the `config.ts` file to include your custom sounds
4. Publish your own version to npm with a different package name

### Changing Default Behavior

You can modify the default behavior by editing the configuration options in `config.ts` before publishing.

## Troubleshooting

If you encounter issues with sound not playing:

1. Ensure you have Node.js v16+ installed
2. Try clearing your npm cache: `npm cache clean --force`
3. Check that your package is properly published on npm
4. Verify that your system has audio playback capabilities
5. Check permissions for audio playback on your system

## Development

To work on this project:

1. Clone the repository
2. Install dependencies: `npm install`
3. Make changes to TypeScript files
4. Build: `npm run build`
5. Test locally: `node dist/bin/sound-mcp.js play --sound=notification`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Cursor AI team for the SDK
- The open-source audio libraries used in this project
