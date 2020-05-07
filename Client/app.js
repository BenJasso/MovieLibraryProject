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
                        <td><button id="delete" type="button" class="btn btn-outline-secondary" onclick = deleteMovie(${movieId})>Delete</button></td>
                    </tr>`
                    );
            }
        })
    
    }
    
   

   


    
})(jQuery);
//'Accept: application/json',
//Content-type: application/json'
function displayDetails(movie){
    var movie2 = movie;
    $("#my-form").html("");
    $("#movieList").html("");
    $("#movieTitle").html(JSON.stringify(movie.title).replace(/\"/g,''));
    $("#movieList").append(
        `<tr>
            <td><strong>Director:</strong> ${JSON.stringify(movie.director).replace(/\"/g,'')}</td>
        </tr>
        <tr>
            <td>Genre: ${JSON.stringify(movie.genre).replace(/\"/g,'')}</td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-primary" onclick= window.location.replace("index.html") >Go Back</button></td>
        </tr>
        <tr>
            <td><button type="button" class="btn btn-primary" onclick= editMovieDetails(${JSON.stringify(movie2.title)},${JSON.stringify(movie2.director)},${JSON.stringify(movie2.genre)})>Edit</button></td>
        </tr>`
        );         
    
}

function getDetails(id){
    $.get("https://localhost:44325/api/movie/" +id, function(data){
        var movie = data;
        displayDetails(movie);

    })

}

function editMovieDetails(title, director, genre){
    $("#movieList").html("");
    $("#movies movieTitle").html("");
    $("#next-form").append(
        `<div>
            <input type="text" name="title" placeholder="${title}" />
        </div>
        <div>
            <input type="text" name="director" placeholder="${director}" />
        </div>
        <div>
            <input type="text" name="genre" placeholder="${genre}" />
        </div>
        <button type="submit" class="btn btn-primary" onclick= updateMovie(${JSON.stringify(title)},${JSON.stringify(director)},${JSON.stringify(genre)})>Update Movie</button>`
     ); 
}
   
function updateMovie(title, director, genre){
    (function(e){
    var dict = {
        Title : title,
        Director: director,
        Genre: genre
    };

    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'put',
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
    });


}


function deleteMovie(id){
    $.ajax({
        url: 'https://localhost:44325/api/movie/' + id,
        dataType: 'json',
        type: 'Delete',
        contentType: 'application/json',
        data: id,
        success: function( data, textStatus, jQxhr ){
            //alert("Deleted");
            $("#movieList").html("");
            $.get("https://localhost:44325/api/movie", function(data){
            console.log(data)
            for(let i = 0; i < data.length; i++){
                var movieId= (data[i].movieId);
                $("#movieList").append(
                    `<tr>
                        <td>${JSON.stringify(data[i].title).replace(/\"/g,'')}</td>
                       {
                        <td><button  id =${movieId} type="button" class="btn btn-outline-info" onclick= getDetails(${movieId})>Details</button></td>
                        <td><button id="delete" type="button" class="btn btn-outline-secondary" onclick = deleteMovie(${movieId})>Delete</button></td>
                    </tr>`
                );
            }
        })
            
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    })   

    
}
