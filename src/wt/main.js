import { fileURLToPath } from "node:url";
import path from "node:path";
import { Worker } from "node:worker_threads";
import os from "node:os";

const performCalculations = async () => {
  let n = 10;

  const scriptPath = fileURLToPath(import.meta.url);
  const dir = path.dirname(scriptPath);
  const workerPath = path.join(dir, "worker.js");
  const results = await Promise.all(
    os.cpus().map(
      () =>
        new Promise((resolve, reject) => {
          const worker = new Worker(workerPath, { workerData: n++ });
          worker.on("message", (result) => {
            resolve({ data: result, status: "resolved" });
          });
          worker.on("error", (err) => {
            resolve({ data: null, status: "error" });
          });
          worker.on("exit", (exitCode) => {
            if (exitCode !== 0) {
              resolve({ data: null, status: "error" });
            }
          });
        })
    )
  );
  console.log(results);
};

await performCalculations();
