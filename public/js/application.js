
$(document).ready(function(){
  $('#url-form').submit(function(e){
    e.preventDefault();
    $.ajax({
      url: '/urls', //this refers to the route post '/urls'
      method: 'POST',
      data: $(this).serialize(),
     success: function(data){
      not_json = JSON.parse(data)
      $("#heading").html("Your shortened url is:")
      $("#url-output-link").html(not_json.short_url)
      $("#url-output-link").attr("href", not_json.short_url);
      addUrl();
    }
    }); // end of function .ajax
  }); // end of function .submit
}); // end of function document.ready



function addUrl() {
  var tableRow = document.createElement("tr");
  var tableDataId = document.createElement("td");
  var tableDataOriUrl = document.createElement("td");
  var tableDatdocumtaShortUrl = document.createElement("td");
  var tableDataClickCount = document.createElement("td");
  tableDataId.append(not_json.id);
  tableDataOriUrl.append(not_json.ori_url);
  tableDataShortUrl.append(not_json.short_url);
  tableDataClickCount.append(not_json.click_count);
  tableRow.append(tableDataId, tableDataOriUrl, tableDataShortUrl, tableDataClickCount);
  $("#url-table").append(tableRow);
}



// <tbody class='table-hover'>
//   <% if @url.length != nil %>
//     <% @url.each do |x| %>
//     <tr>
//       <td><%=x.id %></td>
//       <td><%=x.ori_url %></td>
//       <td><a target="_blank" href="<%=x.short_url %>"><%=x.short_url %></a></td>
//       <td><%=x.click_count%></td>
//     </tr>
//     <% end %>
//   <% end %>
// </tbody>
//
