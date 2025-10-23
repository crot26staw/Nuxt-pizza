<script lang="ts" setup>
definePageMeta({
    layout: 'auth',
})

// const supabase = useSupabaseClient()
// const email = ref('')

// const signInWithOtp = async () => {
//     const { error } = await supabase.auth.signInWithOtp({
//         email: email.value,
//         options: {
//             emailRedirectTo: 'http://localhost:3000/confirm',
//         }
//     })
//     if (error) console.log(error)
// }
</script>
<template>
    <!-- <div class="auth">
        <button @click="signInWithOtp">
            Войти с помощью электронной почты
        </button>
        <input v-model="email" type="email" />
    </div> -->
</template>
<style lang="scss">
button{
    padding: 10px;
    border: 1px solid rgb(212, 212, 212);
    border-radius: 8px;
    cursor: pointer;
}
</style>