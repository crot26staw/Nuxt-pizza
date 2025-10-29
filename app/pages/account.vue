<script lang="ts" setup>
import AppBtn from '~/components/ui/AppBtn.vue';
import type { Order } from '~/shared/types/product';
definePageMeta({
    middleware: 'auth'
})

const logoutAuth = () => {
    const auth = useCookie('auth', { path: '/' })
    auth.value = null
    navigateTo('/login')
}

const user = useCookie('auth', { decode: decodeURIComponent });
const userData = JSON.parse(user.value);

const { data, status, error, refresh, clear } = useAsyncData<Order[]>(`orders`, () => $fetch<Order[]>('http://localhost:3001/orders', {
    params: {
        email: userData.email
    }
}))


</script>
<template>
    <div class="account">
        <div class="container">
            <div class="account__head">
                <h1>{{ userData.name }}</h1>
                <AppBtn class="account__btn" :value="'Выйти из аккаунта'" @click="logoutAuth" />
            </div>
            <div class="account__body">
                <p class="account__subtitle">Мои заказы</p>
                <ul class="account__orders">
                    <li v-for="item in data" class="account__orders-item">
                        <p class="account__orders-string">Заказ № - {{ item.id }}</p>
                        <ul class="account__cart-items">
                            <li v-for="(product, index) in item.cartData.products" class="account__orders-string">{{ product.name
                                }}{{ index < item.cartData.products.length - 1 ? ',' : '' }}</li>
                        </ul>
                        <p class="account__orders-string">Кол-во: {{ item.cartData.totalCount }}шт.</p>
                        <p class="account__orders-string">Сумма: {{ item.cartData.total }} руб.</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.account {
    padding: 40px 0;

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__btn {
        max-width: 300px;
    }

    &__body {
        margin-top: 40px;
    }

    &__subtitle {
        font-size: 32px;
    }

    &__orders {
        margin-top: 32px;
        display: flex;
        flex-direction: column;
    }

    &__orders-string {
        font-size: 22px;
        font-weight: 600;
    }

    &__orders-item {
        padding: 20px 0;
        border-top: 1px solid #eb5a1e;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 12px;
        grid-row-gap: 0px;

        &:last-child{
            border-bottom: 1px solid #eb5a1e;
        }
    }

    &__cart-items{
        grid-area: 1 / 2 / 2 / 4;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }
}
</style>