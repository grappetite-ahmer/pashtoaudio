<template>
    <div class="sidenav-container">
        <div v-if="toggleSidebar" class="backdrop" @click="$store.dispatch('nav/toggleSidebar')"></div>

        <transition name="slide-side">
            <div v-if="toggleSidebar" class="sidenav">
                <ul class="nav-list">
                    <li class="nav-item" @click="$store.dispatch('nav/toggleSidebar')">
                        <nuxt-link to="/">
                            <font-awesome-icon :icon="['fa', 'home']"/>  Home
                        </nuxt-link>
                    </li>
                    <li class="nav-item" @click="$store.dispatch('nav/toggleSidebar')">
                        <nuxt-link to="/albums">
                            <font-awesome-icon :icon="['fa', 'record-vinyl']"/>  Albums
                        </nuxt-link>
                    </li>
                    <li class="nav-item" @click="$store.dispatch('nav/toggleSidebar')">
                        <nuxt-link to="/films">
                            <font-awesome-icon :icon="['fa', 'film']"/>  Films
                        </nuxt-link>
                    </li>
                    <li class="nav-item" @click="$store.dispatch('nav/toggleSidebar')">
                        <nuxt-link to="/singers">
                            <font-awesome-icon :icon="['fa', 'microphone']"/>  Singers
                        </nuxt-link>
                    </li>
                    <li><hr></li>
                    <li class="nav-item" @click="$store.dispatch('nav/toggleSidebar')">
                        <nuxt-link to="/login">
                            <font-awesome-icon :icon="['fa', 'sign-in-alt']"/>  Login
                        </nuxt-link>
                    </li>
                    <li class="nav-item" @click="$store.dispatch('nav/toggleSidebar')">
                        <nuxt-link to="/register">
                            <font-awesome-icon :icon="['fa', 'registered']"/>  Register
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        computed: {
            toggleSidebar() {
                return this.$store.getters['nav/toggleSidebar']
            }
        }
    }
</script>