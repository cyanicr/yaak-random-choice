import type { CallTemplateFunctionArgs, Context } from "@yaakapp/api";
import { describe, expect, test } from "vitest";
import { plugin } from "./index";

const fn = plugin.templateFunctions?.find((f) => f.name === "random.choice");

/** Invoke `random.choice` the way Yaak would, with a stubbed context. */
async function render(values: unknown): Promise<string | null> {
  if (fn == null) throw new Error("random.choice template function not found");
  const args = { purpose: "preview", values: { values } } as CallTemplateFunctionArgs;
  return fn.onRender({} as Context, args);
}

describe("plugin definition", () => {
  test("exports a plugin object", () => {
    expect(plugin).toBeTypeOf("object");
  });

  test("registers random.choice with a single text arg", () => {
    expect(fn).toBeDefined();
    expect(fn?.args).toHaveLength(1);
    expect(fn?.args?.[0]).toMatchObject({ type: "text", name: "values" });
  });
});

describe("random.choice", () => {
  test("returns the only value when the list has one entry", async () => {
    await expect(render("solo")).resolves.toBe("solo");
  });

  test("always returns one of the provided values", async () => {
    const results = await Promise.all(
      Array.from({ length: 100 }, () => render("a,b,c")),
    );
    expect(new Set(results).size).toBeGreaterThan(0);
    for (const result of results) {
      expect(["a", "b", "c"]).toContain(result);
    }
  });

  test("trims whitespace around values", async () => {
    await expect(render("  padded  ")).resolves.toBe("padded");
  });

  test("ignores empty entries", async () => {
    const results = await Promise.all(
      Array.from({ length: 50 }, () => render("a,,  ,b,")),
    );
    for (const result of results) {
      expect(["a", "b"]).toContain(result);
    }
  });

  test("returns null for an empty or whitespace-only list", async () => {
    await expect(render("")).resolves.toBeNull();
    await expect(render("   ")).resolves.toBeNull();
    await expect(render(",,,")).resolves.toBeNull();
  });

  test("returns null when the arg is missing or not a string", async () => {
    await expect(render(undefined)).resolves.toBeNull();
    await expect(render(42)).resolves.toBeNull();
    await expect(render(["a", "b"])).resolves.toBeNull();
  });
});
