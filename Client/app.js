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
                <td>${JSON.stringify(data[i].director).replace(/\"/g,'')}</td>
                <td>${JSON.stringify(data[i].genre).replace(/\"/g,'')}</td>
                <td><button type='edit'>Edit</button></td>
                <td><button type='delete'>Delete</button></td></tr>`
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
                <td>${JSON.stringify(data[i].director).replace(/\"/g,'')}</td>
                <td>${JSON.stringify(data[i].genre).replace(/\"/g,'')}</td>
                <td><button type='edit'>Edit</button></td>
                <td><button type='delete'>Delete</button></td></tr>`
                );
        }
    })
})


    
    
    
    
   
})(jQuery);

//'Accept: application/json',
//Content-type: application/json'
