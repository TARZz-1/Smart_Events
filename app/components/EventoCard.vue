<script setup lang="ts">
import type { Evento } from '~/types/eventos'
import { computed } from 'vue';

const emit = defineEmits(['seleccionar'])

const props = defineProps<{
  evento: Evento & { nuevo?: boolean }
}>()


const formatoFecha = computed(() =>
  new Date(props.evento.fecha).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
)


const formatoHora = computed(() =>
  new Date(props.evento.fecha).toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  })
)
</script>

<template>
  <UCard class="flex flex-col h-full bg-zinc-900 border border-zinc-800 shadow-2xl hover:border-yellow-400/50 transition-all duration-300">
    
    <div class="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-zinc-800">
      <img :src="evento.imagen || '/default-event.jpg'" alt="Imagen evento"
           class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
    </div>
    
    <div class="flex flex-col grow">
      <h3 class="text-xl font-black text-white uppercase tracking-tight mb-2 line-clamp-2">
        {{ evento.titulo }}
      </h3>
      
      <div class="flex items-center gap-2 text-zinc-400 mb-3 text-sm font-medium">
        <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-yellow-400/70" />
        <span>{{ evento.lugar }}</span>
      </div>

      <div class="flex items-center gap-2 text-zinc-400 mb-2 text-sm font-medium">
        <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-yellow-400/70" />
        <span>{{ formatoFecha }} · {{ formatoHora }}</span>
      </div>
      
      <p class="text-yellow-400 font-bold mb-4 text-xl mt-auto">
        ${{ evento.valor }}
      </p>

      <p class="text-zinc-500 text-xs mb-2">{{ evento.inscritos?.length || 0 }} personas inscritas</p>

      
      <UButton 
        block 
        class="bg-yellow-400 text-zinc-950 font-bold hover:bg-yellow-500 w-full transition-transform hover:-translate-y-0.5 shadow-md"
        color= "warning"
        @click="$emit('seleccionar', evento)"
      >
        Ver detalle
      </UButton>
    </div>

  </UCard>
</template>