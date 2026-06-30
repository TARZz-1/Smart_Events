<template>
  <section class="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 md:p-16 text-center mb-12 shadow-2xl">
    <div class="max-w-4xl mx-auto flex flex-col items-center">

        <h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Bienvenido a  <span class="text-yellow-400"/> Smart Events
        </h2>
        <p class="text-zinc-400 text-lg mb-8 mx-w-2xl">
          Organiza y participa en los mejores eventos de Quilpué.
        </p>
        <UButton to="/eventos" size="xl" class="bg-yellow-400 text-zinc-950 hover:bg-yellow-500 font-bold px-8 transition-all" color= "warning">
          Ver eventos
        </UButton>

    </div>
  </section>
</template>