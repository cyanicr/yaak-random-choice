import type { PluginDefinition } from "@yaakapp/api";

export const plugin: PluginDefinition = {
  templateFunctions: [
    {
      name: "random.choice",
      description: "Pick a random value from a comma-separated list",

      args: [
        {
          type: "text",
          name: "values",
          label: "Values",
          placeholder: "red, green, blue",
          description:
            "Comma-separated options. Surrounding whitespace is trimmed and empty entries are ignored.",
        },
      ],

      async onRender(_ctx, args): Promise<string | null> {
        const input = args.values.values;

        if (typeof input !== "string") return null;

        const values = input
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v !== "");

        return values[Math.floor(Math.random() * values.length)] ?? null;
      },
    },
  ],
};
