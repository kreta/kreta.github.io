/*
 * This file is part of the Kreta package.
 *
 * (c) Beñat Espiña <benatespina@gmail.com>
 * (c) Gorka Laucirica <gorka.lauzirika@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

(function ($) {

  $('.index__subscribe').submit(function (ev) {
    ev.preventDefault();

    $(this).addClass('index__subscribe--hidden');
    $('.index__loading').addClass('index__loading--show');

    $.post('/subscribe', {
      email: $('.index__email').val()
    }, function () {
      $('.index__success').attr('class', 'index__success index__success--show');
      dataLayer.push({'event': 'newsletter:subscribe:success'});
    }).fail(function () {
      $('.index__error').attr('class', 'index__error index__error--show');
      dataLayer.push({'event': 'newsletter:subscribe:error'});
    }).always(function () {
      $('.index__loading').removeClass('index__loading--show');
    })
  });

})(jQuery);
