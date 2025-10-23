<script lang="ts" setup>
const route = useRoute();
const sort = computed(() => route.query.sort);
const sortString = computed(() => sort.value ? 'По цене' : 'Умолчанию');

const getSortUrl = (sortType: string) => {
  const currentQuery = { ...route.query }
  
  currentQuery.sort = sortType
  
  return {
    path: route.path,
    query: currentQuery
  }
}

let isVisible = ref(false);

function changeVisible() {
    isVisible.value = !isVisible.value;
}

</script>
<template>
    <div class="AppSort">
        <div class="AppSort__titles">
            <p>Сортировка по:</p>
        </div>
        <div class="AppSort__wrapper">
            <p @click="changeVisible()">{{ sortString }}</p>
        </div>
        <ul v-if="isVisible" class="AppSort__lists">
            <li class="AppSort__li">
                <NuxtLink :to="getSortUrl('price')" @click.prevent="changeVisible">По цене</NuxtLink>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.AppSort {
    display: flex;
    align-items: center;
    position: relative;
    gap: 8px;

    &__titles {
        display: flex;
        align-items: center;
        gap: 4px;

        p {
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.01em;
            color: #2c2c2c;
        }
    }

    &__wrapper {
        position: relative;

        p {
            font-weight: 400;
            font-size: 14px;
            letter-spacing: 0.01em;
            color: #000;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
                color: #FE5F1E;
            }
        }
    }

    &__lists {
        position: absolute;
        top: 180%;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 14px;
        box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.09);
        background: #fff;
        border-radius: 10px;

        li {
            a {
                font-weight: 400;
                font-size: 14px;
                letter-spacing: 0.01em;
                color: #000;
                cursor: pointer;
                transition: all 0.3s;

                &:hover {
                    color: #FE5F1E;
                }
            }

        }
    }
}
</style>