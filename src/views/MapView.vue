<script>
import LoadingProgress from "../components/LoadingProgress.vue";
import ErrorBox from "../components/ErrorBox.vue";
export default {
    data() {
        return {
            mapUid: String(this.$route.params.uid),
            fetchOpts: {},
            CORS_PROXY_API: "https://api.allorigins.win/raw?url=",
            MAP_INFO_API: "https://trackmania.io/api/map/",
            LEADERBOARD_API: "https://trackmania.io/api/leaderboard/map/",
            mapInfo: {},
            leaderboards: [],
            isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            fetchLoading: false,
            loadMoreLoading: false,
            fetchErrorState: false,
            fetchErrorMessage: "",
        };
    },
    mounted() {
        this.fetchDatas();
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
                this.isDarkMode = event.matches
            });
    },
    methods: {
        async fetchDatas() {
            if (!window.fetch) {
                this.fetchErrorState = true;
                this.fetchErrorMessage = "Votre navigateur ne supporte pas la méthode Fetch. Veuillez mettre à jour votre navigateur.";
                return;
            }
            this.fetchLoading = true;
            try {
                this.mapInfo = await this.getMapInfo();
                this.leaderboards = await this.getLeaderboard();
                window.document.title = this.formatString(this.mapInfo.name.replace(/ -[# A-Za-z0-9]*$/gi, '')) + " - Uig.li";
            }
            catch (err) {
                this.fetchErrorState = true;
                this.fetchErrorMessage = "Erreur lors de la récupération des données. Veuillez réessayer ultérieurement.\nDetails: " + err;
            }
            this.fetchLoading = false;
        },
        async getMapInfo() {
            let response = await fetch(this.CORS_PROXY_API + encodeURIComponent(this.MAP_INFO_API + this.mapUid), this.fetchOpts);
            if (!response.ok) {
                throw response.statusText;
            }
            return await response.json();
        },
        async getLeaderboard() {
            let params = new URLSearchParams();
            params.append('offset', this.leaderboards.length);
            params.append('length', 100);
            let response = await fetch(this.CORS_PROXY_API + encodeURIComponent(this.LEADERBOARD_API + this.mapUid + '?' + params.toString()), this.fetchOpts);
            if (!response.ok) {
                throw response.statusText;
            }
            let json = await response.json();
            return json.tops;
        },
        async loadMoreLeaderboard(){
            this.loadMoreLoading = true;
            let params = new URLSearchParams();
            params.append('offset', this.leaderboards.length);
            params.append('length', 100);
            let response = await fetch(this.CORS_PROXY_API + encodeURIComponent(this.LEADERBOARD_API + this.mapUid + '?' + params.toString()), this.fetchOpts);
            if (!response.ok) {
                throw response.statusText;
            }
            let json = await response.json();
            this.leaderboards = this.leaderboards.concat(json.tops);
            this.loadMoreLoading = false;
        },
        convertMsToTime(mstime) {
            // excepted: m:ss.ms
            let ms = mstime % 1000;
            let s = Math.floor(mstime / 1000) % 60;
            let m = Math.floor(mstime / 60000);

            // ms should have 3 digits
            if (ms < 10) {
                ms = "00" + ms;
            }
            else if (ms < 100) {
                ms = "0" + ms;
            }

            // s should have 2 digits
            if (s < 10) {
                s = "0" + s;
            }

            return m + ':' + s + '.' + ms;
        },
        formatString(str){
            // https://github.com/GreepTheSheep/node-trackmania.io/blob/develop/src/client/Client.js#L120-L147
            let res, resStr;
            resStr = str.replace(/\$T/g, '$t').replace(/\$Z/g, '$z');
            while ((res = resStr.match(/\$t(.)*(\$z)|\$t(.)*$/g)) !== null) {
                for (let i = 0; i < res.length; i++) {
                    resStr = resStr.replace(res[i], res[i].toUpperCase());
                }
            }
            resStr = resStr.replace(/\$\$/gi, '$');
            return resStr.replace(/\$[<>wnoisgtz]|\$[hl]\[(.)+\]|\$[hl]|\$[0-9a-fA-F]{3}/gi, '');
        }
    },
    components: { LoadingProgress, ErrorBox }
}
</script>

<template>
    <LoadingProgress v-if="fetchLoading" />
    <ErrorBox v-if="fetchErrorState" :message="fetchErrorMessage" @retryBtnClick="fetchDatas" />
    <div class="mt-4" v-if="!fetchLoading && !fetchErrorState">
        <h1 v-if="mapInfo.name">{{formatString(mapInfo.name.replace(/ -[# A-Za-z0-9]*$/gi, ''))}}</h1>
        <div class="row">
            <div class="col-sm-4 gap-3">
                <img class="img-fluid mapThumb" :src="mapInfo.thumbnailUrl" :alt="mapInfo.name">
                <div class="d-grid mt-3">
                    <a
                        :href="'https://trackmania.io/#/leaderboard/'+mapUid"
                        target="_blank"
                        class="btn btn-primary">
                        <i class="fa fa-heartbeat" aria-hidden="true"></i>
                        Voir sur Trackmania.io
                    </a>
                    <a
                        v-if="mapInfo.exchangeid != 0"
                        :href="'https://trackmania.exchange/tracks/view/'+mapInfo.exchangeid"
                        target="_blank"
                        class="btn btn-primary mt-3">
                        <img src="https://trackmania.io/img/tmx.png" alt="Voir sur TMX" width="20">
                        Voir sur Trackmania.exchange
                    </a>
                </div>
            </div>
            <div class="col-sm-8">
                <table class="table table-hover" :class="this.isDarkMode ? 'table-dark' : ''">
                    <thead>
                        <tr>
                            <th>Rang</th>
                            <th>Joueur</th>
                            <th>Temps</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="top in leaderboards" :key="top.position">
                            <td>
                                {{ top.position == 1 ? '🥇' : top.position == 2 ? '🥈' : top.position == 3 ? '🥉' : top.position }}
                            </td>
                            <td>
                                {{ top.player.tag ? `[${formatString(top.player.tag)}] ` : '' }}
                                <a :href="'https://trackmania.io/#/player/'+top.player.id" target="_blank">
                                    {{ top.player.name }}
                                </a>
                            </td>
                            <td>
                                {{ convertMsToTime(top.time) }}
                                <span class="text-danger">
                                    {{ top.position > 1 ? ' (+' + convertMsToTime(top.time - leaderboards[top.position - 2].time) + ')' : '' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-grid" v-if="!loadMoreLoading">
                    <button class="btn btn-primary" @click="loadMoreLeaderboard">Chargez plus...</button>
                </div>
                <LoadingProgress v-else />
            </div>
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';
</style>

<style scoped>
.mapThumb, .btn {
    border-radius: 1.25rem;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    transform: skew(-5deg);
}
</style>