$(document).ready(function(){


    $('.fancybox').fancybox();

    $('.form_class form').validate();

    $('.form_class form').ajaxForm(
        function() {
            $("#tnx").fancybox({
                beforeShow : function(){
                    $(".fancybox-skin").addClass("form_reset");
                }
            }).trigger('click');
        });

    $('input[name="phone"]').mask("+7 (999) 999-99-99");

})