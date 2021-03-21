import { generate } from "./generate.ts";
import { newBlank } from "./new.ts";
import { openapi } from "./openapi.ts";

export async function runCli() {
  const { args } = Deno;

  const COMMANDS = new Map<string, Function>([
    ["generate", generate],
    ["g", generate],
    ["new", newBlank],
    ["n", newBlank],
    ["openapi", openapi],
  ]);

  const command = args[0];

  if (!COMMANDS.has(command)) {
    throw new Error("Command not found");
  }

  await COMMANDS.get(command)!();
}
