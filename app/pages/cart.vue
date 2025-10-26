<script lang="ts" setup>

import { useCartStore } from '#imports';
import { shallowRef } from 'vue';
import type { YMap, DomEventHandler } from '@yandex/ymaps3-types';
import {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultMarker,
    YandexMapListener
} from 'vue-yandex-maps';
import image from '~/assets/images/empty.svg';

const cart = useCartStore()

// Yamaps

const map = shallowRef<null | YMap>(null);

let coord = ref<[number, number]>([41.9733, 45.0428]);
let address = ref<string>('');

const hanldeMarker = (event: any) => {
    coord.value = event;
}

const logMapClick: DomEventHandler = (object, event) => hanldeMarker(event.coordinates);

// Обновляем адрес

const { data, refresh } = await useFetch(
    () => `https://geocode-maps.yandex.ru/v1/?apikey=82465031-f316-42e2-b751-e224296cebe9&geocode=${coord.value[0]},${coord.value[1]}&format=json`,
    {
        immediate: true
    }
);

watch(data, (newData) => {
    if (newData) {
        const response = newData as any;
        address.value = response.response.GeoObjectCollection.featureMember[0].GeoObject.name;
    }
});

watch(coord, () => {
    refresh();
});

</script>
<template>
    <div v-if="cart.cart.products.length > 0" class="cart">
        <div class="container">
            <div class="cart__wrapper">
                <div class="cart__left">
                    <div class="cart__titles">
                        <h1>Корзина</h1>
                        <div class="cart__clear" @click="cart.cartClear()">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path
                                    d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                                    stroke="#B6B6B6" stroke-width="1.2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" stroke-width="1.2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            Очистить корзину
                        </div>
                    </div>
                    <div class="cart__items">
                        <AppCartItem v-for="product in cart.cart.products" :key="product.id" :product="product" />
                    </div>
                </div>
                <div class="cart__right">
                    <div class="cart__map-wrapper">
                        <ClientOnly>
                            <yandex-map v-model="map" class="cart__map" :settings="{
                                location: {
                                    center: [41.9733, 45.0428],
                                    zoom: 13,
                                },
                            }" width="100%" height="500px">
                                <yandex-map-default-scheme-layer />
                                <yandex-map-default-features-layer />
                                <yandex-map-listener :settings="{ onClick: logMapClick }" />
                                <yandex-map-default-marker :settings="{ coordinates: coord }" />
                            </yandex-map>
                        </ClientOnly>
                    </div>
                    <AppCartForm :address="address"/>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="cart">
        <div class="cart__empty">
            <h1>Корзина пустая 😕</h1>
            <p class="cart__descr">
                Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать пиццу, перейди на главную
                страницу.
            </p>
            <img :src="image" alt="" class="cart__image">
            <NuxtLink to="/" class="cart__link">Вернуться назад</NuxtLink>
        </div>
    </div>
</template>
<style lang="scss">
.marker {
    position: relative;
    width: 20px;
    height: 20px;
    background: #ff0000;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #fff;
    font-weight: bold;
    line-height: 20px;
}

.cart {
    width: 100%;
    margin: 0 auto;
    margin-top: 90px;

    &__wrapper {
        display: flex;
        gap: 40px;
    }

    &__left {
        max-width: 700px;
        width: 100%;
        flex-shrink: 0;
    }

    &__right {
        width: 100%;
    }

    &__titles {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__clear {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 400;
        font-size: 16px;
        color: #b6b6b6;
        cursor: pointer;
    }

    &__items {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
    }

    &__empty {
        max-width: 550px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__descr {
        margin-top: 10px;
        font-weight: 400;
        font-size: 18px;
        line-height: 145%;
        letter-spacing: 0.01em;
        text-align: center;
        color: #777;
    }

    &__image {
        margin-top: 40px;
    }

    &__link {
        display: block;
        margin-top: 60px;
        width: 210px;
        padding: 14px;
        border-radius: 30px;
        background: #282828;
        cursor: pointer;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.01em;
        text-align: center;
        color: #fff;
        transition: all 0.3s;

        &:hover {
            background: #434343;
        }
    }

    // &__map-wrapper{
    //     height: 500px;
    //     flex-shrink: 0;
    // }

    &__map {
        border-radius: 32px;
        overflow: hidden;
    }

    &__order {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }

    &__order-btn {
        padding: 0.75rem 1rem;
        cursor: pointer;
        background: #eb5a1e;
        border: 1px solid #eb5a1e;
        border-radius: 1.875rem;
        transition: all 0.3s;
        color: white;
        font-size: 20px;
        transition: all 0.3s;
        text-align: center;

        &:hover {
            background: #ff8150;
        }
    }



    &__address {
        display: flex;
        gap: 4px;
        font-size: 20px;

        p {
            font-weight: 700;
        }
    }


}
</style>