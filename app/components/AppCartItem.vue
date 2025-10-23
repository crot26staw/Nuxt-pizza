<script lang="ts" setup>
const props = defineProps(['product']);

import { useCartStore } from '#imports';
const cart = useCartStore();

</script>
<template>
    <div class="AppCartItem">
        <div class="AppCartItem__left">
            <NuxtLink :to="`/product/${product.slug}`">
                <img :src="product.img" alt="" class="AppCartItem__image"></img>
            </NuxtLink>
            <div class="AppCartItem__titles">
                <p class="AppCartItem__name">{{ product.name }}</p>
                <p class="AppCartItem__params">{{ product.params.weight }}, {{ product.params.size }} см.
                </p>
            </div>
        </div>
        <div class="AppCartItem__right">
            <AppCartBtns :product="product" :count="product.count" />
            <p class="AppCartItem__price">{{ product.price * product.count }} ₽</p>
            <div class="AppCartItem__remove" @click="cart.deleteToCart(product.id)">
                <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.74791 6.95572L6.49931 4.70712L8.74791 2.45852C9.16184 2.04459 9.16184 1.37338 8.74791 0.959454C8.33398 0.545525 7.66277 0.545525 7.24884 0.959454L5.00024 3.20805L2.75164 0.959454C2.33771 0.545525 1.66651 0.545525 1.25258 0.959454C0.838648 1.37338 0.838648 2.04459 1.25258 2.45852L3.50118 4.70712L1.25258 6.95572C0.838649 7.36965 0.838649 8.04086 1.25258 8.45479C1.66651 8.86872 2.33772 8.86872 2.75164 8.45479L5.00024 6.20619L7.24884 8.45479C7.66277 8.86872 8.33398 8.86872 8.74791 8.45479C9.16184 8.04086 9.16184 7.36965 8.74791 6.95572Z"
                        fill="#D0D0D0" />
                </svg>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.AppCartItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-top: 2px solid #f4f4f4;
    -webkit-user-select: none;
    /* Chrome, Safari, Opera */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;

    &__left {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    &__right {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    &__image {
        width: 80px;
    }

    &__titles {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__name {
        font-weight: 700;
        font-size: 22px;
        letter-spacing: 0.01em;
        color: #000;
    }

    &__params {
        font-weight: 400;
        font-size: 18px;
        letter-spacing: 0.01em;
        color: #8d8d8d;
    }

    &__count,
    &__price {
        font-weight: 700;
        font-size: 22px;
        letter-spacing: 0.01em;
        color: #000;
    }

    &__price {
        min-width: 93px;
        text-align: center;
    }

    &__remove {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 2px solid #D7D7D7;
        border-radius: 50%;
    }
}
</style>