#!/usr/bin/env python
"""CLI for maintaining the vscode-runway project."""
import json
import subprocess
from pathlib import Path
from typing import Any

import click
from semver import VersionInfo
from runway.config.models.cfngin import CfnginConfigDefinitionModel
from runway.config.models.runway import RunwayConfigDefinitionModel

PACKAGE_JSON = Path("package.json")
PYPROJECT = Path("pyproject.toml")
SCHEMAS_DIR = Path("./schemas")
CFNGIN_SCHEMA = SCHEMAS_DIR / "cfngin.schema.json"
RUNWAY_SCHEMA = SCHEMAS_DIR / "runway.schema.json"


def get_version() -> VersionInfo:
    """Get the version of this project."""
    package_json = json.loads(PACKAGE_JSON.read_text() or {})
    return VersionInfo.parse(package_json.get("version", "0.0.0"))


@click.group(
    context_settings={"help_option_names": ["-h", "--help"], "max_content_width": 999}
)
@click.version_option(get_version(), message="%(version)s")
def cli() -> None:
    """CLI for maintaining the vscode-runway project."""


@cli.command("build-schema")
@click.option("--cfngin", help="only build the CFNgin schema", is_flag=True)
@click.option("--runway", help="only build the Runway schema", is_flag=True)
def build_schema(cfngin: bool, runway: bool) -> None:
    """Build vscode-runway schemas.

    By default, both schemas are built.

    """
    if not runway:
        click.secho("building CFNgin schema...", fg="yellow")
        CFNGIN_SCHEMA.write_text(CfnginConfigDefinitionModel.schema_json(indent=4))
        click.secho(f"successfully output CFNgin schema to {CFNGIN_SCHEMA}", fg="green")
    if not cfngin:
        click.secho("building Runway schema...", fg="yellow")
        RUNWAY_SCHEMA.write_text(RunwayConfigDefinitionModel.schema_json(indent=4))
        click.secho(f"successfully output Runway schema to {CFNGIN_SCHEMA}", fg="green")


@cli.command()
@click.pass_context
def package(ctx: click.Context) -> None:
    """Package this project into a .vsix file.

    The result can be installed by vscode.

    Requirements:
    - vsce (installed from npm)

    """  # noqa: D401
    try:
        subprocess.run(["vsce", "package", "--no-yarn"], check=True)
    except subprocess.CalledProcessError:
        ctx.exit(1)


@cli.command()
@click.pass_context
def publish(ctx: click.Context) -> None:
    """Publish this project to the Visual Studio Code Marketplace.

    Requirements:
    - vsce (installed from npm)
    - login as publisher using vsce

    """
    try:
        ctx.forward(package)
        subprocess.run(
            [
                "vsce",
                "publish",
                "--packagePath",
                str(Path(f"./vscode-runway-{get_version()}.vsix")),
            ],
            check=True,
        )
    except subprocess.CalledProcessError:
        ctx.exit(1)


def main() -> Any:
    """Entrypoint for the CLI."""
    return cli.main(prog_name="vscode-runway")


if __name__ == "__main__":
    main()
