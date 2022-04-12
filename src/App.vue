<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <header>
        <NavBar />
    </header>
    <main class="container">
        <RouterView />
    </main>
    <footer class="footer mt-auto py-3">
        <Footer />
    </footer>
</template>

<style>
@import '@/assets/base.css';
</style>
