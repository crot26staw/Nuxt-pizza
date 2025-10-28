<script lang="ts" setup>
import AppBtn from '~/components/ui/AppBtn.vue';
import type { User } from '~/shared/types/user';
definePageMeta({
    layout: 'auth',
    middleware: 'signup'
})

import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { errors, handleSubmit, defineField, resetForm } = useForm({
    validationSchema: yup.object({
        name: yup.string()
            .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя может содержать только русские и английские буквы')
            .required('Имя обязательно для заполнения'),
        email: yup.string()
            .email('Введите корректный email адрес')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email должен содержать @ и домен')
            .required('Email обязателен для заполнения'),
    }),
});

let isError = ref<string>('');

const onSubmit = handleSubmit(async (values) => {
    try {
        const users = await $fetch<User[]>('http://localhost:3001/users', {
            params: { email: values.email },
        });

        if (!users || users.length === 0) {
            const newUser = await $fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: values,
            });

            // 3️⃣ Сохраняем cookie и перенаправляем
            const auth = useCookie('auth');
            auth.value = JSON.stringify(values.name);
            isError.value = '';
            resetForm();
            await navigateTo('/account/');
        } else {
            isError.value = 'Пользователь с таким email уже зарегистрирован';
        }
    } catch (err) {
        console.error('Ошибка при запросе:', err);
        isError.value = 'Произошла ошибка при отправке';
    }
});


const [email, emailAttrs] = defineField('email');
const [name, nameAttrs] = defineField('name');
</script>
<template>
    <div class="login-page">
        <div class="login">
            <p class="login__title">Введите имя и email для регистрации</p>
            <form class="login__form" @submit="onSubmit">
                <AppInput v-model="name" :name="name" :inputName="'name'" :nameAttrs="nameAttrs" :errors="errors.name"
                    :placeholder="'Имя'" />
                <AppInput v-model="email" :name="email" :inputName="'email'" :nameAttrs="emailAttrs"
                    :errors="errors.email" :placeholder="'Почта'" />
                <AppBtn :value="'Авторизоваться'" />
            </form>
            <p v-if="isError != ''" class="login__error">{{ isError }}</p>
            <div class="login__strings">
                <NuxtLink class="login__str" to="/login">Войти</NuxtLink>
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

    &__form {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__title {
        font-size: 20px;
        font-weight: 600px;
        text-align: center;
    }

    &__form {
        margin-top: 32px;
    }

    &__error {
        margin-top: 8px;
        font-size: 18px;
        color: red;
    }

    &__strings {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 2px;
    }

    &__str {
        font-size: 14px;
        color: black;
        transition: all 0.3s;

        &:hover {
            color: #eb5a1e;
        }
    }
}
</style>