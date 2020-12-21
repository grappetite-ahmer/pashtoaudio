<template>
    <b-container fluid style="margin-top: 5rem;">
        <b-row>
            <b-col col cols="12">
                <h4>
                    <nuxt-link to="/" class="text-danger">
                        <font-awesome-icon :icon="['fa', 'angle-left']"/> Back
                    </nuxt-link>
                </h4>
            </b-col>
        </b-row>
        <b-row>
            <Category :category="category" />

            <!-- <Player v-if="audio" :audio="audio" ref="player" /> -->
            <!-- <Audios :audios="audios" :method="playAudio" /> -->

            <b-col cols="12" v-if="audio">
                <div style="background-color: #fff;" class="mb-3 p-2 text-center">
                    <strong>Now playing: </strong> {{ audio.title }}
                    <audio id="audio_player" :src="audio.audio_url" v-on:play="play(audio)" v-on:pause="pause(audio)" v-on:ended="end(audio.id)" class="mt-1" controls controlsList="nodownload"></audio>
                    <p class="mb-0 text-secondary text-wrap">
                        <small><font-awesome-icon :icon="['fa', 'clock']"/> {{ audio.created_date }}</small>&nbsp;&nbsp;
                        <small><font-awesome-icon :icon="['fa', 'play']"/> {{ audio.views }} plays</small>&nbsp;&nbsp;
                        <small><font-awesome-icon :icon="['fa', 'download']"/> {{ audio.downloads }} songs</small>&nbsp;&nbsp;
                        <small><font-awesome-icon :icon="['fa', 'file']"/> {{ audio.filesize }}</small>&nbsp;&nbsp;
                        <small><font-awesome-icon class="" :icon="['fa', 'heart']"/> {{ audio.total_hearts }} hearts</small>
                    </p>
                </div>
            </b-col>

            <b-col col cols="12">
                <div>
                    <ul class="list-unstyled">
                        <li v-for="(audio, a) in audios" :audio="audio" :key="`${a}-${audio.id}`" class="single-audio media p-2 mb-1" style="background-color: #fff; border-bottom: 2px solid #c5c5c5;">
                            <div @click="getAudioFile(audio)" :playing_audio="`audio.id`" class="d-flex mr-3 align-self-center" style="cursor: pointer;">
                                <img :src="play_stop_icon" :ref="`player_icon` + audio.id" alt="placeholder" width="25" height="25" class="">
                            </div>
                            <div @click="getAudioFile(audio)" class="media-body text-truncate" style="cursor: pointer;">
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

            <b-col cols="12">
                <div class="d-flex justify-content-center mb-3" v-if="loading">
                    <b-spinner variant="danger" label="Loading..."></b-spinner>
                </div>
            </b-col>

            <Observer v-on:intersect="getAudios()" />
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios';
    import Observer from '@/components/Observer';
    import Category from '@/components/Category';
    import Audios from '@/components/Audios';
    import Player from '@/components/Player';

    export default {
        asyncData ({ params }) {
            return axios.get('https://dev.pashtoaudios.com/api/v1/getCategoryBySlug', {
                    params: {
                        slug: params.slug
                    }
                })
                .then((response) => {
                    // get response data
                    let res = response.data.result;
                    return {
                        category: res
                    }
                });
        },
        components: {
            Observer, Category, Audios
        },
        data () {
            return {
                page: 1,
                loading: false,
                reached: false,
                show_player: false,
                audios: [],
                audio: null,
                playlist: [],
                audio_ids: [],
                play_stop_icon: require('@/assets/play.png'),
                playing_audio: 0
            }
        },
        mounted: function () {
        },
        methods: {
            getAudios: function () {
                // check if there is no more result and avoid calling service
                if (this.reached == true) {
                    return false;
                }

                // start loader on service call
                this.loading = true;

                axios.get('https://dev.pashtoaudios.com/api/v1/audios/category', {
                    params: {
                        category_id: this.category.id,
                        page: this.page,
                    }
                })
                .then((response) => {
                    // get response data
                    let res = response.data.result.data;
                    
                    // append the results to the array
                    this.audios = [...this.audios, ...res];
                    this.audio = this.audios[0];
                    
                    let ids = [];
                    res.forEach((audio) => {
                        ids.push(audio.id);
                    });
                    this.audio_ids = [...this.audio_ids, ...ids];
                    // this.playlist = 

                    if (this.page === 1) {
                        this.show_player = true;
                    }

                    // increament page number by 1
                    this.page++;

                    // check if there is no result
                    if (res.length < 10) {
                        this.reached = true;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    // stop loader after service call
                    this.loading = false;
                });
            },
            getAudioFile: function (audio) {
                let single_audios = this.$el.querySelectorAll('.single-audio div img');

                single_audios.forEach((single_audio) => {
                    single_audio.src = require('@/assets/play.png');
                });

                // pause the playing audio
                if (this.playing_audio == audio.id) {
                    var self = this;
                    setTimeout(function () {
                        self.$el.querySelector('#audio_player').pause();
                        self.playing_audio = 0;
                    }, 100);

                    return false;
                }

                // resume/start audio
                this.audio = audio;
                var self = this;
                setTimeout(function () {
                    self.$el.querySelector('#audio_player').play();
                    self.playing_audio = audio.id;
                }, 100);
            },
            play: function (audio) {
                this.$refs['player_icon'+audio.id][0].src = require('@/assets/sound.gif');
            },
            pause: function (audio) {
                this.$refs['player_icon'+audio.id][0].src = require('@/assets/play.png');
            },
            end: function (audio_id) {
                let next_audio = null;
                
                for (const audio in this.audios) {
                    if (this.audios[audio].id < audio_id) {
                        next_audio = this.audios[audio];
                        break;
                    }
                }
                
                if (next_audio) {
                    this.getAudioFile(next_audio);
                }
            }
        }
    }
</script>
