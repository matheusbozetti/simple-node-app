import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import { Temporal } from "@js-temporal/polyfill";
import os from "os";

const app = fastify();

app.register(fastifyCors, { origin: "*" });

app.get("/api/v1/details", () => {
  const now = Temporal.Now.instant();

  return {
    hostname: os.hostname(),
    time: now,
    message: "Update data",
  };
});

app.get("/api/v1/healthz", () => {
  return {
    status: "up",
  };
});

app
  .listen({
    host: "0.0.0.0",
    port: 3030,
  })
  .then(() => {
    console.log(`HTTP Server running on 3030`);
  });
