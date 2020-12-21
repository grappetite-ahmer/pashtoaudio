<template>
    <b-col col cols="12" sm="12" md="6" lg="4" xl="4">
        <div class="card mb-3 flex-row">
            <nuxt-link :to="`/${category.uri}`">
                <img :src="category.image_url" :alt="category.name" class="card-img-left">
            </nuxt-link>
            <div class="card-body">
                <h4 class="card-title">
                    <nuxt-link :to="`/${category.uri}`">{{ category.name }}</nuxt-link>
                </h4>
                <p class="card-text">
                    <small><font-awesome-icon :icon="['fa', 'eye']"/> {{ category.views }} views</small><br>
                    <small><font-awesome-icon :icon="['fa', 'clock']"/> {{ category.created_date }}</small><br>
                    <small><font-awesome-icon :icon="['fa', 'music']"/> {{ category.total_songs }} songs</small><br>
                    <small><font-awesome-icon class="" :icon="['fa', 'heart']"/> {{ category.total_hearts }} hearts</small>
                </p>
            </div>
        </div>
    </b-col>
</template>

<script>
    export default {
        props: ['category']
    }
</script>