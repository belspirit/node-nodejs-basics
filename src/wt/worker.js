import { parentPort, workerData } from "node:worker_threads";

const n = parseInt(workerData);

if (Number.isNaN(n)) throw new Error("n should be an integer number");

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // This function sends result of nthFibonacci computations to main thread
  parentPort.postMessage(nthFibonacci(n));
};

sendResult();
