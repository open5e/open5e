<template>
    <VueShowdown :options="{tables: true}" :markdown="mdText"/>
</template>

<script>
import axios from 'axios'
import { VueShowdown } from 'vue-showdown'

export default
{
    name: 'md-viewer',
    props: {
        src: String,
        toc: {
            type: Boolean,
            default: true,
        },
        text: {
            type: String,
            default: "loading..."
        }
    },
    components: {
        'VueShowdown': VueShowdown
    },
    data () {
        return {
            sourceText: ""
        }
    },
    computed:{
        mdText: function () {
            if (this.sourceText) {
                return this.sourceText
            } else {
                return this.text
            }
        },
    },
    mounted()
    // If you assign both a text and a source, the text will be overwritten once the source loads
    {
        if (this.src)  {
            axios.get(this.src).then(response => {this.sourceText = response.data})
        }
    }
}
</script>

<style lang="scss"></style>