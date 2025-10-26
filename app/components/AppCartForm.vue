<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps(['address']);
const { errors, handleSubmit, defineField, resetForm } = useForm({
    validationSchema: yup.object({
        name: yup.string()
            .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя может содержать только русские и английские буквы')
            .required('Имя обязательно для заполнения'),
        phone: yup.string()
            .matches(/^\+?[0-9\s\-\(\)]+$/, 'Номер телефона может содержать только цифры, пробелы, дефисы и скобки')
            .min(18, 'Номер телефона должен содержать минимум 11 цифр')
            .required('Телефон обязателен для заполнения'),
    }),
});

const onSubmit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2));
    resetForm();
});

const [name, nameAttrs] = defineField('name');
const [phone, phoneAttrs] = defineField('phone');
</script>
<template>
    <form class="cart__order" @submit="onSubmit">
        <div class="cart__address">
            <p>Адрес:</p>
            <span>{{ address ? address : 'Укажите адрес на карте' }}</span>
        </div>
        <AppInput v-model="name" :name="name" :inputName="'name'" :nameAttrs="nameAttrs" :errors="errors.name" :placeholder="'Имя'" />
        <AppInput v-model="phone" :name="phone" :inputName="'phone'" :name-attrs="phoneAttrs" :errors="errors.phone" :placeholder="'Телефон'"/>
        <button class="cart__order-btn">Оформить заказ</button>
    </form>
</template>