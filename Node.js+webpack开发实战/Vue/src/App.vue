<template>
    <div class='msg' @click="handclick">{{msg}}</div>
</template>
<script>
export default {
    data() {
        return {
            msg: 'Hello World'
        }
    },
    methods: {
        handclick: function () {
            console.log('handclick', this)
        }
    }
}
</script>
<style>
    .msg {
        color: red
    }
</style>