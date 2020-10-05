import {
  ConfigurationTarget,
  ExtensionContext,
  window,
  workspace
} from "vscode";
import {
  CFNGIN_FILE_GLOBAL_PATTERN,
  CFNGIN_SCHEMA_FILE,
  RUNWAY_FILE_GLOBAL_PATTERN,
  RUNWAY_SCHEMA_FILE,
  YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION
} from "./yaml-support/yaml-constant";
import {
  addSchemaToConfigAtScope,
  registerYamlSchemaSupport,
  removeSchemaFromConfigAtScope
} from "./yaml-support/yaml-schema";

export const output = window.createOutputChannel("Runway");
export let extensionPath: string;

/**
 * Add YAML schema to vscode config.
 *
 */
async function addSchemasToConfig() {
  await addSchemaToConfigAtScope(
    CFNGIN_SCHEMA_FILE,
    CFNGIN_FILE_GLOBAL_PATTERN,
    ConfigurationTarget.Global,
    workspace.getConfiguration()
      .inspect(YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION)
      .globalValue
  );
  await addSchemaToConfigAtScope(
    RUNWAY_SCHEMA_FILE,
    RUNWAY_FILE_GLOBAL_PATTERN,
    ConfigurationTarget.Global,
    workspace.getConfiguration()
      .inspect(YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION)
      .globalValue
  );
}

async function removeSchemaFromConfig() {
  await removeSchemaFromConfigAtScope(
    CFNGIN_SCHEMA_FILE,
    ConfigurationTarget.Global,
    workspace.getConfiguration()
      .inspect(YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION)
      .globalValue
  )
  await removeSchemaFromConfigAtScope(
    RUNWAY_SCHEMA_FILE,
    ConfigurationTarget.Global,
    workspace.getConfiguration()
      .inspect(YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION)
      .globalValue
  )
}

/**
 * Called when the extension is activated.
 *
 * @export
 * @param {ExtensionContext} context
 */
export async function activate(context: ExtensionContext) {
  extensionPath = context.extensionPath;
  await addSchemasToConfig();
  await registerYamlSchemaSupport();
}

/**
 * Called when the extension is deactivated.
 *
 * @export
 */
export async function deactivate() {
  await removeSchemaFromConfig();
  return undefined;
}
