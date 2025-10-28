<script lang="ts" setup>
    const props = defineProps(['value'])
</script>
<template>
    <button>{{ value }}</button>
</template>
<style lang="scss" scoped>
button {
    width: 100%;
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