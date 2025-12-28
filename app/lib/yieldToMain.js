// Utility to yield to main thread and break up long tasks
// This helps reduce Total Blocking Time (TBT)

export function yieldToMain() {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && "scheduler" in window && "postTask" in window.scheduler) {
      // Use Scheduler.postTask if available (Chrome 94+)
      window.scheduler.postTask(() => resolve(), { priority: "background" });
    } else if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      // Fallback to requestIdleCallback
      requestIdleCallback(() => resolve(), { timeout: 0 });
    } else {
      // Fallback to setTimeout
      setTimeout(() => resolve(), 0);
    }
  });
}

// Process array in chunks to avoid blocking main thread
export async function processInChunks(array, processor, chunkSize = 10) {
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    results.push(...chunk.map(processor));
    // Yield to main thread after each chunk
    if (i + chunkSize < array.length) {
      await yieldToMain();
    }
  }
  return results;
}

