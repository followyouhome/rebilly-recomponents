import moment from 'moment';
import {boolean, select} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/vue';
import markdown from './r-date-range.md';
import RDateRange from './r-date-range.vue';
import DateTimeFormats from '../../common/datetime-formats';
import calendarPresets, {getCalendarPresetPeriods} from './calendar-presets';

const minDate = new Date();

storiesOf('Components.Date Range', module)
    .addParameters({component: RDateRange})
    .add('Component', () => ({
        props: {
            showPresets: {
                default: boolean('Show Presets', true),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            maxDate: {
                default: select(
                    'Max Date', {
                        'no restrictions': null,
                        'only past dates': new Date(),
                    }, null,
                ),
            },
            minDate: {
                default: select(
                    'Min Date', {
                        'no restrictions': null,
                        [`allow since ${moment(minDate).format(DateTimeFormats.shortDate)}`]: minDate,
                    }, null,
                ),
            },
        },
        data() {
            return {
                period: {
                    start: '2020-01-01',
                    end: '2020-02-01',
                },
            };
        },
        created() {
            if (!this.period) {
                this.updatePeriod(getCalendarPresetPeriods(this.$tz())[calendarPresets.today]);
            }
        },
        methods: {
            convertDate(date) {
                return this.$tz().fromDate(date).format(DateTimeFormats.shortDate);
            },
            updatePeriod(period) {
                this.period = period;
            },
        },
        template: `
            <div class="storybook-center">
                <div>
                    <r-date-range :timezone-handler="$tz"
                                  :period="period"
                                  :min-date="minDate"
                                  :show-presets="showPresets"
                                  :max-date="maxDate"
                                  :disabled="disabled"
                                  @input="updatePeriod"></r-date-range>
                </div>
            </div>`,
    }), {
        notes: {markdown},
    });
