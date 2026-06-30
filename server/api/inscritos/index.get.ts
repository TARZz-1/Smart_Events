export default defineEventHandler(async () =>{
    return await prisma.inscrito.findMany({
   
        include: {
            evento: true
        },


        orderBy: [
            {nombre: 'asc'},
            {apellido: 'asc'}
        ]

    })
})