<template>
    <div class='msg' @click="handclick">{{msg}}</div>
</template>
<script lang = 'ts'>
import Vue from 'vue'
export default Vue.extend ({
    data() {
        return {
            msg: 'Hello World'
        }
    },
    methods: {
        handclick: async function () {
            const data = await this.sum(1,3)
            console.log(data)
        },
        sum(a: number, b: number) {
            return new Promise((resolve, reject)=> {
                resolve(a + b)
            })
        }
    }
})
</script>
<style>
    .msg {
        color: red
    }
</style>