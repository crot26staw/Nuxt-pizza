<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps(['address', 'cart']);
const emit = defineEmits(['cartClear']);
const cartData = props.cart;

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

const onSubmit = handleSubmit(async (values) => {
    const user = useCookie('auth', { decode: decodeURIComponent });
    if (user.value) {
        const userData = JSON.parse(user.value);
        const { id, ...userWithoutId } = userData;
        try {
            const newOrder = await $fetch('http://localhost:3001/orders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: { ...userWithoutId, cartData }
            })
            resetForm();
            emit('cartClear');
        } catch (error) {
            console.error(`Ошибка сервера: ${error}`)
        } 
    }
    
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
        <AppInput v-model="name" :name="name" :inputName="'name'" :nameAttrs="nameAttrs" :errors="errors.name"
            :placeholder="'Имя'" />
        <AppInput v-model="phone" :name="phone" :inputName="'phone'" :name-attrs="phoneAttrs" :errors="errors.phone"
            :placeholder="'Телефон'" />
        <button class="cart__order-btn">Оформить заказ</button>
    </form>
</template>