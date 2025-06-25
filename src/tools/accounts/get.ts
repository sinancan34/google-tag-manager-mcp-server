import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, getTagManagerClient, log } from "../../utils";

export const get = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "tag_manager_get_account",
    "Gets a GTM Account",
    {
      accountId: z
        .string()
        .describe("The unique ID of the GTM Account to retrieve."),
    },
    async ({ accountId }): Promise<CallToolResult> => {
      log(`Running tool: tag_manager_get_account for account ${accountId}`);

      try {
        const tagmanager = await getTagManagerClient(props.accessToken);
        const response = await tagmanager.accounts.get({
          path: `accounts/${accountId}`,
        });

        return {
          content: [
            { type: "text", text: JSON.stringify(response.data, null, 2) },
          ],
        };
      } catch (error) {
        return createErrorResponse(
          `Error getting account at account ${accountId}`,
          error,
        );
      }
    },
  );
};
