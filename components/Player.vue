<template>
    <b-col cols="12">
        <div style="background-color: #fff;" class="mb-3 p-2 text-center">
            <strong>Now playing: </strong> {{ audio.title }}
            <audio ref="audio" class="mt-1" controls controlsList="nodownload" :src="audio.audio_url"></audio>
            <p class="mb-0 text-secondary text-wrap">
                <small><font-awesome-icon :icon="['fa', 'clock']"/> {{ audio.created_date }}</small>&nbsp;&nbsp;
                <small><font-awesome-icon :icon="['fa', 'play']"/> {{ audio.views }} plays</small>&nbsp;&nbsp;
                <small><font-awesome-icon :icon="['fa', 'download']"/> {{ audio.downloads }} songs</small>&nbsp;&nbsp;
                <small><font-awesome-icon :icon="['fa', 'file']"/> {{ audio.filesize }}</small>&nbsp;&nbsp;
                <small><font-awesome-icon class="" :icon="['fa', 'heart']"/> {{ audio.total_hearts }} hearts</small>
            </p>
        </div>
    </b-col>
</template>

<script>
    export default {
        props: ['audio'],
        methods: {
            play: function () {
                //this.$refs.audio.load();
                this.$refs.audio.play();
            }
        }
    }
</script>