<template>
    <b-container fluid style="margin-top: 5rem;">
        <b-row>
            <b-col cols="12" class="mb-2">
                <div class="heading">
                    <h1>Pashto Film, Pashto Gane, Pashto Song</h1>
                </div>
                <div class="sub-heading">
                    <h2>Pashto Film where you can find your favourite pashto movies gane mp3.</h2>
                </div>
            </b-col>

            <Categories v-for="category in categories" :category="category" :key="category.id" />

            <b-col cols="12">
                <div class="d-flex justify-content-center mb-3" v-if="!reached">
                    <b-button pill variant="outline-danger" :disabled="disabled" @click="getCategories">
                        <div v-if="loading">
                            <b-spinner small></b-spinner> Loading...
                        </div>
                        <span v-if="!loading">Load more</span>
                    </b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios';
    import Categories from '@/components/Categories';

    export default {
        asyncData ({ params }) {
            return axios.get('https://dev.pashtoaudios.com/api/v1/films', {
                    params: {
                        page: 1,
                        per_page: 12
                    }
                })
                .then((response) => {
                    // get response data
                    let res = response.data.result.data;
                    return {
                        categories: res
                    }
                });
        },
        components: {
            Categories
        },
        data () {
            return {
                page: 2,
                loading: false,
                reached: false,
                disabled: false,
            }
        },
        head () {
            return {
                title: "Pashto Film, Pashto Gane, Pashto Song - PashtoGane.com",
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: 'My custom description' }
                ]
            }
        },
        methods: {
            getCategories: function () {
                this.disabled = true;
                this.loading = true;

                axios.get('https://dev.pashtoaudios.com/api/v1/films', {
                    params: {
                        page: this.page,
                        per_page: 12
                    }
                })
                .then((response) => {
                    let res = response.data.result.data;
                    
                    this.categories = [...this.categories, ...res];
                    this.page++;

                    if (res.length === 0) {
                        this.reached = true;
                    }

                    this.disabled = false;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
            }
        }
    }
</script>