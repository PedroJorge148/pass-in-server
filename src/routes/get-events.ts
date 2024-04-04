import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getEvents(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events', {
      schema: {
        summary: 'Get events',
        tags: ['events'],
        response: {
          
        }
      }
    }, async (request, reply) => {

      const events = await prisma.event.findMany()

      return reply.send({
        events
      })
    })
}