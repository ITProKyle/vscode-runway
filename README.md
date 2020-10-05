# vscode-runway

> **IMPORTANT:** This extension is still in early development. It is not full featured. Expect breaking changes between versions.

Visual Studio Code extension for [Runway](https://github.com/onicagroup/runway) that provides schema validation for `runway.yml`/`runway.yaml` files and configuration files for Runway's CFNgin.

![vscode-runway.gif](https://raw.githubusercontent.com/ITProKyle/vscode-runway/master/assets/vscode-runway.gif)

## Features

- `runway.yml`/`runway.yaml` validation and autocompletion
- CFNgin configuration file validation and autocompletion
  - automatically applies to `**/*.cfn/*.yaml` & `**/*.cfn/*.yml` files
- description on hover for key and values

## Usage

1. Install the extension.
2. Create or open a `runway.yml`/`runway.yaml` file.
3. Start typing or hover over existing keys.

### CFNgin Configuration Files

This extension will automatically identify YAML files in a CFNgin module directory (suffix of `.cfn`) as CFNgin configuration files.
If using a directory without the suffix, an entry can be manually added to [workspace settings](https://code.visualstudio.com/docs/getstarted/settings).

Below is an example of the entry that is added to [user settings](https://code.visualstudio.com/docs/getstarted/settings).
Update the glob patters to match the desired CFNgin configuration files (vscode will need to be reloaded after making changes).

> **NOTE:** The extension version is contained within this path.
> When manually adding to workspace settings, the version will need to be maintained manually.

```json
{
    "yaml.schemas": {
        "file:///Users/kyle/.vscode/extensions/itprokyle.vscode-runway-0.0.0/schemas/cfngin.schema.json": [
            "**/*.cfn/*.yaml",
            "**/*.cfn/*.yml"
        ]
    }
}
```

## How It Works

This extension modifies the [user settings](https://code.visualstudio.com/docs/getstarted/settings) of Visual Studio Code to append a schema to the `yaml.schemas` configuration property of the [redhat.vscode-yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension.
The YAML extension consumes the schema provided here to produce autocompletion and information on keys and values upon hover.

## Requirements

- [redhat.vscode-yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension

## Release Notes

All release notes can be viewed in the [releases](https://github.com/ITProKyle/vscode-runway/releases) section of the repo.
