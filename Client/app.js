(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
    
    $(function(){

        $.get("https://localhost:44325/api/movie", function(data){
            console.log(data)
    
            for(let i = 0; i < data.length; i++){
                $("#movies").append(
                    `<tr><td>${JSON.stringify(data[i].title)}</td>
                    <td>${JSON.stringify(data[i].director)}</td>
                    <td>${JSON.stringify(data[i].genre)}</td></tr>`
                    );
            }
        })
    })
    function manualRefresh(){
        window.location.reload();
    }
})(jQuery);


//'Accept: application/json',
//Content-type: application/json'
