/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  //const response = `worker response to ${data}`;
  console.log('Web Worker received:', data);
  const result = fibonacci(data);
  postMessage(result);
});

function fibonacci(n: number): number {
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}