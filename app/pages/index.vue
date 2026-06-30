<script setup lang="ts">
//import EventoCard from '~/components/EventoCard.vue';
//import Destacados from '~/components/Destacados.vue';
import { computed } from 'vue'
import type { Evento } from '~/types/eventos';

const { data: eventosResponse } = await useFetch<{ success: boolean, eventos: Evento[] }>('/api/eventos', {
  default: () => ({ success: false, eventos: [] })
})
const eventos = computed(() => eventosResponse.value?.eventos || [])
</script>
<template>
    <div>
        <Hero/>
        <section class="mt-12">
            <h2 class="text-2xl font-black text-white uppercase tracking-tight mb-6 border-b border-zinc-800 pb-2">
                Eventos <span class="text-yellow-400">Destacados</span>
            </h2>
            <Destacados :eventos="eventos || []"/>
        </section>
    </div>
</template>