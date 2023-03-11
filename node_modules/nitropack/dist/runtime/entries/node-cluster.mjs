import os from "node:os";
import cluster from "node:cluster";
if (cluster.isPrimary) {
  const numberOfWorkers = Number.parseInt(process.env.NITRO_CLUSTER_WORKERS) || (os.cpus().length > 0 ? os.cpus().length : 1);
  for (let i = 0; i < numberOfWorkers; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  import("./node-server").catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
