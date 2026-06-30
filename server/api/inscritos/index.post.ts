export default defineEventHandler(async (event) => {
  try {

    const body = await readBody(event)
    const { nombre, apellido, email, eventoId } = body


    if (!nombre || !apellido || !email || !eventoId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Faltan datos obligatorios'
      })
    }


    const evento = await prisma.evento.findUnique({ where: { id: Number(eventoId) } })
    if (!evento) {
      throw createError({ statusCode: 404, statusMessage: 'Evento no encontrado' })
    }
    const yaInscrito = await prisma.inscrito.findFirst({ where: { email, eventoId: Number(eventoId) } })
    if (yaInscrito) {
      throw createError({ statusCode: 409, statusMessage: 'Ya estás inscrito en este evento' })
    }


    const nuevoInscrito = await prisma.inscrito.create({
      data: {
        nombre,
        apellido,
        email,
        evento: { connect: { id: Number(eventoId) } }
      }
    })

    return { success: true, inscrito: nuevoInscrito }
  } catch (error: any) {
    console.error('Error en base de datos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudo crear la inscripción',
    })
  }
})