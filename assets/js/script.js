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

let source = 'yebekhe/ConfigCollector';
$(document).on('click', '#get', function(e) {
    e.preventDefault();
    let type = $('#type').val();
    let total = $('#total').val();
    let normal = document.getElementById('normal').checked;
    document.getElementById('get').disabled = true;
    $('#get').html('درحال دریافت ...');
    $('#result').addClass('none');
    $('#result textarea').html('');
    $('#customers').addClass('none');
    $('#slider').html('');
    let config = "";
    let channel = {};
    if ( normal ) {
        let i = 0;
        jQuery.get('https://raw.githubusercontent.com/'+source+'/main/json/configs.json?v1.'+Date.now(), function(data) {
            data = JSON.parse(data);
            jQuery.each(data, function(index, item) {
                channel[item.channel.username] = {
                    title: item.channel.title,
                    username: item.channel.username,
                    logo: item.channel.logo,
                };
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
            generateCarousel(channel);
            $('#customers').removeClass('none');
        })
        .fail(function() {
            document.getElementById('get').disabled = false;
            $('#get').html('دریافت کانفیگ');
            $('#result').addClass('none');
            $('#result textarea').html('');
            $('#customers').addClass('none');
            $('#slider').html('');
        });
    }
    else {
        document.getElementById('get').disabled = false;
        $('#get').html('دریافت کانفیگ');
        type = (type === 'ss' ? 'shadowsocks' : type);
        config = 'https://raw.githubusercontent.com/'+source+'/main/sub/'+type+'_base64';
        $('#result').removeClass('none');
        $('#result textarea').html(config);
        $('#customers').addClass('none');
        $('#slider').html('');
    }
});

function generateCarousel(channel) {
    let carousel = "";
    jQuery.each(channel, function(index, item) {
        carousel += '<a href="https://t.me/'+item.username+'" title="'+item.title+'" target="_blank">';
        carousel += '<div class="slide">';
        carousel += '<img src="'+item.logo+'">';
        carousel += '<p dir="auto">'+item.title+'</p>';
        carousel += '</div>';
        carousel += '</a>';
    });
    $('#slider').html(carousel).slick('refresh');
}

window.addEventListener('load', function() {
    $('#slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 5
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});
