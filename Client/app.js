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

    $('#my-form').submit( processForm );
    
    $(function(){

        getMovies();
        
    })


    function getMovies(){

        $.get("https://localhost:44325/api/movie", function(data){
            console.log(data)
            for(let i = 0; i < data.length; i++){
                var movieId= (data[i].movieId);
                $("#movieList").append(
                    `<tr>
                        <td>${JSON.stringify(data[i].title).replace(/\"/g,'')}</td>
                       {
                        <td><button  id =${movieId} type="button" class="btn btn-outline-info" onclick= getDetails(${movieId})>Details</button></td>
                        <td>><button id="delete" type="button" class="btn btn-outline-secondary">Delete</button></td>
                    </tr>`
                    );
            }
        })
    
    }

   


    
})(jQuery);
//'Accept: application/json',
//Content-type: application/json'
function displayDetails(movie){
    $("#my-form").html("");
    $("#movieList").html("");
    $("#movieTitle").html(JSON.stringify(movie.title).replace(/\"/g,''));
    $("#movieList").append(
        `<tr>
            <td>Director: ${JSON.stringify(movie.director).replace(/\"/g,'')}</td>
        </tr>
        <tr>
            <td>Genre: ${JSON.stringify(movie.genre).replace(/\"/g,'')}</td>
        </tr>
        <tr>
            <td><button onclick= window.location.replace("index.html") >Go Back</button></td>
        </tr>`
        );         
    
}

function getDetails(id){
    $.get("https://localhost:44325/api/movie/" + id, function(data){
        var movie = data[0];
        displayDetails(movie);

})

}
