import {
  registerForEvent
} from "./chunk-6UPUHHQR.mjs";
import {
  errorHandler
} from "./chunk-BCDQ3X4A.mjs";
import {
  checkIn
} from "./chunk-B52WK6OL.mjs";
import {
  createEvent
} from "./chunk-6FB3PMUT.mjs";
import "./chunk-KDMJHR3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-3ZFPKZDK.mjs";
import {
  getEventAttendees
} from "./chunk-W5R7PQIS.mjs";
import {
  getEventById
} from "./chunk-73GPCBRI.mjs";
import "./chunk-JRO4E4TH.mjs";
import {
  getEvents
} from "./chunk-P6WMWDEE.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in constru\xEDda durante o NLW Unite da Rocketseat",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEventById);
app.register(getEvents);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({
  host: "0.0.0.0",
  port: 3333
}).then(() => {
  console.log("\u{1F525} HTTP Server Running! http://localhost:3333/docs");
});
