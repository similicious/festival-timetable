<script lang="ts">
  let { children } = $props();
</script>

<div
  class="prose prose-p:text-zinc-200 prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4 prose-h1:text-pink-500 prose-h2:text-xl prose-h2:font-bold prose-h2:mb-2 prose-h2:m-0 prose-h2:text-pink-300"
>
  {@render children()}
</div>
