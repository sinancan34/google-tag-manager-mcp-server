import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { createErrorResponse, getTagManagerClient, log } from "../../utils";
import { McpAgentToolParamsModel } from "../../models/McpAgentModel";

export const remove = (
  server: McpServer,
  { props }: McpAgentToolParamsModel,
): void => {
  server.tool(
    "tag_manager_delete_container",
    "Deletes a container from the specified GTM account",
    {
      accountId: z
        .string()
        .describe("The unique ID of the GTM Account containing the container."),
      containerId: z
        .string()
        .describe("The unique ID of the GTM Container to delete."),
    },
    async ({ accountId, containerId }): Promise<CallToolResult> => {
      log(
        `Running tool: tag_manager_delete_container for account ${accountId}, container ${containerId}`,
      );

      try {
        const tagmanager = await getTagManagerClient(props.accessToken);
        await tagmanager.accounts.containers.delete({
          path: `accounts/${accountId}/containers/${containerId}`,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  message: `Container ${containerId} was successfully deleted`,
                },
                null,
                2,
              ),
            },
          ],
        };
      } catch (error) {
        return createErrorResponse(
          `Error deleting container ${containerId} from account ${accountId}`,
          error,
        );
      }
    },
  );
};
