<script lang="ts" setup>
import { vMaska } from "maska/vue"
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps(['address']);
const { errors, handleSubmit, defineField } = useForm({
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
        <input type="text" v-model="name" v-bind="nameAttrs" name="name" class="cart__input"
            :class="{ invalid: errors.name }" placeholder="Имя">
        <div v-if="errors.name" class="cart__error">{{ errors.name }}</div>
        <input type="text" v-model="phone" v-bind="phoneAttrs" name="phone" class="cart__input"
            :class="{ invalid: errors.phone }" v-maska="'+7 (###)-###-##-##'" placeholder="Телефон" />
        <div v-if="errors.phone" class="cart__error">{{ errors.phone }}</div>
        <button class="cart__order-btn">Оформить заказ</button>
    </form>
</template>