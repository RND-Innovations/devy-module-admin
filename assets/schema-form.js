let ACTIVE_MEDIA_INPUT = null;

document.addEventListener('click', function (event) {
    const button = event.target.closest('.devy-media-select');
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    // 🔥 Target the parent wrapper instead of generic 'div'
    const wrapper = button.closest('.devy-media-wrapper');
    if (!wrapper) return;

    const input = wrapper.querySelector('.devy-media-input');
    if (!input) return;

    ACTIVE_MEDIA_INPUT = input;
    toggleMediaPanel();
});

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('[data-schema-repeater]').forEach(repeater => {

        const items = repeater.querySelector('[data-repeater-items]');
        const template = repeater.querySelector('[data-repeater-template]');
        const addButton = repeater.querySelector('[data-repeater-add]');

        if (!items || !template || !addButton) {
            return;
        }

        const updateIndexes = () => {

            items.querySelectorAll('[data-repeater-item]').forEach(
                (item, index) => {

                    item.querySelectorAll('[name]').forEach(input => {

                        input.name = input.name.replace(
                            /\[\d+\]/,
                            `[${index}]`
                        );

                    });

                    const number = item.querySelector(
                        '.schema-repeater-number'
                    );

                    if (number) {
                        number.textContent = index + 1;
                    }

                }
            );

        };


        /*
        |--------------------------------------------------------------------------
        | ADD
        |--------------------------------------------------------------------------
        */

        addButton.addEventListener('click', event => {

            event.preventDefault();

            const index = items.querySelectorAll(
                '[data-repeater-item]'
            ).length;

            const html = template.innerHTML.replaceAll(
                '__INDEX__',
                index
            );

            items.insertAdjacentHTML(
                'beforeend',
                html
            );

            updateIndexes();

        });


        /*
        |--------------------------------------------------------------------------
        | REMOVE
        |--------------------------------------------------------------------------
        */

        items.addEventListener('click', event => {

            const button = event.target.closest(
                '[data-repeater-remove]'
            );

            if (!button) {
                return;
            }

            event.preventDefault();

            const item = button.closest(
                '[data-repeater-item]'
            );

            if (!item) {
                return;
            }

            item.remove();

            updateIndexes();

        });


        /*
        |--------------------------------------------------------------------------
        | INITIALIZE
        |--------------------------------------------------------------------------
        */

        updateIndexes();

    });

});



