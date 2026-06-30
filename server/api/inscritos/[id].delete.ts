export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  try {

    const inscrito = await prisma.inscrito.findUnique({ where: { id } })
    if (!inscrito) {
      throw createError({ statusCode: 404, statusMessage: 'Inscripción no encontrada' })
    }

    const inscritoEliminado = await prisma.inscrito.delete({ where: { id } })

    return { success: true, inscrito: inscritoEliminado }
  } catch (error: any) {
    console.error('Error en base de datos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudo eliminar la inscripción',
    })
  }
})
