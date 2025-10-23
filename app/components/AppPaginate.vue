<script lang="ts" setup>
const route = useRoute();

const getSortUrl = (sortType: string) => {
    const currentQuery = { ...route.query }

    currentQuery.page = sortType

    return {
        path: route.path,
        query: currentQuery
    }
}

const props = defineProps(['data', 'page']);
const currentPage = computed(() => Number(props.page));

</script>
<template>
    <div class="AppPaginate">
        <ul class="AppPaginate__nums">
            <li v-for="num in data.pages" class="AppPaginate__num">
                <div v-if="num === currentPage" class="AppPaginate__no-link">{{ num }}</div>
                <NuxtLink v-else :to="getSortUrl(num)" class="AppPaginate__link">{{ num }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.AppPaginate {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 8px;

    &__nums {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    &__link {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FE5F1E;
        border-radius: 50%;
        color: #FE5F1E;
        transition: all 0.3s;

        &:hover {
            color: white;
            background: #FE5F1E;
        }
    }

    &__no-link {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #FE5F1E;
        border-radius: 50%;
        color: white;
        background: #FE5F1E;
    }
}
</style>