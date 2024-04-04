import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/register-for-event.ts
import z from "zod";
async function registerForEvent(app) {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Register an attendee",
      tags: ["attendees"],
      body: z.object({
        name: z.string().min(4),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const attendeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          eventId,
          email
        }
      }
    });
    if (attendeFromEmail) {
      throw new BadRequest("This email is already registered for this event.");
    }
    const [event, amoutOfAttendesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId
        }
      }),
      prisma.attendee.count({
        where: {
          eventId
        }
      })
    ]);
    if (event?.maximumAttendees && amoutOfAttendesForEvent >= event.maximumAttendees) {
      throw new BadRequest("The maximum number of attendees for this event has been reached.");
    }
    const attende = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    });
    return reply.status(201).send({
      attendeId: attende.id
    });
  });
}

export {
  registerForEvent
};
