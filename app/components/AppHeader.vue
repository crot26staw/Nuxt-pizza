<script lang="ts" setup>

const cart = useCartStore();

</script>

<template>
    <header class="AppHeader container">
        <NuxtLink to="/" class="AppHeader__logo">
            <NuxtImg src="/logo.svg" width="30px" height="30px" />
            <p class="AppHeader__name">Nuxt-pizza</p>
        </NuxtLink>
        <div class="AppHeader__flex">
            <NuxtLink to="/account">
                <NuxtImg src="/account.svg" width="40px" height="40px" />
            </NuxtLink>
            <NuxtLink to="/cart/" class="AppHeader__cart">
                <p class="AppHeader__string">{{ cart.cart.total }} ₽</p>
                <span class="AppHeader__line"></span>
                <div class="AppHeader__count">
                    <NuxtImg src="/cart.svg" width="19px" height="19px" />
                    <p class="AppHeader__string">{{ cart.cart.totalCount }}</p>
                </div>
            </NuxtLink>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.AppHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid rgb(199, 199, 199);

    &__logo {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__name {
        font-size: 32px;
        font-weight: 600;
        color: black;
        text-decoration: none;
    }

    &__flex{
        display: flex;
        gap: 12px;
        align-items: center;
    }

    &__cart {
        background: #FE5F1E;
        padding: 12px 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 100px;
        transition: all 0.3s;

        &:hover {
            background: #ff8150;
        }
    }

    &__string {
        color: white;
        font-size: 20px;
        font-weight: 600px;
    }

    &__count {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    &__line {
        display: block;
        width: 1px;
        height: 20px;
        background: white;
    }
}
</style>