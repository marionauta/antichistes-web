var id;
var recuentos = 0;
var p = 0;
var version = '1.4.5';
var urlbase = 'http://get.eldiaque.tk/antichistes/api.php?version=' + version;

function ocultarExcepto(sec) {
	$('.main').hide();
	$(sec).show();
}
function parametro() {
    return Math.floor(Math.random()*100000);
}

function aleatorio() {
	ocultarExcepto('#aleatorio');
    $('.opt, #an').hide();
    $('#ap').text('...');
    $.getJSON(urlbase, {method: 'aleatorio', pp: parametro()},
        function(data) {
            if (data.error != 0) {
                $('#ap').text(data.message);
            } else {
                $('#ap').text(data.uno);
                $('#an').text(data.dos);
                $('.see').show();
                id = data.cero;
                recuentos += 1;
            }
        }
    );
}

function ultimos() {
    p += 1;
    $('#ultibot').removeClass('more').text('...').show();
    $.getJSON(urlbase, {method: 'ultimos', p:p, pp:parametro()},
        function(data) {
            if (data.error != 0) {
                $('.more').removeClass('more').text(data.message).show();
            } else {
                $.each(data.cola, function(i, value) {
                    var insert = '<div class="cont see"><div class="parece">'+ value.uno + '</div><div class="noes">' + value.dos +'</div></div>';
                    $('#list').append(insert);
                    $('#ultibot').addClass('more').text('Cargar más');
                });
            }
        }
    );
}

$(function() { // cuando document ready (jQuery)
	FastClick.attach(document.body);
    console.log('AntiChistes v' + version);

    /* Sólo cambiar de sección si no está activa */
    $('nav div').click(function() {
        if (!$(this).hasClass('visto')) {
            $('nav div').removeClass('visto');
            $(this).addClass('visto');

            if ($(this).hasClass('aleatorio')) { aleatorio() }
			else if ($(this).hasClass('enviar')) { alert('Not implemented') }
            else if ($(this).hasClass('ultimos')) {
                if (p === 0) { ultimos() } // Llamar a la función si nunca se ha llamado antes.

                ocultarExcepto('#ultimos');
                $('#ultibot').show();
            	window.scroll(0, document.body.scrollHeight);
            }
        }
    });

    $(document).on('click', '.see', function() {
        /* Si está en últimos */
        if ($(this).children('.noes').text()) {
            $(this).children('.noes').slideDown(200);
            $(this).removeClass('see').addClass('send');

        /* Si está en aleatorio */
        } else {
            $('#an').slideDown(200);
            $('.opt').show();
            $(this).hide();

        }
    });
    $(document).on('click', '.send', function() {
        /* Si está en últimos */
        if ($(this).children('.parece').text()) {
            var texto = $(this).children('.parece').text() + ' ' + $(this).children('.noes').text();

        /* Si está en aleatorio */
        } else {
            var texto = $('#ap').text() +' '+ $('#an').text();

        }
        console.log('Compartido: ' + texto);
		Android.sendShare(texto + ' http://antichistes.ga')
    });
    $('.otro').click(function() { aleatorio() } );
    $('.more').click(function() { ultimos() });
    $('.vote').click(function() {
        console.log('Gustado: ' + id);
        $.get(urlbase, {method:'plusone', id:id});
        $(this).slideUp();
    });
});
