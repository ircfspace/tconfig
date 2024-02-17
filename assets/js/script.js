$(document).on('click', '#normal, #sub', function(e) {
    let normal = document.getElementById('normal').checked;
    if ( normal ) {
        $('#total').removeAttr('disabled').val('25');
    }
    else {
        $('#total').attr('disabled', 'disabled').val('all');
    }
});

$(document).on('click', '#copy', function(e) {
    let text = $('#result textarea').val();
    navigator.clipboard.writeText(text).then(() => {
        $('#copy').text('کپی شد!');
        setTimeout(function() {
            $('#copy').text('کپی کانفیگ');
        }, 2500)
    }).catch(() => {
        //
    });
});

$(document).on('change', '#type, #total', function(e) {
    e.preventDefault();
    $('#get').trigger('click');
});

let source = 'yebekhe/TelegramV2rayCollector';
$(document).on('click', '#get', function(e) {
    e.preventDefault();
    let type = $('#type').val();
    let total = $('#total').val();
    let normal = document.getElementById('normal').checked;
    document.getElementById('get').disabled = true;
    $('#get').html('درحال دریافت ...');
    let config = "";
    if ( normal ) {
        let i = 0;
        jQuery.get('https://raw.githubusercontent.com/'+source+'/main/json/configs.json?v1.'+Date.now(), function(data) {
            data = JSON.parse(data);
            jQuery.each(data, function(index, item) {
                if ( type !== 'mix' ) {
                    if ( type !== item.type ) {
                        return;
                    }
                }
                if ( total !== 'all' ) {
                    if ( total <= i ) {
                        return false;
                    }
                }
                if ( i !== 0 ) {
                    config += "\n";
                }
                config += item.config;
                i++;
            });
            document.getElementById('get').disabled = false;
            $('#get').html('دریافت کانفیگ');
            $('#result').removeClass('none');
            $('#result textarea').html(config);
        })
        .fail(function() {
            document.getElementById('get').disabled = false;
            $('#get').html('دریافت کانفیگ');
            $('#result').addClass('none');
            $('#result textarea').html('');
        });
    }
    else {
        document.getElementById('get').disabled = false;
        $('#get').html('دریافت کانفیگ');
        config = 'https://raw.githubusercontent.com/'+source+'/main/sub/'+type;
        $('#result').removeClass('none');
        $('#result textarea').html(config);
    }
});
