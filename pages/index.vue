<template>
    <b-container fluid style="margin-top: 5rem;">
        <b-row>
            <b-col cols="12">
                <div class="heading">
                    <h1>Pashto Gane, Pashto Song</h1>
                </div>
                <div class="sub-heading">
                    <h2>Pashtogane.com a website for Pashto Song lovers, where we’ll provide you best quality Pashto Gane, Pashto Film and Pashto Singer MP3 songs.</h2>
                </div>
                <div class="mb-2" style="background: #f7f7f7;">
                    <b-dropdown v-b-tooltip.hover.v-dark title="Filter by" size="sm" text="Outline Danger" variant="outline-danger" class="m-2">
                        <template v-slot:button-content>
                            <font-awesome-icon :icon="['fa', 'filter']"/> {{ filter_by == 'Views' ? 'Most Viewed' : filter_by }}
                        </template>
                        <b-dropdown-item @click="clearFilters('All')">All</b-dropdown-item>
                        <b-dropdown-item @click="clearFilters('Featured')">Featured</b-dropdown-item>
                        <b-dropdown-item @click="clearFilters('Popular')">Most Popular</b-dropdown-item>
                        <b-dropdown-item @click="clearFilters('Views')">Most Viewed</b-dropdown-item>
                    </b-dropdown>
                </div>
            </b-col>

            <Categories v-for="(category, c) in categories" :category="category" :key="`${c}-${category.id}`" />

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
            return axios.get('https://dev.pashtoaudios.com/api/v1/categories', {
                    params: {
                        page: 1,
                        per_page: 12,
                        sort_by: 'All'
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
                filter_by: 'All'
            }
        },
        head () {
            return {
                title: "Pashto Gane, Pashto Song - PashtoGane.com",
                meta: [
                    // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                    { hid: 'description', name: 'description', content: "Pashtogane.com a website for Pashto Song lovers, where we’ll provide you best quality Pashto Gane, Pashto Film and Pashto Singer MP3 songs." },
                    { hid: 'keywords', name: 'keywords', content: "pashto gane,pashto song,pashto film,pashto singer,pashto album,pashto audio,pashto mp3,pashto music,pashto mp3 song,pashto tapay" }
                ]
            }
        },
        methods: {
            getCategories: function () {
                this.disabled = true;
                this.loading = true;

                axios.get('https://dev.pashtoaudios.com/api/v1/categories', {
                    params: {
                        page: this.page,
                        per_page: 12,
                        sort_by: this.filter_by
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
            },
            clearFilters: function (filterBy) {
                this.categories = [];
                this.page = 1;
                this.reached = false;
                this.filter_by = filterBy;
                this.loading = true;
                this.getCategories();
            }
        }
    }
</script>
