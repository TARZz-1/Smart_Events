export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, 'id')

  try {

    const usuarioEliminado = await prisma.usuario.delete({
      where: {
        email: String(email)
      }
    })

    return { success: true, usuario: usuarioEliminado }
  } catch (error: any) {
    console.error('Error en base de datos:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudo eliminar el usuario',
    })
  }
})