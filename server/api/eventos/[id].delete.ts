export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID invalido' })
  }

  try {
    const evento = await prisma.evento.findUnique({ where: { id } })
    if (!evento) {
      throw createError({ statusCode: 404, statusMessage: 'Evento no encontrado' })
    }

    await prisma.inscrito.deleteMany({ where: { eventoId: id } })
    const eventoEliminado = await prisma.evento.delete({ where: { id } })

    return { success: true, evento: eventoEliminado }
  } catch (error: any) {
    console.error('Error en base de datos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudo eliminar el evento',
    })
  }
})
