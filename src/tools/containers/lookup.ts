import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { createErrorResponse, getTagManagerClient, log } from "../../utils";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";

export const lookup = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "tag_manager_lookup_container",
    "Looks up a Container by destination ID",
    {
      destinationId: z
        .string()
        .describe(
          "Destination ID linked to a GTM Container, e.g. AW-123456789",
        ),
    },
    async ({ destinationId }): Promise<CallToolResult> => {
      log(
        `Running tool: tag_manager_lookup_container for destinationId ${destinationId}`,
      );

      try {
        const tagmanager = await getTagManagerClient(props.accessToken);
        const response = await tagmanager.accounts.containers.lookup({
          destinationId,
        });

        return {
          content: [
            { type: "text", text: JSON.stringify(response.data, null, 2) },
          ],
        };
      } catch (error) {
        return createErrorResponse(
          `Error looking up container for destinationId ${destinationId}`,
          error,
        );
      }
    },
  );
};
