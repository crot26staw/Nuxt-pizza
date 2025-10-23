<script setup>
// Хлебные крошки
definePageMeta({
  breadcrumb: {
    ariaLabel: 'Главная',
  },
});

// SEO
useSeoMeta({
  title: 'Nuxt-pizza',
  description: 'Описание',
  ogTitle: 'OG: Заголовок',
  ogDescription: 'OG: Описание',
  twitterTitle: 'Twitter: Заголовок',
  twitterDescription: 'Twitter: Описание',
});

const items = useBreadcrumbItems();
</script>

<template>
  <div class="container">
    <div class="filters">
      <AppCategories />
      <AppSort/>
    </div>
    <AppProducts />
  </div>

</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  height: fit-content;
}
</style>