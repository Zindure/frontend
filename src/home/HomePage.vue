<template>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import {router} from "../_helpers";

export default {
    computed: {
        ...mapState({
        })
    },
    mounted () {
      router.push('/login')
    },
    methods: {
    }
};
</script>