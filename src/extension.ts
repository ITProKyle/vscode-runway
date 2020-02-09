import {
  ConfigurationTarget,
  ExtensionContext,
  window,
  workspace
} from "vscode";
import {
  RUNWAY_FILE_GLOBAL_PATTERN,
  RUNWAY_SCHEMA_FILE,
  YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION
} from "./yaml-support/yaml-constant";
import {
  addSchemaToConfigAtScope,
  registerYamlSchemaSupport
} from "./yaml-support/yaml-schema";

export const output = window.createOutputChannel("vscode-runway");
export let extensionPath: string;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  extensionPath = context.extensionPath;
  await addSchemasToConfig();
  await registerYamlSchemaSupport();
}

async function addSchemasToConfig() {
  console.log('vscode-runway: adding schemas');
  const config = workspace
    .getConfiguration()
    .inspect(YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION);
  await addSchemaToConfigAtScope(
    RUNWAY_SCHEMA_FILE,
    RUNWAY_FILE_GLOBAL_PATTERN,
    ConfigurationTarget.Global,
    config.globalValue
  );
}

export function deactivate() {
  // this method is called when your extension is deactivated
}
