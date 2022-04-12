<script>
export default {
    props: {
        message: {
            required: true,
        },
        showRetryBtn: {
            type: Boolean,
            required: false,
            default: true
        },
    },
}
</script>

<template>
    <div class="alert alert-danger">
        {{ message }}
        <br />
        <button class="btn btn-primary me-2" @click="$emit('retryBtnClick');" v-if="showRetryBtn">Réssayer</button>
        <button class="btn btn-secondary" @click="$router.back()">Retourner en arrière</button>
    </div>
</template>