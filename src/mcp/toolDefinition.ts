/**
 * Model Context Protocol (MCP) tool definitions for sound-mcp
 * This file defines the schema for the sound playing tool that can be called by AI agents
 */

export const playSoundToolDefinition = {
  name: "play_sound",
  description: "Play a notification sound on the user's device",
  parameters: {
    type: "object",
    properties: {
      sound: {
        type: "string",
        description: "The name of the sound to play. If not specified, the default sound will be used.",
      },
      volume: {
        type: "number",
        description: "Volume level (0.0 to 1.0). If not specified, the default volume will be used.",
      },
      repeat: {
        type: "integer",
        description: "Number of times to repeat the sound. Default is 1.",
      },
    },
    required: [],
  },
  returns: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        description: "Whether the sound was played successfully",
      },
      message: {
        type: "string",
        description: "Status message about the sound playback",
      },
    },
  },
};

// Tool definition for listing available sounds
export const listSoundsToolDefinition = {
  name: "list_sounds",
  description: "List all available notification sounds",
  parameters: {
    type: "object",
    properties: {},
    required: [],
  },
  returns: {
    type: "object",
    properties: {
      sounds: {
        type: "array",
        items: {
          type: "string",
        },
        description: "List of available sound names",
      },
    },
  },
};

// Tool definition for AI SDK integration tool
export const sdkToolDefinition = {
  name: "sdk_tool",
  description: "Execute a generic operation for AI SDK integration",
  parameters: {
    type: "object",
    properties: {
      action: {
        type: "string",
        description: "The specific action to perform",
      },
    },
    required: ["action"],
  },
  returns: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        description: "Indicator of the tool execution success",
      },
      message: {
        type: "string",
        description: "The result message of the tool execution",
      },
    },
  },
};
