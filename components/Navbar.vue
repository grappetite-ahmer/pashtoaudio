<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="dark" variant="danger">
            <div class="drawer-toggle" role="button" @click="$store.dispatch('nav/toggleSidebar')">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <nuxt-link to="/">
                <b-navbar-brand>
                    <font-awesome-icon :icon="['fa', 'home']"/> PASHTO AUDIOS
                </b-navbar-brand>
            </nuxt-link>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/search">
                    <font-awesome-icon :icon="['fa', 'search']"/>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>

        <SearchModal/>
    </div>
</template>

<script>
    import SearchModal from '@/components/SearchModal';

    export default {
        components: {
            SearchModal
        }
    }
</script>