/**
 * Simple directive to add lazy image loading
 */
export default {
    inserted: (el) => {
        const loadImage = (observer) => {
            if (el) {
                el.addEventListener('load', () => {
                    el.classList.add('r-is-loaded');
                    observer.unobserve(el);
                });

                el.addEventListener('error', () => console.log('error'));
                el.src = el.dataset.url;
            }
        };

        const handleIntersect = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage(observer);
                }
            });
        };

        const createObserver = () => {
            const options = {
                root: null,
                threshold: 0,
            };

            const observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(el);
        };

        if (!window.IntersectionObserver) {
            loadImage();
        } else {
            createObserver();
        }
    },
};
