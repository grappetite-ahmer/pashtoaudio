<template>
    <div>
        <b-modal id="modal-1" class="m-0" size="lg" hide-header hide-footer>
            <div>
                
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                search_type: "Songs",
                search_query: ""
            }
        },
        methods: {
            openSearchPage() {
                this.$router.push("/search/categories");
            }
        }
    }
</script>