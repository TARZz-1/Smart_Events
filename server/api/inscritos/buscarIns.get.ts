export default defineEventHandler(async (event) =>{
    const query = getQuery(event)
    const email = typeof query.email === 'string' ? query.email.trim() : ''
    
    if (!email){
        throw createError ({ statusCode: 400, statusMessage: 'Debe ingresar un correo'})
    }


    return await prisma.inscrito.findMany({
    where: { email }, 
    include: { evento: true },
        orderBy: [
            {nombre: 'asc'},
            {apellido: 'asc'}
        ]

    })
})