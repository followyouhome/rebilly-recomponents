import {storiesOf} from '@storybook/vue';
import {text, select} from '@storybook/addon-knobs';
import markdown from './r-badge.md';

storiesOf('Components', module)
    .add('Badge', () => ({
        template: `
        <r-badge
            :type="type"
        >
            {{text}}
        </r-badge>
    `,
        props: {
            type: {
                default: select('Type', ['default', 'positive', 'negative', 'warning', 'info', 'tag']),
            },
            text: {
                default: text('Text', 'Click me'),
            },
        },
    }), {
        notes: {markdown},
    });
