<script lang="ts" setup>
    const props = defineProps(['item', 'prefix']);
    const emit = defineEmits(['change-params']);

    const emitchangeWeigth = () =>{
        emit('change-params', props.item)
    }
</script>
<template>
    <li @click="emitchangeWeigth">{{ item }} {{ prefix }}</li>
</template>
<style lang="scss" scoped></style>