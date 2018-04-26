<template>
    <div id="charity">
        <div id="picture"></div>
    </div>
</template>

<script>
    export default {
        name: "charity",
        data () {
        return {
            charName: this.$route.params.charName,
            charity: {}
        }
      },
    }
</script>

<style scoped>
    
</style>