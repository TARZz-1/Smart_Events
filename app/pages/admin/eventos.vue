<script setup lang="ts">
import { ofetch } from 'ofetch'
import { reactive, ref , h} from 'vue'
import { z } from 'zod'
import type { TableColumn } from '@nuxt/ui'
import type { Evento } from '~/types/eventos'; 
import type { Inscrito } from '~/types/inscrito';

definePageMeta({
    middleware:['auth', 'staff']
})


const {data: eventos,pending, refresh} = await useFetch<{ success: boolean, eventos: Evento[] }>('/api/eventos', {
  key:'admin-eventos-lista',
  default: () => ({ success: false, eventos: [] })
})

const inscritos = ref<Inscrito[]>([])
async function eliminarEvento(id: number) {
    if (confirm('¿Seguro que quieres eliminar este evento y sus inscripciones?')) {
        try {
        await $fetch(`/api/eventos/${id}`, { method: 'DELETE' })
        await refresh()
        } catch (error) {
        alert('Error al eliminar el evento')
        }
    }
    }


const columnas: TableColumn<Evento>[] = [
{ accessorKey: 'titulo', header: 'Título' },
{ accessorKey: 'lugar', header: 'Lugar' },
{ accessorKey: 'valor', header: 'Valor' },
{ accessorKey: 'fecha', header: 'Fecha' },
{ id: 'acciones', header: 'Acciones', cell: ({ row }) => {
    return h('button', {
         onClick: () => eliminarEvento(row.original.id),
        style: 'background-color: #ef4444; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;'
    }, 'Eliminar')
    }}
]



const formEvento = reactive({
    titulo: '', 
    lugar: '', 
    valor: 0, 
    imagen: null as File | null,
    fecha: '', hora: ''
})
const errorFormulario = ref('')


const eventoSchema = z.object({
  titulo: z.string().min(3, 'Título obligatorio'),
  lugar: z.string().min(4, 'Lugar obligatorio'),
  valor: z.number().min(0, 'Valor obligatorio'),   
  fecha: z.string().min(1, 'Fecha obligatoria'),
  hora: z.string().min(1, 'Hora obligatoria'),
  imagen: z.any().optional()
})
async function agregarEvento() {
    const result = eventoSchema.safeParse(formEvento)
    if (!result.success) {
        errorFormulario.value = result.error.issues[0]?.message || 'Error en el formulario'
        return
    }
    const formData = new FormData()
    formData.append('titulo', result.data.titulo)
    formData.append('lugar', result.data.lugar)
    formData.append('valor', String(result.data.valor))
    formData.append('fecha', result.data.fecha)
    formData.append('hora', result.data.hora)

    if (result.data.imagen) {
        formData.append('imagen', result.data.imagen)
    }

    try {

        await $fetch('/api/eventos', {
            method: 'POST',
            body: formData
        })

        formEvento.titulo = ''
        formEvento.lugar = ''
        formEvento.valor = 0
        formEvento.fecha = ''
        formEvento.hora = ''
        formEvento.imagen = null
        
        await refresh()
        errorFormulario.value = ''
        
    } catch (e: any) {
        errorFormulario.value = 'Error al guardar el evento en la base de datos'
        }
    }

const selectedEventoId = ref<number | undefined>(undefined)

async function verInscritos(eventoId: number | null) {
  if (!eventoId) return
  inscritos.value = await $fetch<Inscrito[]>(`/api/eventos/${eventoId}/inscritos`)
}

async function borrarInscripcion(id:number) {
    await ofetch(`/api/inscritos/${id}`, {
        method: 'DELETE'
    })
    inscritos.value = inscritos.value.filter(i => i.id !== id)
}
</script>
<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        
        <UCard class="bg-zinc-900 ring-1 ring-zinc-800">
            
            <template #header>
                <div class="mb-1">
                    <p class="text-yellow-500 text-xs font-bold uppercase tracking-wider">Administracion</p>
                    <h2 class="text-2xl font-black text-white uppercase tracking-tight">
                        Gestion de <span class="text-yellow-400">Eventos</span>
                    </h2>
                </div>
            </template>
            <UTable 
                :data="eventos?.eventos || []" 
                :columns="columnas"
                :loading="pending" 
                class="text-zinc-300"
            >
                <template #titulo-cell="{ row }">
                    <span class="text-white">{{ row.original.titulo }}</span>
                </template>
                <template #fecha-cell="{ row }">
                    <span class="text-white">
                        {{ row.original.fecha 
                            ? new Date(row.original.fecha).toLocaleDateString() 
                            : 'Sin fecha' 
                        }}
                    </span>
                </template>
            </UTable>       


            <div class="mt-6 pt-6 border-t border-zinc-800">
                <h3 class="text-yellow-500 font-bold uppercase tracking-wide text-sm mb-4">Agregar Nuevo Evento</h3>
                
                <UForm @submit.prevent="agregarEvento" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField label="Título">
                        <UInput v-model="formEvento.titulo" placeholder="Ej: Torneo Surf" :ui="{ base: 'bg-zinc-800 dark:bg-zinc-800 text-white', }" color="warning"/>
                    </UFormField>
                    <UFormField label="Lugar">
                        <UInput v-model="formEvento.lugar" placeholder="Ej: Playa Reñaca" :ui="{ base: 'bg-zinc-800 dark:bg-zinc-800 text-white', }" color="warning"/>
                    </UFormField>
                    <UFormField label="Valor">
                        <UInput v-model.number="formEvento.valor" type="number" placeholder="Ej: 15000" :ui="{ base: 'bg-zinc-800 dark:bg-zinc-800 text-white', }" color="warning"/>
                    </UFormField>
                    <UFormField label="Fecha">
                        <UInput v-model="formEvento.fecha" type="date" :ui="{ base: 'bg-zinc-800 dark:bg-zinc-800 text-white', }" color="warning"/>
                    </UFormField>
                    <UFormField label="Hora">
                        <UInput v-model="formEvento.hora" type="time" :ui="{ base: 'bg-zinc-800 dark:bg-zinc-800 text-white', }" color="warning"/>
                    </UFormField>
                    <UFormField label="Imagen">
                        <UFileUpload v-model="formEvento.imagen" :ui="{ base: 'bg-zinc-800 dark:bg-zinc-800 text-white', }" color="warning"/>
                    </UFormField>
                    
                    <div class="md:col-span-2 flex justify-end mt-2">
                        <UButton 
                            type="submit" 
                            color="warning" 
                            variant="solid" 
                            class="bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase px-6 py-2 rounded transition-colors"
                        >
                            Guardar Evento
                        </UButton>
                    </div>
                </UForm>

                <UAlert v-if="errorFormulario" color="warning" variant="soft" :title="errorFormulario" class="mt-4" />
            </div>
        </UCard>


        <UCard class="bg-zinc-900 ring-1 ring-zinc-800">
            
            <template #header>
                <div class="mb-1">
                    <p class="text-yellow-500 text-xs font-bold uppercase tracking-wider">Participantes</p>
                    <h2 class="text-2xl font-black text-white uppercase tracking-tight">Inscripciones</h2>
                </div>
            </template>

            <div class="space-y-4 mb-6">
                <UFormField label="Seleccionar Evento" >
            <USelect 
                v-model="selectedEventoId" 
                color="warning"
                :items="eventos?.eventos?.map(e => ({ label: e.titulo, value: e.id })) || []"
                placeholder="Selecciona un Evento"
                :ui="{ base: 'bg-yellow-500  text-black hover:bg-yellow-500', content: 'bg-zinc-800 dark:bg-zinc-800 outline: bg-zinc-1000', item: 'bg-zinc-800  text-zinc-100 hover:bg-zinc-900'}"

            />

                </UFormField>
                
                <UButton 
                    v-if="selectedEventoId" 
                    color="warning" 
                    variant="solid" 
                    class="w-full justify-center" 
                    @click="verInscritos(selectedEventoId)"
                    
                >
                    Cargar Inscritos
                </UButton>
            </div>

            <div class="pt-6 border-t border-zinc-800">
                
                <UTable v-if="inscritos.length > 0" :data="inscritos" class="text-zinc-300 mb-4">
                    <template #nombre-cell="{ row }">{{ row.original.nombre }}</template>
                    <template #apellido-cell="{ row }">{{ row.original.apellido }}</template>
                    <template #email-cell="{ row }">{{ row.original.email }}</template>
                </UTable>
                <UAlert 
                    v-else-if="selectedEventoId && inscritos.length === 0" 
                    color="error" 
                    variant="soft" 
                    icon="i-heroicons-information-circle"
                    title="Sin participantes" 
                    description="No hay inscritos para este evento aún."
                />

                <div v-if="inscritos.length > 0" class="mt-4 space-y-2">
                    <h4 class="text-xs font-bold text-zinc-500 uppercase mb-2">Acciones Rapidas</h4>
                    <UButton 
                        v-for="inscrito in inscritos" 
                        :key="inscrito.id" 
                        color="warning" 
                        variant="soft" 
                        icon="i-heroicons-trash"
                        class="w-full justify-start"
                        @click="borrarInscripcion(inscrito.id)"
                    >
                        Borrar a {{ inscrito.nombre }} {{ inscrito.apellido }}
                    </UButton>
                </div>
                
            </div>
        </UCard>

    </div>
</template>