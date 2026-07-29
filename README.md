# Yaak Random Choice

A [Yaak](https://yaak.app) plugin that adds template functions for picking a random value from a list of values.

## Template functions

### `random.choice`

Picks one value at random from a comma-separated list.

| Argument | Type | Required | Description                                                                           |
| -------- | ---- | -------- | ------------------------------------------------------------------------------------- |
| `values` | text | yes      | Comma-separated options. Whitespace around each entry is trimmed; empty ones ignored.  |

```
${[ random.choice(values='red,green,blue') ]}
```

Renders `red`, `green`, or `blue`, re-rolled every time the request is sent.

Example JSON body:

```json
{
  "tier": "${[ random.choice(values='free,pro,enterprise') ]}",
  "locale": "${[ random.choice(values='en-US, de-DE, ja-JP') ]}"
}
```

Returns an empty value when the list is empty or contains only blanks.

## Install

**From the Yaak plugin registry** — search for "Random Choice" under
Settings → Plugins in the Yaak app, or:

```sh
yaak plugin install @cyanic/yaak-random-choice
```

**From source:**

```sh
git clone https://github.com/cyanicr/yaak-random-choice.git
cd yaak-random-choice
npm install
npm run build
yaak plugin install .
```

## Development

Requires Node.js 20+ and the [Yaak CLI](https://yaak.app) on your `PATH`.

```sh
npm install
npm run dev        # rebuild the bundle on every file change
npm run check      # typecheck + tests
```

| Script               | What it does                          |
| -------------------- | ------------------------------------- |
| `npm run build`      | Build the plugin bundle into `build/` |
| `npm run dev`        | Rebuild continuously while you edit   |
| `npm test`           | Run the Vitest suite once             |
| `npm run test:watch` | Run tests in watch mode               |
| `npm run typecheck`  | `tsc --noEmit`                        |
| `npm run check`      | Typecheck, then tests — what CI runs  |

The plugin definition lives in [`src/index.ts`](src/index.ts). Each entry in
`templateFunctions` becomes a template tag in the Yaak UI; `onRender` receives the
user-supplied argument values and returns the rendered string (or `null` for no value).

`build/` is generated output and is not committed — run `npm run build` after cloning.

## Releasing

1. Bump `version` in `package.json` and note the change in [CHANGELOG.md](CHANGELOG.md).
2. `npm run check && npm run build`
3. `yaak plugin publish`
4. Tag and push: `git tag v0.1.0 && git push --tags`

## Contributing

Issues and pull requests are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
Please make sure `npm run check` passes before opening a PR.

## License

[MIT](LICENSE) © cyanicr
