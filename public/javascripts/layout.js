$(window).load(function () {
    $('#newsletter-submit').click(function () {
        let notify = $('#newsletter-notify'),
            name = $('#newsletter-name').val(),
            phone = $('#newsletter-phone').val(),
            email = $('#newsletter-email').val();
        if (email && email.length > 0 || phone && phone.length > 0 || name && name.length > 0) {
            $.post('/send-email', { email: email, name: name, phone: phone })
                .done(() => {
                    notify.attr("class", "alert alert-success");
                    notify.text('Cảm ơn quý khách, chúng tôi sẽ liên lạc quý khách trong thời gian ngắn nhất.')
                })
                .fail(() => { notify.attr("class", "alert alert-danger"); notify.text('Đã có lỗi xảy ra trong quá trình gửi, xin vui lòng thử lại.') })
                .always(function () { setTimeout(() => { notify.attr("class", ""); notify.text(''); }, 5000); });
        }
    })
})