import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import { Temporal } from "@js-temporal/polyfill";
import os from "os";

const app = fastify();

app.register(fastifyCors, { origin: "*" });

app.get("/api/v1/details", () => {
  const now = Temporal.Now.instant();

  return {
    message: "Page loaded using temporal.",
    hostname: os.hostname(),
    time: now,
  };
});

app.get("/api/v1/info", async () => {
  const data = await fetch(`${process.env.SERVICE_A_ENDPOINT}/api/v1/details`);

  const now = Temporal.Now.instant();
  return {
    message: "Get your info",
    hostname: os.hostname(),
    time: now,
    dataFromAnotherService: await data.json(),
  };
});

app.get("/healthz", () => {
  return {
    status: "up",
  };
});

const port = process.env.PORT ?? 3030;

app
  .listen({
    host: "0.0.0.0",
    port: Number(port),
  })
  .then(() => {
    console.log(`HTTP Server running on ${port}`);
  });
