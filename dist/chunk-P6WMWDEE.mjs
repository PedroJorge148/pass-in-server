import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-events.ts
async function getEvents(app) {
  app.withTypeProvider().get("/events", {
    schema: {
      summary: "Get events",
      tags: ["events"],
      response: {}
    }
  }, async (request, reply) => {
    const events = await prisma.event.findMany();
    return reply.send({
      events
    });
  });
}

export {
  getEvents
};
