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
                $("#movieList").html("");
                getMovies();
               
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
        
    }

    $('#my-form').submit( processForm);
    
    function getMovies(){

        $.get("https://localhost:44325/api/movie", function(data){
            console.log(data)
            for(let i = 0; i < data.length; i++){
                $("#movieList").append(
                    `<tr><td>${JSON.stringify(data[i].title).replace(/\"/g,'')}</td>
                    <td><button id="details" type="button" class="btn btn-outline-info">Details</button></td>
                    <td><button id="delete" type="button" class="btn btn-outline-secondary">Delete</button></tr>`
                    );
            }
        })
    }
    $(function(){
        $.get("https://localhost:44325/api/movie", function(data){
            console.log(data)
            for(let i = 0; i < data.length; i++){
                $("#movieList").append(
                    `<tr><td>${JSON.stringify(data[i].title).replace(/\"/g,'')}</td>
                    <td><button id="details" type="button" class="btn btn-outline-info">Details</button></td>
                    <td><button id="delete" type="button" class="btn btn-outline-secondary">Delete</button></tr>`
                    );
            }
        })
    $("#movieList delete").on("click", "delete", function(){
        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'delete',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    })
    function editMovie( e ){
         $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#movies Edit').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }
    $("#details").click(getMovieById);

    function getMovieById(){

        $.get("https://localhost:44325/api/movie/", function(data){
            console.log(data)
            for(let i = 0; i < data.length; i++){
                $("#movieList").append(
                    `<tr><td>${JSON.stringify(data[i].title).replace(/\"/g,'')}</td>
                    <td><button id="details" type="button" class="btn btn-outline-info">Details</button></td>
                    <td><button id="delete" type="button" class="btn btn-outline-secondary">Delete</button></tr>`
                    );
            }
        });
    }
})(jQuery);
    

   

   


    
    
    
    
   
})(jQuery);

//'Accept: application/json',
//Content-type: application/json'
