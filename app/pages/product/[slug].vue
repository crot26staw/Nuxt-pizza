<script lang="ts" setup>
import type { Product } from '~/shared/types/product';
const route = useRoute()
const { data: products, status, error, refresh, clear } = await useAsyncData<Product[]>(
    () => $fetch<Product[]>('http://localhost:3001/products', {
        params: {
            slug: route.params.slug,
        },
    }), {
}
)
const product = (products.value as Product[])[0];

useSeoMeta({
  title: 'Nuxt-pizza | ' + product?.name,
  description: 'Описание',
  ogTitle: 'Nuxt-pizza | ' + product?.name,
  ogDescription: 'OG: Описание',
});
</script>
<template>
    <div class="AppProductPage">
        <div class="AppProductPage__container">
            <AppProduct :product="product" :size="40" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .AppProductPage{
        padding: 60px 0;

        &__container{
            max-width: 500px;
            margin: 0 auto;
        }
    }
</style>