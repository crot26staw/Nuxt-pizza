<script lang="ts" setup>
import type { CartProduct, Params } from '~/shared/types/product';

const props = defineProps(['product', 'size']);

const cart = useCartStore();

const productInTheCart = computed<CartProduct | false>(() =>
    cart.checkToCart(props.product.id, defaultParams.value.weight, defaultParams.value.size)
);

const defaultParams = ref<Params>({
    weight: props.product.defaultParams.weight,
    size: props.product.defaultParams.size
})


const changeWeigth = ((weight: string) => {
    defaultParams.value.weight = weight;
});

const changeSize = ((size: number) => {
    defaultParams.value.size = size;
});

onMounted(() => {
  const cartItem = cart.chekToCartView(props.product.id);
  if (cartItem) {
    defaultParams.value.weight = cartItem.params.weight;
    defaultParams.value.size = cartItem.params.size;
  }
});

</script>

<template>
    <div class="AppProduct">
        <NuxtLink :to="`/product/${product.slug}`">
            <NuxtImg format="webp" :src="product.img" class="AppProduct__image" />
        </NuxtLink>
        <p class="AppProduct__name" :style="`font-size:${size}px`">{{ product.name }}</p>
        <div class="AppProduct__params">
            <ul class="AppProduct__lists">
                <AppParamsBtn v-for="item in product.params.weight" :class="{active: productInTheCart ? item === productInTheCart.params.weight : item === defaultParams.weight }" :item="item" :prefix="''" @change-params="changeWeigth" />
            </ul>
            <ul class="AppProduct__lists">
                <AppParamsBtn v-for="item in product.params.size" :class="{ active: productInTheCart ? item === productInTheCart.params.size : item === defaultParams.size }" :item="item" :prefix="'см.'" @change-params="changeSize" />
            </ul>
        </div>

        <div class="AppProduct__prices">
            <p class="AppProduct__price">от {{ product.price }} ₽</p>
            <AppCartBtns v-if="productInTheCart" :product="productInTheCart" :count="productInTheCart.count" />
            <div v-else class="AppProduct__add-btn"
                @click="cart.addToCart(product.id, product.name, product.slug, product.img, defaultParams.weight, defaultParams.size, product.price, 1)">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="#EB5A1E" />
                </svg>
                <p>Добавить</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.AppProduct {

    &__image {
        width: 100%;
        aspect-ratio: 1/1;
    }

    &__name {
        margin-top: 12px;
        font-weight: 800;
        letter-spacing: 0.01em;
        text-align: center;
        color: #000;
    }

    &__params {
        margin-top: 22px;
        padding: 8px;
        background: #f3f3f3;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__lists {
        display: flex;
        gap: 8px;

        li {
            width: 100%;
            text-align: center;
            padding: 8px;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 5px;
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.01em;
            text-align: center;
            color: #2c2c2c;

            &:hover {
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
                background: #fff;
            }
        }

        li.active {
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
            background: #fff;
        }
    }

    &__prices {
        margin-top: 20px;
        height: 51px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__price {
        font-weight: 700;
        font-size: 22px;
        letter-spacing: 0.01em;
        color: #000;
    }

    &__add-btn {
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        border: 1px solid #eb5a1e;
        border-radius: 30px;
        transition: all 0.3s;

        p {
            font-weight: 700;
            font-size: 16px;
            color: #eb5a1e;
            transition: all 0.3s;
        }

        svg path {
            transition: all 0.3s;
        }

        &:hover {
            background: #eb5a1e;

            p {
                color: #fff;
            }

            svg path {
                fill: white;
            }
        }

        &:active {
            transform: scale(0.9);
        }
    }
}
</style>