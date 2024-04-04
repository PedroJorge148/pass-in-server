import fastify from 'fastify'

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "./lib/prisma"
import { generateSlug } from "./utils/generate-slug"
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { getEventById } from "./routes/get-event-by-id";
import { getEvents } from "./routes/get-events";
import { errorHandler } from "./error-handler";
import fastifyCors from "@fastify/cors";

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in construída durante o NLW Unite da Rocketseat',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs' 
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEventById)
app.register(getEvents)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('🔥 HTTP Server Running! http://localhost:3333/docs')
})