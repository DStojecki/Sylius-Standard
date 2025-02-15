import 'semantic-ui-css/components/api';
import $ from 'jquery';

$.fn.extend({
  
    addToCart() {
    const element = this;
    const url = $(element).attr('action');
    
    const validationElement = $('#sylius-cart-validation-error');
    const flash = document.getElementById('postive-pop-up')
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
