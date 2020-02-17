import { join } from "path";
import { Uri } from "vscode";

export const VSCODE_YAML_EXTENSION_ID = "redhat.vscode-yaml";

export const SNIPPETS_ROOT_PATH = join(__dirname, "../../snippets");

export const YAML_SCHEMA_CONFIG_NAME_OF_VSCODE_YAML_EXTENSION = "yaml.schemas";

export const RUNWAY_SCHEMA_FILENAME = "runway.schema.json";

export const RUNWAY_SCHEMA_FILE = Uri.file(
  join(__dirname, `../../schemas/${RUNWAY_SCHEMA_FILENAME}`)
).toString();

export const RUNWAY_FILE_GLOBAL_PATTERN = ["**/runway.yaml", "**/runway.yml"];
