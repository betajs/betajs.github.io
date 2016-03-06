$(document).ready(function () {

    if ($('ul.guide_sidebar li').hasClass('active')) {
        $('ul.guide_sidebar li.active ul').slideDown();
    }
    $(document).on('click', 'ul.guide_sidebar li > a.has-dropdown', function () {
//alert('s');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent('li').removeClass('active');
            $(this).parent('li').children('ul').slideUp();
        } else {
            $(this).addClass('active');
            $(this).parent('li').addClass('active');
            $(this).parent('li').children('ul').slideDown();
        }


    });
});

$( "pre" ).each( function () {
    var $this = $( this );

    var example = $this.find( "code" );
    exampleText = example.html();
    var lang = /{@lang (.*?)}/.exec( exampleText );
    if ( lang && lang[1] ) {
        exampleText = exampleText.replace( lang[0], "" );
        example.html( exampleText );
        lang = lang[1];
    } else {
        lang = "javascript";
    }

    if ( lang ) {

        $this
        .addClass( "sunlight-highlight-" + lang )
        .addClass( "linenums" )
        .html( example.html() );

    }
} );
Sunlight.highlightAll( {lineNumbers : true});
