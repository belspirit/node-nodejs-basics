import { fileURLToPath } from "node:url";
import path from "node:path";
import { Worker } from "node:worker_threads";

const performCalculations = async () => {
  const n = 8;

  const scriptPath = fileURLToPath(import.meta.url);
  const dir = path.dirname(scriptPath);
  const workerPath = path.join(dir, "worker.js");
  const worker = new Worker(workerPath, { workerData: n });
  worker.on("message", (result) => {
    console.log(`nthFibonacci(${n}) = ${result}`);
  });
  worker.on("error", (err) => {
    throw err;
  });
  worker.on("exit", (exitCode) => {
    if (exitCode !== 0) {
      throw new Error(`Worker stopped with exit code ${code}`);
    }
  });
};

await performCalculations();
