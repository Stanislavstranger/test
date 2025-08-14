<script>
  let { data } = $props();
</script>

<h1>Svelte and Strapi Integration</h1>
<div>
  {#each data.articles as article}
    <h2 class="text-3xl font-bold text-center text-blue-800">
      {article.title.toUpperCase()}
    </h2>
    <p>{article.description}</p>
  {/each}
</div>
