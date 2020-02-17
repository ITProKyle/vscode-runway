# vscode-runway

> **IMPORTANT:** This extension is still in early development. It is not full featured. Expect breaking changes between versions.

Visual Studio Code extension for [Runway](https://github.com/onicagroup/runway) that provides schema validation for `runway.yml`/`runway.yaml` files.

![vscode-runway.gif](https://raw.githubusercontent.com/ITProKyle/vscode-runway/master/assets/vscode-runway.gif)

## Features

- `runway.yml`/`runway.yaml` validation and autocompletion
  - `deployments` definition
  - `tests` definition
  - `variables` definition
- description on hover for key and values
  - some include links to documentation

## Usage

1. Install the extension.
2. Create or open a `runway.yml`/`runway.yaml` file.
3. Start typing or hover over existing keys.

## How It Works

This extension modifies the [User Settings](https://code.visualstudio.com/docs/getstarted/settings) of Visual Studio Code to append a schema to the `yaml.schemas` configuration property of the [redhat.vscode-yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension. The YAML extension consumes the schema provided here to produce autocompletion and information on keys and values upon hover.

## Requirements

- [redhat.vscode-yaml](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) extension

## Known Issues

- advanced `modules` definition does not have validation or hover text
- schema error when supplying `regions` and `parallel_regions` is unclear

## Release Notes

All release notes can be viewed in the [releases](https://github.com/ITProKyle/vscode-runway/releases) section of the repo.
