<template>
    <div class="r-field" :class="{'is-error': isInvalid}">
        <label v-if="label" class="r-field-label">{{label}}</label>
        <template v-if="!isGroupedInput">
            <input
                v-if="!multiline"
                class="r-field-input"
                :value="value"
                @input="update"
                :placeholder="placeholder"
                :disabled="disabled"
                :type="type"
                @keyup.enter="keySubmit"
                @keyup="keyPress"
                @keydown="keyDown"
                @focus="focus"
                @click="click"
                :name="name"
                :autocomplete="autocompleteFlag"/>
            <textarea
                ref="textarea"
                v-else-if="multiline && submitOnEnter"
                class="r-field-input"
                :value="value"
                @input="update"
                @keydown.enter.exact.prevent="keySubmit"
                @keyup="keyPress"
                @keydown="keyDown"
                :maxlength="maxLength"
                :placeholder="placeholder"
                :disabled="disabled"
                :rows="rows"
                :name="name">
            </textarea>
            <textarea
                ref="textarea"
                v-else="multiline && !submitOnEnter"
                class="r-field-input"
                :value="value"
                @input="update"
                @keydown.enter="keySubmit"
                @keyup="keyPress"
                @keydown="keyDown"
                :maxlength="maxLength"
                :placeholder="placeholder"
                :disabled="disabled"
                :rows="rows"
                :name="name">
            </textarea>
        </template>
        <div class="r-field-group" v-if="isGroupedInput">
            <div class="r-field-addon no-flex" v-if="leftLabel">{{leftLabel}}</div>
            <div class="r-field-control" :class="fieldStyles">
                <v-icon :icon="leftIcon" v-if="leftIcon"></v-icon>
                <input
                    class="r-field-input"
                    :value="value"
                    @input="update"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :type="type"
                    @keyup.enter="keySubmit"
                    @keyup="keyPress"
                    @keydown="keyDown"
                    @focus="focus"
                    @click="click"
                    :name="name"
                    :autocomplete="autocompleteFlag"/>
                <v-icon :icon="rightIcon" v-if="rightIcon"></v-icon>
            </div>
            <slot name="right-button"/>
            <div class="r-field-addon no-flex" v-if="rightLabel">{{rightLabel}}</div>
        </div>
        <span class="r-field-caption" v-if="helpText || maxLength">{{helpText}} <span v-if="maxLength">{{charactersLeft}}</span></span>
    </div>
</template>

<script>
    import './r-input.scss';
    import shortid from 'shortid';
    import rIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'RInput',
        components: {rIcon},
        props: {
            label: {
                type: String,
                default: null,
            },
            value: {
                type: [String, Number, Boolean],
                default: null,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            validate: {
                type: Object,
                default: null,
            },
            placeholder: {
                type: String,
                default: null,
            },
            helpText: {
                type: String,
                default: null,
            },
            multiline: {
                type: Boolean,
                default: false,
            },
            submitOnEnter: {
                type: Boolean,
                default: false,
            },
            leftIcon: {
                type: String,
                default: null,
            },
            rightIcon: {
                type: String,
                default: null,
            },
            leftLabel: {
                type: String,
                default: null,
            },
            rightLabel: {
                type: String,
                default: null,
            },
            password: {
                type: Boolean,
                default: false,
            },
            numeric: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                default: () => shortid.generate(),
            },
            rows: {
                type: String,
                default: '1',
            },
            autoFocus: {
                type: Boolean,
                default: false,
            },
            autoHighlight: {
                type: Boolean,
                default: false,
            },
            autoHighlightOnFocus: {
                type: Boolean,
                default: false,
            },
            maxLength: {
                type: String,
            },
            autoResize: {
                type: Boolean,
                default: false,
            },
            autoComplete: String,
        },
        computed: {
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            isGroupedInput() {
                return !this.multiline
                    && (this.leftIcon
                    || this.rightIcon
                    || this.leftLabel
                    || this.rightLabel
                    || this.$slots['right-button']);
            },
            fieldStyles() {
                const style = {};
                if (this.leftIcon) {
                    style['has-icon-left'] = true;
                }
                if (this.rightIcon) {
                    style['has-icon-right'] = true;
                }
                return style;
            },
            type() {
                if (this.password) {
                    return 'password';
                }
                if (this.numeric) {
                    return 'number';
                }
                return 'text';
            },
            autocompleteFlag() {
                return this.autoComplete || `new-${this.name}`;
            },
            charactersLeft() {
                return `(${this.value ? Number.parseInt(this.maxLength, 10) - this.value.length : this.maxLength} characters left.)`;
            },
        },
        methods: {
            update($event) {
                if (this.autoResize && this.$refs.textarea) {
                    this.autoResizeTextArea(this.$refs.textarea);
                }
                this.$emit('input', $event.target.value);
            },
            keySubmit() {
                this.$emit('key-submit');
            },
            keyPress(event) {
                this.$emit('key-press', event);
            },
            keyDown(event) {
                this.$emit('key-down', event);
            },
            getFocus() {
                this.$el.querySelector('input').focus();
            },
            blur() {
                this.$el.querySelector('input').blur();
            },
            focus() {
                if (this.autoHighlightOnFocus) {
                    this.highlight();
                }
                this.$emit('focus');
            },
            click() {
                this.$emit('click');
            },
            autoResizeTextArea(element) {
                element.style.height = 'auto';
                element.style.height = `${element.scrollHeight}px`;
            },
            highlight() {
                this.$nextTick(() => {
                    this.$el.querySelector('input').select();
                });
            },
        },
        mounted() {
            if (this.autoFocus) {
                this.getFocus();
            }
            if (this.autoHighlight) {
                this.highlight();
            }
            if (this.autoResize && this.$refs.textarea) {
                this.autoResizeTextArea(this.$refs.textarea);
            }
        },
    };
</script>

<style scoped>
    textarea {
        resize: none;
        overflow-x: hidden;
        overflow-y: auto;
        min-height: 36px;
        max-height: 150px;
    }
</style>