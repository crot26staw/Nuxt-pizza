<script lang="ts" setup>
import type { PaginatedProducts } from '~/shared/types/product';

const route = useRoute();
const category = computed(() => route.query.category);
const sort = computed(() => route.query.sort);
const page = computed(() => route.query.page || '1');

const { data, status, error, refresh, clear } = await useAsyncData<PaginatedProducts>(
    `products`,
    () => $fetch<PaginatedProducts>('http://localhost:3001/products', {
        params: {
            cat_slug: category.value,
            _sort: sort.value,
            _page: page.value,
            _per_page: '8',
        },
    }), {
    watch: [category, sort, page]
}
)

const transitionKey = computed(() => `${category.value}-${sort.value}-${page.value}`);

</script>
<template>
    <Transition name="products" mode="out-in">
        <div :key="transitionKey">
            <div class="AppProducts">
                <AppProduct v-for="product in data?.data" :key="product.id" :product="product" :size="20" />
            </div>
            <AppPaginate v-if="data?.pages && data.pages > 1" :data="{ ...data }" :page="page" />
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.AppProducts {
    margin-top: 60px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
}

.products-enter-active,
.products-leave-active {
    transition: all 0.3s ease;
}

.products-enter-from {
    opacity: 0;
}

.products-leave-to {
    opacity: 0;
}
</style>