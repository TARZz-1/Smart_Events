export default defineEventHandler(async () => {
    return await prisma.usuario.findMany({

        //orden nombre, apellido alfabeticamente
        orderBy: [
            {nombre: 'asc'},
            {apellido: 'asc'}
        ]
    })
})