<script lang="ts" setup>

const props = defineProps(['product','count']);

import { useCartStore } from '#imports';
const cart = useCartStore();

</script>
<template>
    <div class="AppCartItem__btns">
        <div class="AppCartItem__btn AppCartItem__minus" @click="cart.removeToCart(product.id, product.price, 1, product.params.weight, product.params.size)">
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.04019 0.0399933H8.84019C9.37035 0.0399933 9.80019 0.469833 9.80019 0.999993C9.80019 1.53015 9.37035 1.95999 8.84019 1.95999H4.04019H1.1602C0.630035 1.95999 0.200195 1.53015 0.200195 0.999993C0.200195 0.469833 0.630035 0.0399933 1.1602 0.0399933H4.04019Z"
                    fill="#FE5F1E" />
            </svg>
        </div>
        <p class="AppCartItem__count">{{ count }}</p>
        <div class="AppCartItem__btn AppCartItem__plus"
            @click="cart.addToCart(product.id, product.name, product.slug, product.img, product.params.weight, product.params.size, product.price, 1)">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.84019 4.04001H5.96019V1.16001C5.96019 0.629852 5.53035 0.200012 5.00019 0.200012C4.47003 0.200012 4.04019 0.629852 4.04019 1.16001V4.04001H1.1602C0.630035 4.04001 0.200195 4.46985 0.200195 5.00001C0.200195 5.53017 0.630035 5.96001 1.1602 5.96001H4.04019V8.84001C4.04019 9.37017 4.47003 9.80001 5.00019 9.80001C5.53035 9.80001 5.96019 9.37017 5.96019 8.84001V5.96001H8.84019C9.37035 5.96001 9.80019 5.53017 9.80019 5.00001C9.80019 4.46985 9.37035 4.04001 8.84019 4.04001Z"
                    fill="#EB5A1E" />
            </svg>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.AppCartItem {
    &__btns {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__btn {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 2px solid #FE5F1E;
        border-radius: 50%;
        transition: all 0.3s;

        &:active{
            transform: scale(0.9);
        }
    }

    &__count,
    &__price {
        font-weight: 700;
        font-size: 22px;
        letter-spacing: 0.01em;
        color: #000;
    }

    &__count {
        min-width: 27px;
        text-align: center;
    }

}
</style>