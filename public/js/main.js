import { response } from "express";

$(document).on("click", ".save", function(){
  let id = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/" + id,
      data: {
          saved: true
      }
  }).then(function(data){
      console.log(data);
      location.reload();
  })
})

$(document).on("click", ".delete-one", function(){
  let id = $(this).attr("data-id");

  $.ajax({
      method: "DELETE",
      url: "/articles/" + id,
      data: {
          saved: false
      }
  }).then(function(data){
      location.reload();
  })
})


$(document).on("click", ".deleteNote", function(){
  let id = $(this).attr("data-id");

  $.ajax({
      method: "DELETE",
      url: `/api/${id}/notes`
  }).then(function(data){
      location.reload();
  })
})

$(document).on("click", ".submit", function() {
  event.preventDefault();
  let id= $(this).attr("data-id");
  let text=$("#note-" + id).val()
  console.log(text)
  $.ajax({
      method: "POST",
      url: `/api/${id}/notes`,
      data: {
          body: text
      }
  }).then(function(data) {
      console.log("worked")
      location.reload();
  })
})