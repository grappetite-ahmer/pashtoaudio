<template>
    <b-col col cols="12" sm="12" md="12" lg="12" xl="12">
        <div class="card mb-3 flex-row">
            <img :src="category.image_url" :alt="category.name" class="card-img-left">
            <div class="card-body">
                <h4 class="card-title">
                    {{ category.name }}
                </h4>
                <h6 class="card-subtitle text-muted mb-2">{{ category.title }}</h6>
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