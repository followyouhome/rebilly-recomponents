<template>
    <div v-if="show"
         class="r-component r-loader"
         role="alert"
         aria-busy="true"
         :class="classes">
        <div class="r-loader-icon-wrapper">
            <div class="r-mr-re"></div>
            <div class="r-mr-bil"></div>
            <div class="r-mr-ly"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RLoader',

        props: {
            /**
             * Boolean value to show or hide component
             */
            show: {
                type: Boolean,
                default: true,
            },
            /**
             * Flag to start / stop animation
             */
            loading: {
                type: Boolean,
                default: true,
            },
            /**
             * Fill parent component or entire application
             */
            fullscreen: {
                type: Boolean,
                default: true,
            },
        },

        computed: {
            classes() {
                return {
                    'r-is-loading': !!this.loading,
                    'r-is-fullscreen': !!this.fullscreen,
                };
            },
        },
    };
</script>

<style lang="scss">
    @import './r-loader.scss';
</style>
