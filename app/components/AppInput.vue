<script lang="ts" setup>
import { vMaska } from 'maska/vue';

const props = defineProps(['nameAttrs', 'name', 'inputName', 'placeholder', 'errors']);
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.name
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})

</script>
<template>
    <div>
        <input v-if="inputName === 'phone'" type="text" class="input s" :class="{ invalid: errors }" v-model="value" v-bind="nameAttrs" v-maska="'+7 (###)-###-##-##'" :name="name" :placeholder="placeholder">
        <input v-else type="text" class="input" :class="{ invalid: errors }" v-model="value" v-bind="nameAttrs" :name="name" :placeholder="placeholder">
        <div v-if="errors" class="error">{{ errors }}</div>
    </div>
</template>
<style>
.input {
    width: 100%;
    padding: 14px;
    border-radius: 1.875rem;
    border: 1.5px solid black;
    outline: none;
}

.error {
    color: red;
}

.invalid {
    border-color: red;
}
</style>