import { accountActions } from "./accountActions";
import { builtInVariableActions } from "./builtInVariableActions";
import { clientActions } from "./clientActions";
import { containerActions } from "./containerActions";
import { destinationActions } from "./destinationActions";
import { environmentActions } from "./environmentActions";
import { folderActions } from "./folderActions";
import { gtagConfigActions } from "./gtagConfigActions";
import { removeMCPServerData } from "./removeMCPServerData";
import { tagActions } from "./tagActions";
import { templateActions } from "./templateActions";
import { transformationActions } from "./transformationActions";
import { triggerActions } from "./triggerActions";
import { userPermissionActions } from "./userPermissionActions";
import { variableActions } from "./variableActions";
import { versionHeaderActions } from "./versionHeaderActions";
import { versionActions } from "./versionActions";
import { workspaceActions } from "./workspaceActions";
import { zoneActions } from "./zoneActions";

export const tools = [
  accountActions,
  builtInVariableActions,
  clientActions,
  containerActions,
  destinationActions,
  environmentActions,
  folderActions,
  gtagConfigActions,
  tagActions,
  templateActions,
  transformationActions,
  triggerActions,
  userPermissionActions,
  variableActions,
  versionHeaderActions,
  versionActions,
  workspaceActions,
  zoneActions,
  removeMCPServerData,
];
