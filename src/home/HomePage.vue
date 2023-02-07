<template>
<div>
  <button v-on:click="$router.push('/login')">Locations</button>
</div>
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
    },
    methods: {
    }
};
</script>