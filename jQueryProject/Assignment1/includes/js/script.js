/*

My Custom JS
============

Author:  Brad Hussey
Updated: August 2013
Notes:	 Hand coded for Udemy.com

*/

$(function(){
	$('#search').on('click',function(){
		var title = $('#name').val();
		var resultmovies = $('#result');

		var table = $('#tableid');
		var tbody = $('#tableid tbody');
		$.ajax({
			type:'GET',
			url:'http://www.omdbapi.com/?s='+title,
			dataType: 'JSON',
			success: function(data)
			{
				if(data.Response==="False")
				{
					alert("Movie not available");
				}
				tbody.empty();
				for(var x in data.Search)
				{

				var movies = data.Search[x];
				var title = movies.Title;
				var year = movies.Year;
				var imdbID = movies.imdbID;
				var type = movies.Type;
				//var poster = $("<img>").attr("src",movies.Poster);

				var tr=$("<tr>");
				//var posterr = $("<td>").append(poster);
				var name = $("<td>").append(title);
				var yr = $("<td>").append(year);
				var id = $("<td>").append(imdbID);
				var typetr = $("<td>").append(type);
				
				tr.append('<td>'+"<img src=" +movies.Poster+" class='img-responsive'>"+'</td>');
				tr.append(name);
				tr.append(yr);
				tr.append(id);
				tr.append(typetr);
				

				tbody.append(tr);
				// resultmovies.html('Title: ' + movies.Search[0].Title + '<br/>' +
				// 	'Year:  ' + movies.Search[0].Year + '<br/>' +
				// 	'imdbID: ' + movies.Search[0].imdbID + '<br/>' +
				// 	'Type: ' + movies.Search[0].Type + '<br/>' +
				// 	'Poster:  ' + movies.Search[0].Poster);
				};
				
			}
			
		});
	});
});