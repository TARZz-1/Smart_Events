<script setup lang="ts">
//import Navbar from '~/components/Navbar.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    
    <Navbar />

    <UContainer class="py-8 grow w-full">
      <slot/>
    </UContainer>
    
    <footer class="bg-zinc-900 border-t border-zinc-800 text-zinc-500 text-center py-3">
      <p class="text-sm font-medium tracking-wide">
        &copy; 2026 <span class="font-black uppercase tracking-tighter"><span class="text-yellow-400">Smart</span> <span class="text-white">Events</span></span> - Todos los derechos reservados
      </p>
    </footer>
    
  </div>
</template>


