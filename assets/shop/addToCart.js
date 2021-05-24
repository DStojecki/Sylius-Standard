import 'semantic-ui-css/components/api';
import $ from 'jquery';

$.fn.extend({
  
    addToCart() {
    const element = this;
    const url = $(element).attr('action');
    console.log(url)
    const validationElement = $('#sylius-cart-validation-error');
    const flash = document.getElementById('postive-pop-up')
    const text = document.getElementById('sylius-cart-total')
    const cart = document.getElementById('sylius-cart-button')

    element.api({
      method: 'POST',
      on: 'submit',
      cache: false,
      url,
      beforeSend(settings) {
        /* eslint-disable-next-line no-param-reassign */
        settings.data = element.serialize();

        return settings;
      },
      onSuccess() {
        validationElement.addClass('hidden');
        flash.style.display = "flex"
        // text.textContent = "Item added!"
        cart.innerHTML = "<i class='cart icon'></i><span id='sylius-cart-total'>Item added!</span>"

    },

      onFailure(response) {
        validationElement.removeClass('hidden');
        let validationMessage = '';

        Object.entries(response.errors.errors).forEach(([, message]) => {
          validationMessage += message;
        });
        validationElement.html(validationMessage);
        $(element).removeClass('loading');
      },
    });
  },
});
