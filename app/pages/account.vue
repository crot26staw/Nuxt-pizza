<script lang="ts" setup>
import AppBtn from '~/components/ui/AppBtn.vue';
definePageMeta({
    middleware: 'auth'
})

const logoutAuth = () => {
    const auth = useCookie('auth', { path: '/' })
    auth.value = null
    navigateTo('/login')
}

const user = useCookie('auth');

console.log(user.value);
</script>
<template>
    <div class="account">
        <div class="container">
            <div class="account__head">
                <h1>{{ user }}</h1>
                <AppBtn class="account__btn" :value="'Выйти из аккаунта'" @click="logoutAuth" />
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .account{
        padding: 40px 0;

        &__head{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__btn{
            max-width: 300px;
        }
    }

</style>