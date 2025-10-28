<script lang="ts" setup>
import AppBtn from '~/components/ui/AppBtn.vue';
import type { User } from '~/shared/types/user';
definePageMeta({
    layout: 'auth',
    middleware: 'login'
})

import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { errors, handleSubmit, defineField, resetForm } = useForm({
    validationSchema: yup.object({
        email: yup.string()
            .email('Введите корректный email адрес')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email должен содержать @ и домен')
            .required('Email обязателен для заполнения'),
    }),
});

let isError = ref<string>('');

const onSubmit = handleSubmit(async values => {
    resetForm();
    const { data, status, error, refresh } = await useFetch<User[]>('http://localhost:3001/users', {
        params: { email: values.email },
    })

    if (error.value) {
        console.error('Ошибка при запросе:', error.value)
        isError.value = 'Произошла ошибка при отправке'
    } else if (!data.value || Object.keys(data.value).length === 0) {
        isError.value = 'Пользователь не найден'
    } else {
        const user = data.value?.[0];
        const auth = useCookie('auth');
        auth.value = JSON.stringify(user?.name);
        isError.value = '';
        await navigateTo('/account/');
    }

});

const [email, emailAttrs] = defineField('email');

</script>
<template>
    <div class="login-page">
        <div class="login">
            <p class="login__title">Введите email для авторизации</p>
            <form class="login__form" @submit="onSubmit">
                <AppInput v-model="email" :name="email" :inputName="'email'" :nameAttrs="emailAttrs"
                    :errors="errors.email" :placeholder="'Почта'" />
                <AppBtn :value="'Авторизоваться'" />
            </form>
            <p v-if="isError != ''" class="login__error">{{ isError }}</p>
            <div class="login__strings">
                <NuxtLink class="login__str" to="/signup">Зарегистрироваться</NuxtLink>
                <span>/</span>
                <NuxtLink class="login__str" to="/">На главную</NuxtLink>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login-page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login {
    padding: 20px;
    width: 450px;
    border-radius: 20px;

    &__title {
        font-size: 20px;
        font-weight: 600px;
        text-align: center;
    }

    &__form {
        margin-top: 32px;
    }

    &__error{
        margin-top: 8px;
        font-size: 18px;
        color: red;
    }

    &__strings{
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 2px;
    }

    &__str{
        font-size: 14px;
        color: black;
        transition: all 0.3s;

        &:hover{
            color: #eb5a1e;
        }
    }
}
</style>