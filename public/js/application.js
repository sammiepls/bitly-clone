
$(document).ready(function(){
  $(".url-form").attr('title', 'Paste in your long URL here!');
  showHistory();
  $('#url-form').submit(function(e){
    e.preventDefault();

    $.ajax({
      url: '/urls', //this refers to the route post '/urls'
      method: 'POST',
      data: $(this).serialize(),
     success: function(data){
       not_json = JSON.parse(data);
       if(not_json.success){
         $("#heading").html("Your shortened url is:");
         $("#url-output-link").css("opacity","1");
         $("#url-output-link").html(not_json.message.short_url);
         $("#url-output-link").attr("href", not_json.message.short_url);
         $("#url-output-link").attr("target", "_blank");

         $("#history-wrapper").css("opacity","1");
         $("#error-msg").remove();
         $('#url-table tbody').append('\
           <tr>\
           <td>' + not_json.message.id +'</td>\
           <td>' + not_json.message.ori_url +'</td>\
           <td><a target="_blank" href="'+ not_json.message.short_url +'">' + not_json.message.short_url +'</a></td>\
           <td id='+ not_json.message.id +'>' + not_json.message.click_count +'</td>\
           </tr>\
         ');
         $("#url-output-wrapper").css("opacity","1");
         showHistory();


       } else {

         error = JSON.parse(data)
        $("#url-output-wrapper").css("opacity","1");
         $("#heading").html("There was an error!");
         $("#url-output-link").css("opacity","0");
         $("#url-output-wrapper").append('<p id="error-msg">' + error.message.url +'</p>');
       }
      }
      }); // end of function .ajax
    }); // end of function .submit
}); // end of function document.ready


function showHistory(){
  if ($('tbody').has("tr").length) {
    $("#history-wrapper").css("opacity","1");
  }
}

$(document).ready(function(){
  $('#url-output-link, td a').click(function(e){
    debugger
    // had to prevent the default htmls
      e.preventDefault();
    // this short_url variable gets the gibberish from the a tag
    url_link = this;
    short_url = "/" + this.innerHTML;
      $.ajax({
        url: short_url,
        method: 'GET',
        data: $(this).serialize(),
       success: function(data){
         not_json = JSON.parse(data);
        // This finds the element by id #id
         $("#" + not_json.message.id).html(not_json.message.click_count);
        //  this opens the new window with the link
         window.open(not_json.message.ori_url);
       }
    });
  });
});


// $(document).ready(function(){
//   $('td a').click(function(){
//     $(".click-count").html(function() {
//       $.ajax({
//         url: '/:short_url',
//         method: 'GET',
//         data: $(this).serialize(),
//        success: function(data){
//          not_json = JSON.parse(data);
//          window.open(not_json.message.long_url, '_blank')
//          $('click_count').append('\
//            <td class="click_count">' + not_json.message.click_count +'</td>\
//          ');
//        }
//       });
//     });
//   });
// });
// function addUrl() {
//   var tableRow = document.createElement("tr");
//   var tableDataId = document.createElement("td");
//   var tableDataOriUrl = document.createElement("td");
//   var tableDatdocumtaShortUrl = document.createElement("td");
//   var tableDataClickCount = document.createElement("td");
//   tableDataId.append(not_json.id);
//   tableDataOriUrl.append(not_json.ori_url);
//   tableDataShortUrl.append(not_json.short_url);
//   tableDataClickCount.append(not_json.click_count);
//   tableRow.append(tableDataId, tableDataOriUrl, tableDataShortUrl, tableDataClickCount);
//   $("#url-table").append(tableRow);
// }
