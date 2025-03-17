#!/usr/bin/env node

import { Command } from "commander";
import { soundMcpServer } from "../src/server";
import { version, description } from "../package.json";
import path from "path";
import fs from "fs";
import { PlayCommandOptions, ListCommandOptions, ServerCommandOptions } from "../src/types/commands";
import { createMcpServer } from "../src/mcp/mcpServer";

/**
 * Main CLI application for sound-mcp
 * Provides command-line interface for playing sounds and listing available sounds
 */
const program = new Command();

// Set up program information
program.name("sound-mcp").description(description).version(version);

// Add the play command
program
  .command("play")
  .description("Play a notification sound")
  .option("-s, --sound <n>", "Name of the sound to play")
  .option("-v, --volume <level>", "Volume level (0.0 to 1.0)", parseFloat)
  .option("-r, --repeat <count>", "Number of times to repeat the sound", parseInt)
  .option("-d, --debug", "Enable debug output")
  .action(async (options: PlayCommandOptions) => {
    try {
      await soundMcpServer.playSound(options);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      process.exit(1);
    }
  });

// Add the list command
program
  .command("list")
  .description("List available sounds")
  .option("-f, --format <format>", "Output format (simple, table, json)", "simple")
  .option("-d, --debug", "Enable debug output")
  .action((options: ListCommandOptions) => {
    try {
      soundMcpServer.listSounds(options);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      process.exit(1);
    }
  });

// Add the server command
program
  .command("server")
  .description("Start the MCP server to enable AI tool integration")
  .option("-p, --port <port>", "Port to listen on", parseInt, 8080)
  .option("-d, --debug", "Enable debug output")
  .action((options: ServerCommandOptions) => {
    try {
      if (options.debug) {
        console.log("Starting MCP server with options:", options);
      }

      // Create and start the MCP server
      const mcpServer = createMcpServer(options.port);
      mcpServer.start();

      // Handle process termination
      process.on("SIGINT", () => {
        console.log("\nShutting down MCP server...");
        mcpServer.stop();
        process.exit(0);
      });

      console.log("Press Ctrl+C to stop the server");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      process.exit(1);
    }
  });

// Add a default behavior when no command is provided
program.action(() => {
  console.log("No command specified. Use --help to see available commands.");
  program.help();
});

// Parse command line arguments and execute
program.parse(process.argv);

// If no arguments are provided, show help
if (process.argv.length <= 2) {
  program.help();
}
