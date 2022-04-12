<script>
export default {
    data() {
        return {
            gitCommit: GIT_COMMIT_HASH, // eslint-disable-line no-undef
            builtAt: new Date(BUILT_AT).toLocaleString(), // eslint-disable-line no-undef
        }
    },
}
</script>
<template>
    <div class="container">
        <p>Crée par <a href="https://greep.gq" target="_blank">Greep</a> pour la ZrT Trackmania Cup 2022</p>
        <p class="text-xs break-words-legacy">
            Dernière mise à jour: {{ builtAt }} - git commit: {{ gitCommit.substr(0,7) }} -
            <a href="https://github.com/GreepTheSheep/uig.li">Dépôt Github</a> -
            Les données sont issues de <a href="https://trackmania.io" target="_blank">Trackmania.io</a>
        </p>
    </div>
</template>

<style scoped>
.text-xs {
    font-size: 0.7em;
}
</style>