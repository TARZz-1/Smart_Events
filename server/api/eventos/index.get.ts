export default defineEventHandler(async (event) => {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: { fecha: 'asc' },
      include: {
        inscritos: true 
      }
    })
    return { success: true, eventos }
  } catch (error: any) {
    console.error('Error al obtener eventos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudieron obtener los eventos',
    })
  }
})
