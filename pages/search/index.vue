<template>
    <b-container fluid style="margin-top: 5rem;">
        <b-row class="mb-3">
            <b-col cols="12">
                <div class="p-2" style="background: #fff;">
                    <b-form @submit.stop.prevent="categories=[]; page=1; reached=false; getCategories()">
                        <b-input-group>
                            <b-input-group-prepend is-text>
                                <b-form-checkbox size="lg" value="Songs" unchecked-value="Categories" v-model="search_type" name="search_type" variant="danger" switch>
                                </b-form-checkbox>
                            </b-input-group-prepend>
                            <b-input
                                size="lg" 
                                id="inline-form-input-name" 
                                v-model="search_query" 
                                autofocus
                                :placeholder="`Search ${search_type}...`">
                            </b-input>
                        </b-input-group>
                    </b-form>
                </div>
            </b-col>
        </b-row>
        
        <b-row>
            <Categories v-for="(category, c) in categories" :category="category" :key="`${c}-${category.id}`" />
        </b-row>

        <b-row>
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
        components: {
            Categories
        },
        data () {
            return {
                page: 1,
                loading: false,
                reached: false,
                disabled: false,
                categories: [],
                search_type: "Songs",
                search_query: "",
            }
        },
        methods: {
            getCategories: function () {
                this.disabled = true;
                this.loading = true;

                axios.get('https://dev.pashtoaudios.com/api/v1/search/categories', {
                    params: {
                        keyword: this.search_query,
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
            }
        }
    }
</script>