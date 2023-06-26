import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const spawnChildProcess = async (args) => {
  const scriptPath = fileURLToPath(import.meta.url);
  const dir = path.dirname(scriptPath);
  const childPath = path.join(dir, "files", "script.js");
  const cp = spawn("node", [childPath, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
  });
  process.stdin.pipe(cp.stdin);
  cp.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2"]);
