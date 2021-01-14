$(document).ready(function() {

    $('.mobile-wrap').on('click', function() {
        $('.line-burger').toggleClass('line-active');
        $('.main-header__list').slideToggle();
    });


    $(window).resize(function() {
        if( $(window).width() >= 760 ) {
            $('.main-header__list').attr('style', '');
            $('.line-burger').removeClass('line-active');
        }
        winWidth = $(window).width();
    });
    
    
    $('#open_popup').on('click', function(e) {
        e.preventDefault();
        $('header, footer, section').addClass('menu__open');
        $('.menu-overlay').addClass('menu-overlay__active');
        return false;
    });

    $('.menu-overlay__close').on('click', function() {
        $('header, footer, section').removeClass('menu__open');
        $('.menu-overlay').removeClass('menu-overlay__active');
    });

    function validate(input, length, regExp, error, phone) {

        $(input).on('blur keyup', function() {
            var value = $(this).val();
            var that = $(this);

            var error_default = $(error).html();
            var error_text = error_default;

            regExp = regExp == '' ? /./ : regExp;

            if( phone === true ) {
                bool_reg = !regExp.test(value);
                if(bool_reg) {
                    regPhoneCode = /\(050\)|\(066\)|\(095\)|\(099\)|\(039\)|\(067\)|\(068\)|\(096\)|\(097\)|\(098\)|\(063\)|\(073\)|\(091\)|\(092\)|\(094\)|\(070\)|\(080\)|\(090\)/;
                    bool_reg = regPhoneCode.test(value);

                    if(!bool_reg) {
                        error_text = $(error).data('code');
                    } else {
                        error_text = $(error).data('text');
                    }

                }
            } else {
                bool_reg = regExp.test(value);
            }

            if(value.length > length && value !== '' && bool_reg) {
                that.removeClass('form-fail').addClass('form-done');
                $(error).html(error_text).slideUp();
            } else {
                that.removeClass('form-done').addClass('form-fail');
                $(error).html(error_text).slideDown();
            }
        });

    }

    // деакцивация кнопки если есть поле с ошибкой

    function disBtn(input, btn) {
        var input = $(input);
        input.on('blur keyup', function() {

            if(input.hasClass('form-fail')) {
                $(btn).attr('disabled','disabled');
            } else {
                $(btn).removeAttr('disabled');
            }

        });
        
    }

    // для проверки при нажатии

    function valClick(input, length, regExp, error, btn, phone) {
        var value = $(input).val();

        regExp = regExp == '' ? /./ : regExp;

        if( phone === true ) {
            bool_reg = regExp.test(value);
            if(bool_reg) {
                regPhoneCode = /\(050\)|\(066\)|\(095\)|\(099\)|\(039\)|\(067\)|\(068\)|\(096\)|\(097\)|\(098\)|\(063\)|\(073\)|\(091\)|\(092\)|\(094\)|\(070\)|\(080\)|\(090\)/;
                bool_reg = regPhoneCode.test(value);
            }
        } else {
            bool_reg = !regExp.test(value);
        }

        if(value.length < length && value === '' && bool_reg) {
            $(input).addClass('form-fail');
            $(error).slideDown();
        }
    }

    //  деакцивация кнопки при нажатии

    function disBtnClick(input, btn) {
        var input = $(input);

        if(input.hasClass('form-fail')) {
            $(btn).attr('disabled','disabled');
            return false;
        } else {
            return true;
        }
        
    }

    $('input[type="tel"]').mask("+38 (999) 999-99-99");

    var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
    var regPhone = /[_]/i;
    var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
    var regNumber = /^\d+$/;
 
    // пример использования
    validate( '#c__fio', 1, regName, '.user__fail-fio');
    validate( '#c__company', 1, regName, '.user__fail-company');
    validate( '#c__country', 1, regName, '.user__fail-country');
    validate( '#c__city', 1, regName, '.user__fail-city');
    validate( '#c__telephone', 1, regPhone, '.user__fail-telephone',true);
    validate( '#c__email', 1, regEmail, '.user__fail-email');
    validate( '#c__object', 1, regNumber, '.user__fail-object');
    validate( '#c__equipment', 1, regName, '.user__fail-equipment');
    
    disBtn('#c__fio, #c__company, #c__country, #c__city, #c__telephone, #c__email, #c__object, #c__equipment ', '.user__button');

});
