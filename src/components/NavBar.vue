<script>
import mapList from '../maps.json';
export default {
    data() {
        return {
            maps: []
        }
    },
    mounted() {
        Object.entries(mapList).forEach(([key, value]) => {
            this.maps.push({
                name: key,
                uid: value
            });
        });
    },
    methods: {
        changeMap(event) {
            let optionSelected = event.target.value;
            this.$router.push('/map/' + optionSelected);
        },
        returnHome() {
            let select = document.getElementById('mapselect');
            select.value = select.options[0].value;
            this.$router.push('/');
        }
    },
}
</script>

<template>
    <div>
        <section style="background-color: #4a6f3c;">
            <img class="img-fluid cover mx-auto d-block" src="@/assets/uig.li_text_wide.png" alt="uig.li" />
        </section>
        <nav class="navbar navbar-light bg-light sticky-top">
            <div class="container">
                <div class="mx-auto d-block">
                    <!-- <button class="btn" @click="returnHome">Accueil</button> -->
                    <select class="ms-4" name="Maps" id="mapselect" @change="changeMap">
                        <option selected disabled>Selectionner une map</option>
                        <option v-for="map in maps" :key="maps.indexOf(map)" :value="map.uid">{{map.name}}</option>
                    </select>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.cover {
    width: 20%;
    height: auto;
    background-size: cover;
}
</style>