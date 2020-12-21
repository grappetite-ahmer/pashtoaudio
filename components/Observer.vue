<template>
    <div class="observer" style="height: 1px;"></div>
</template>

<script>
    export default {
        name: 'observer',
        data () {
            return {
                observer: null
            }
        },
        mounted() {
            this.observer = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    this.$emit('intersect');
                }
            });

            this.observer.observe(this.$el);
        }
    }
</script>