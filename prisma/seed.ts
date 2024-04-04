import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.checkIn.deleteMany()
  await prisma.attendee.deleteMany()
  await prisma.event.deleteMany()

  await prisma.event.create({
    data: {
      id: '5aa4f416-ef41-49df-98b3-c10859790e6c',
      title: 'Unite summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120
    }
  })
}

seed().then(() => {
  prisma.$disconnect()
})