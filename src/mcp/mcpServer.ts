import http from "http";
import { soundMcpServer } from "../server";
import { playSoundToolDefinition, listSoundsToolDefinition, sdkToolDefinition } from "./toolDefinition";

/**
 * MCP Server class that handles HTTP requests for tool execution
 */
export class McpServer {
  private server: http.Server;
  private port: number;

  /**
   * Create a new MCP server instance
   * @param port The port to listen on
   */
  constructor(port: number = 8080) {
    this.port = port;
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  /**
   * Start the MCP server
   */
  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`MCP server listening on port ${this.port}`);
      console.log(`Tool endpoint available at http://localhost:${this.port}/tools`);
    });
  }

  /**
   * Stop the MCP server
   */
  public stop(): void {
    this.server.close();
    console.log("MCP server stopped");
  }

  /**
   * Handle incoming HTTP requests
   * @param req The HTTP request
   * @param res The HTTP response
   */
  private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    // Set CORS headers to allow requests from any origin
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS requests
    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.end();
      return;
    }

    // Handle tool definition endpoint
    if (req.url === "/tools" && req.method === "GET") {
      this.handleToolDefinitions(req, res);
      return;
    }

    // Handle tool execution endpoint for play_sound
    if (req.url === "/tools/play_sound" && req.method === "POST") {
      await this.handlePlaySound(req, res);
      return;
    }

    // Handle tool execution endpoint for list_sounds
    if (req.url === "/tools/list_sounds" && req.method === "POST") {
      this.handleListSounds(req, res);
      return;
    }

    // New branch for sdk_tool
    if (req.url === "/tools/sdk_tool" && req.method === "POST") {
      await this.handleSDKTool(req, res);
      return;
    }

    // If no matching endpoint, return 404
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }

  /**
   * Handle requests for tool definitions
   * @param req The HTTP request
   * @param res The HTTP response
   */
  private handleToolDefinitions(req: http.IncomingMessage, res: http.ServerResponse): void {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    // Return the tool definitions including the new SDK tool
    const tools = [playSoundToolDefinition, listSoundsToolDefinition, sdkToolDefinition];
    res.end(JSON.stringify({ tools }));
  }

  /**
   * Handle requests to execute the play_sound tool
   * @param req The HTTP request
   * @param res The HTTP response
   */
  private async handlePlaySound(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      // Parse the request body
      const body = await this.parseJsonBody(req);

      // Extract parameters
      const { sound, volume, repeat } = body.parameters || {};

      // Play the sound
      await soundMcpServer.playSound({
        sound,
        volume,
        repeat,
        debug: true,
      });

      // Return success response
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          success: true,
          message: `Sound ${sound || "default"} played successfully`,
        })
      );
    } catch (error) {
      // Handle errors
      console.error("Error playing sound:", error);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        })
      );
    }
  }

  /**
   * Handle requests to execute the list_sounds tool
   * @param req The HTTP request
   * @param res The HTTP response
   */
  private handleListSounds(req: http.IncomingMessage, res: http.ServerResponse): void {
    try {
      // List available sounds
      const sounds = soundMcpServer.listSounds({ debug: true });

      // Return success response
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          sounds,
        })
      );
    } catch (error) {
      // Handle errors
      console.error("Error listing sounds:", error);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          sounds: [],
          error: error instanceof Error ? error.message : "Unknown error",
        })
      );
    }
  }

  /**
   * Handle requests to execute the sdk_tool
   * @param req The HTTP request
   * @param res The HTTP response
   */
  private async handleSDKTool(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    try {
      // Parse the request body
      const body = await this.parseJsonBody(req);
      const { action } = body.parameters || {};

      // Placeholder for actual cursor action integration
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          success: true,
          message: `Action ${action} executed successfully`,
        })
      );
    } catch (error) {
      console.error("Error executing cursor tool:", error);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        })
      );
    }
  }

  /**
   * Parse the JSON body from an HTTP request
   * @param req The HTTP request
   * @returns The parsed JSON body
   */
  private parseJsonBody(req: http.IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const json = JSON.parse(body);
          resolve(json);
        } catch (error) {
          reject(new Error("Invalid JSON body"));
        }
      });

      req.on("error", (error) => {
        reject(error);
      });
    });
  }
}

// Export a factory function to create an MCP server
export function createMcpServer(port?: number): McpServer {
  return new McpServer(port);
}
