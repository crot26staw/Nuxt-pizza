<script setup lang="ts">
interface Error {
  statusCode: number;
  message: string;
}

interface Data {
  code: number;
  message: string;
}

const $props = defineProps({
  error: {
    type: Object as () => Error,
    default: () => ({
      statusCode: 500,
      message: 'Внутренняя ошибка сервера',
    }),
  },
});

const messages: Record<number, string> = {
  400: 'Неправильный запрос',
  401: 'Не авторизован',
  403: 'Доступ запрещен',
  404: 'Страница не найдена',
  408: 'Время ожидания запроса истекло',
  500: 'Внутренняя ошибка сервера',
  502: 'Плохой шлюз',
  503: 'Сервис недоступен',
  504: 'Время ожидания шлюза истекло',
};

const data = computed<Data>(() => {
  return {
    code: $props.error.statusCode,
    message: messages[$props.error.statusCode] ?? $props.error.message,
  };
});
</script>

<template>
  <NuxtLayout>
    <div class="error">
      <div class="error__content">
        <div class="error__code">{{ data.code }}</div>
        <div class="error__message">
          {{ data.message }}
        </div>
        <NuxtLink
          to="/"
          class="error__back"
        >
          На главную
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
