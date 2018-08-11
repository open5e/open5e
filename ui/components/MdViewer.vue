<template>
    <vue-markdown 
    :breaks="false" 
    :source="mdText"
    :toc="toc">
    </vue-markdown>
</template>

<script>
import axios from 'axios'
import VueMarkdown from 'vue-markdown'

export default
{
    name: 'md-viewer',
    props: {
        src: String,
        toc: {
            type: Boolean,
            default: false,
        }

    },
    components: {
        'vue-markdown': VueMarkdown
    },
    data: function()
    {
        return ({"mdText": ""});
    },
    mounted()
    {
        axios.get(this.src).then(response => {this.mdText = response.data})
    }
}
</script>

<style lang="scss"></style>