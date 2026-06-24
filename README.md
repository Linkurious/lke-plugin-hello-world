# lke-plugin-hello-world

A boilerplate plugin to help you start developing plugins for
[Linkurious Enterprise](https://linkurious.com/).

It demonstrates the essential building blocks of a plugin:

- a **frontend** single-page application served by Linkurious Enterprise;
- a **backend** Express router that exposes a custom API;
- a call to the Linkurious Enterprise REST API using the `@linkurious/rest-client`;
- a **plugin action** declared through the plugin metadata.

When opened, the plugin displays a *Hello world* page that calls its own backend
API, which in turn queries the status of the Linkurious Enterprise server.

## Project structure

This plugin is a monorepo using [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces):

```
hello-world/
├── manifest.json              # Plugin manifest (name, version, entry points, i18n…)
├── package.json               # Root workspace + build/pack scripts
└── packages/
    ├── backend/               # Backend Express router (TypeScript)
    │   └── src/routeHandler.ts
    └── frontend/              # Frontend single-page application (TypeScript)
        ├── index.html
        ├── assets/
        └── src/index.ts
```

### The manifest

[`manifest.json`](manifest.json) declares how Linkurious Enterprise should load the plugin:

| Field                | Value                                   | Description                                          |
|:---------------------|:----------------------------------------|:-----------------------------------------------------|
| `name`               | `hello-world`                           | Internal plugin name (used in its URL).              |
| `version`            | `1.0.0`                                 | Plugin version.                                      |
| `pluginApiVersion`   | `1.0.0`                                 | Version of the plugin API the plugin targets.        |
| `publicRoute`        | `packages/frontend`                     | Folder containing the frontend files.                |
| `singlePageAppIndex` | `index.html`                            | Entry point for the single-page application.         |
| `backendFiles`       | `packages/backend/dist/routeHandler.js` | Compiled backend file(s) registering the API routes. |

### The backend

[`packages/backend/src/routeHandler.ts`](packages/backend/src/routeHandler.ts) registers
a `GET /hello` endpoint that uses the injected REST client to fetch the Linkurious
Enterprise status and returns it as JSON. It also registers a plugin action through
`options.parentProcess.postMetadata()`.

### The frontend

[`packages/frontend/src/index.ts`](packages/frontend/src/index.ts) fetches the backend
`api/hello` endpoint and appends the result to the page. The HTML entry point is
[`packages/frontend/index.html`](packages/frontend/index.html).

## Requirements

- [Node.js](https://nodejs.org/) (see [`.nvmrc`](.nvmrc) for the recommended version)
- A running instance of Linkurious Enterprise to deploy and test the plugin

## Building

Install the dependencies and build all workspaces:

```bash
npm ci
npm run build
```

The `build` script compiles both the backend and frontend TypeScript sources. The
`postbuild` step then packages the plugin into a distributable `.lke` archive
(`lke-plugin-hello-world-1.0.0.lke`).

To clean all build outputs and installed dependencies:

```bash
npm run clean
```

## Installing the plugin

Copy the generated `.lke` file into the `data/plugins/` directory of your Linkurious
Enterprise installation, and then restart Linkurious Enterprise.

Or you can directly upload the `.lke` file in the `Admin -> Plugins manager` page of
Linkurious Enterprise. 

Find more details in the [Plugins documentation](https://doc.linkurio.us/admin-manual/latest/plugins).

## Going further

For a complete reference on plugin development (manifest options, backend APIs,
REST client usage, debugging…), refer to the
[Plugins developer documentation](https://docs.google.com/document/d/1rzs2mn757MGlLVYt7xfCkCwcIpwJ_57uvWK5pDSgEV4).
