export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID de evento inválido' })
  }


  const evento = await prisma.evento.findUnique({ where: { id } })
  if (!evento) {
    throw createError({ statusCode: 404, statusMessage: 'Evento no encontrado' })
  }

  const inscritos = await prisma.inscrito.findMany({
    where: { eventoId: id },
    orderBy: { nombre: 'asc' }
  })

  return inscritos
})