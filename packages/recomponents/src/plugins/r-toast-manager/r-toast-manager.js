import RToast from '../../components/r-toast/r-toast.vue';
import RToastTypes from './r-toast-types';

const ToastContainer = (Vue, globalOptions = {}) => ({
    show(options) {
        let message;
        if (typeof options === 'string') {
            message = options;
        }

        const defaultOptions = {
            message,
        };

        const propsData = Object.assign({}, defaultOptions, globalOptions, options);

        return new (Vue.extend(RToast))({
            el: document.createElement('div'),
            propsData,
        });
    },
    positive(message, options = {}) {
        return this.show(Object.assign({}, {
            message,
            type: RToastTypes.Positive,
        }, options));
    },
    negative(message, options = {}) {
        return this.show(Object.assign({}, {
            message,
            type: RToastTypes.Negative,
        }, options));
    },
    info(message, options = {}) {
        return this.show(Object.assign({}, {
            message,
            type: RToastTypes.Info,
        }, options));
    },
    warning(message, options = {}) {
        return this.show(Object.assign({}, {
            message,
            type: RToastTypes.Warning,
        }, options));
    },
});

export default ToastContainer;