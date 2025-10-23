<script lang="ts" setup>
import type { Category } from '~/shared/types/product';
const route = useRoute();
const slug = computed(() => route.query.category);

const getSortUrl = (sortType: string) => {
    const currentQuery = { ...route.query }

    currentQuery.category = sortType

    return {
        path: route.path,
        query: currentQuery
    }
}

const { data: categories, status, error, refresh, clear } = await useAsyncData<Category[]>(
    'categories',
    () => $fetch('http://localhost:3001/categories'),
)


</script>
<template>
    <div class="AppCategories">
        <ul class="AppCategories__lists">
            <li>
                <NuxtLink to="/" class="AppCategories__item" :class="{ active: !slug }">Все</NuxtLink>
            </li>
            <li v-for="cat in categories" :key="cat.id">
                <NuxtLink :to="getSortUrl(cat.slug)" class="AppCategories__item" :class="{ active: cat.slug === slug }">
                    {{ cat.name }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.AppCategories {

    &__lists {
        display: flex;
        gap: 8px;
    }

    &__item {
        display: block;
        padding: 14px 24px;
        background: #f9f9f9;
        border-radius: 100px;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.01em;
        text-align: center;
        color: #2c2c2c;
        transition: all 0.3s;

        &:hover {
            background: black;
            color: #f9f9f9;
        }

        &.active {
            background: black;
            color: #f9f9f9;
        }
    }
}
</style>