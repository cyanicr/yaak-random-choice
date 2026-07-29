# Contributing

Thanks for taking the time to contribute.

## Getting set up

```sh
npm install
npm run check   # typecheck + tests, should pass on a clean checkout
```

You'll also need the [Yaak CLI](https://yaak.app) on your `PATH` to build or run the
plugin inside the app.

To try a change in Yaak locally:

```sh
npm run build
yaak plugin install .
```

`npm run dev` rebuilds the bundle on every file change while you iterate.

## Adding a template function

Add an entry to `templateFunctions` in `src/index.ts`:

- `name` — namespaced, e.g. `random.uuid`. This is what users type in a template tag.
- `description` — one line, shown in the Yaak UI.
- `args` — the form inputs. `onRender` reads them from `args.values[<arg name>]`.
- `onRender` — return the rendered string, or `null` when there is nothing to render.

Argument values arrive as `JsonValue | undefined`, so narrow before use
(`typeof input !== "string"`) rather than casting. Cover the new function in
`src/index.test.ts`, including the empty and missing-argument cases.

## Pull requests

- Keep `npm run check` green.
- One logical change per PR, with a short description of the behavior change.
- Update `README.md` when you add or change a template function, and add a
  `CHANGELOG.md` entry under "Unreleased".

## Reporting bugs

Open an issue at
https://github.com/cyanicr/yaak-random-choice/issues with the Yaak version, your OS,
and the template tag you used.
