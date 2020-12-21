<template>
    <b-col col cols="12">
        <div>
            <ul class="list-unstyled">
                <li v-for="(audio, a) in audios" :audio="audio" :key="`${a}-${audio.id}`" class="media p-2 mb-1" style="background-color: #fff; border-bottom: 2px solid #c5c5c5;">
                    <div @click="playAudio(audio)" class="d-flex mr-3 align-self-center" style="cursor: pointer;">
                        <img src="@/assets/play.png" alt="placeholder" width="25" height="25" class="">
                    </div>
                    <div class="media-body text-truncate">
                        <span>{{ audio.title }}</span>
                        <p class="mb-0 text-secondary text-wrap">
                            <small><font-awesome-icon :icon="['fa', 'clock']"/> {{ audio.created_date }}</small>&nbsp;&nbsp;
                            <small><font-awesome-icon :icon="['fa', 'play']"/> {{ audio.views }} plays</small>&nbsp;&nbsp;
                            <small><font-awesome-icon :icon="['fa', 'download']"/> {{ audio.downloads }} songs</small>&nbsp;&nbsp;
                            <small><font-awesome-icon :icon="['fa', 'file']"/> {{ audio.filesize }}</small>&nbsp;&nbsp;
                            <small><font-awesome-icon class="" :icon="['fa', 'heart']"/> {{ audio.total_hearts }} hearts</small>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </b-col>
</template>

<script>
    export default {
        props: ['audios'],
        methods: {
            playAudio: function (audio) {
                this.$parent.playAudio(audio);
            }
        }
    }
</script>