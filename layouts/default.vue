<template>
    <div class="app-container">
        <TheHeader/>
        <TheSideNav/>
        <div class="app-content">
            <nuxt />
        </div>
        <TheFooter/>
    </div>
</template>

<script>
    import TheHeader from '@/components/TheHeader'
    import TheFooter from '@/components/TheFooter'
    import TheSideNav from '@/components/TheSideNav'

    export default {
        components: {
            TheHeader,
            TheSideNav,
            TheFooter
        }
    }
</script>