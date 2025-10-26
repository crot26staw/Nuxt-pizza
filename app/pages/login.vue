<script lang="ts" setup>
definePageMeta({
    layout: 'auth'
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

const onSubmit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2));
    resetForm();
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
                <button>Авторизоваться</button>
            </form>
        </div>
    </div>
</template>
<style lang="scss">
.login-page {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login {
    padding: 20px;
    width: 550px;
    border-radius: 20px;

    &__title {
        font-size: 20px;
        font-weight: 600px;
        text-align: center;
    }

    &__form {
        margin-top: 32px;
    }
}

button {
    width: 100%;
    margin-top: 12px;
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
</style>