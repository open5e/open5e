<template>
    <VueShowdown ref="mdwrapper" :vue-template="true" :options="{tables: true}" :markdown="mdText"/>
</template>

<script>
import axios from 'axios'
import { VueShowdown } from 'vue-showdown'
import VueScrollTo from 'vue-scrollto';

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
            default: 'loading...'
        }
    },
    components: {
        'VueShowdown': VueShowdown
    },
    data () {
        return {
            sourceText: ''
        }
    },
    methods: {
        scrollToRoute: function() {
            if (this.$route.hash) {
                this.$nextTick(() => {
                    console.log(this.$el);
                    const hash = this.$route.hash;
                    var container = this.$el.querySelector(hash);
                    console.log(container);
                    container.scrollIntoView({ behavior: 'smooth'});
                })
            }
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
    {
        if (this.src)  {
            axios.get(this.src).then(response => {this.sourceText = response.data; this.scrollToRoute()})
        }
    }
}
</script>

<style lang="scss"></style>