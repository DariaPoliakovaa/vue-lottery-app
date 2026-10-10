<script setup lang="ts">
</script>

<template>
  <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Vue Lottery App</h1>
    
    <p class="text-gray-600 mb-6 leading-relaxed">
      Цей SPA-застосунок розроблено в рамках лабораторних робіт. Головна мета — вивчення сучасної екосистеми Vue.js, 
      реалізація маршрутизації (Vue Router), налаштування JWT-авторизації та використання патерну Repository для ізольованої взаємодії з REST API (DummyJSON).
    </p>

    <h2 class="text-xl font-bold text-gray-800 mb-4">Використані технології</h2>
    <ul class="list-disc list-inside text-gray-600 space-y-2 mb-8">
      <li><strong>Core:</strong> Vue 3 (Composition API, SFC)</li>
      <li><strong>Language:</strong> TypeScript</li>
      <li><strong>Routing:</strong> Vue Router</li>
      <li><strong>Styling:</strong> Tailwind CSS & SCSS</li>
      <li><strong>Code Quality:</strong> ESLint</li>
      <li><strong>Architecture:</strong> Repository Pattern</li>
    </ul>

    <a 
      href="https://github.com/DariaPoliakovaa/vue-lottery-app" 
      target="_blank" 
      class="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-hover transition-colors"
    >
      Переглянути код на GitHub &rarr;
    </a>
  </div>
</template>
