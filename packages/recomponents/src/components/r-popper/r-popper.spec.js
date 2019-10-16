import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RPopper from './r-popper.vue';

const $t = () => 'custom text';

describe('r-popper.vue', () => {
    it('renders', () => {
        const wrapper = shallowMount(RPopper);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RPopper, {
            propsData: {
                escToHide: true,
                autoHide: true,
                globalAutoHide: false,
                closeFunction: () => {
                },
                openOnMount: true,
                disabled: true,
                fluid: false,
                offset: 4,
                direction: 'horizontal',
                position: 'bottomStart',
                slideFrom: 'fade',
            },
            mocks: {$t},
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should listen for ESC keydown event when escToHide is true', () => {
        const wrapper = shallowMount(RPopper, {
            propsData: {
                openOnMount: true,
                escToHide: true,
            },
            mocks: {$t},
        });

        expect(wrapper.vm.$data.isPopperVisible).toBe(true);

        wrapper.trigger('keydown.esc');
        expect(wrapper.vm.$data.isPopperVisible).toBe(false);
    });

    it('should render component with disabled prop', () => {
        const wrapper = mount(RPopper, {
            propsData: {
                disabled: true,
            },
            mocks: {$t},
        });

        expect(wrapper.vm.$data.isPopperVisible).toBe(false);
        wrapper.vm.setPopperVisible(true);
        expect(wrapper.vm.$data.isPopperVisible).toBe(false);
    });
});