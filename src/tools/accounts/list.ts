import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";
import { createErrorResponse, getTagManagerClient, log } from "../../utils";

export const list = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "tag_manager_list_accounts",
    "Lists all GTM accounts accessible by the authenticated user",
    {},
    async (): Promise<CallToolResult> => {
      log("Running tool: tag_manager_list_accounts");

      try {
        const tagmanager = await getTagManagerClient(props.accessToken);
        const response = await tagmanager.accounts.list({});

        return {
          content: [
            { type: "text", text: JSON.stringify(response.data, null, 2) },
          ],
        };
      } catch (error) {
        return createErrorResponse("Error listing accounts", error);
      }
    },
  );
};
