$(document).ready(function(){
  submitForm();
})

function submitForm() {
  $('form').submit(function(event){
    event.preventDefault();
    var token=$('#txtToken').val();
    var description=$('#txtDescription').val();
    var fileName=$('#txtFileName').val();
    var content=$('#txtContent').val();
    createGist(token,description,fileName,content);
  })

}


function createGist(token,description,fileName,content) {
  var url="https://api.github.com/gists"
  var data={
  "description": description,
  "public": true,
  "files": {

  }
}
data["files"][fileName]={
  "content": content
}
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(response){
      $('#result').html(`<a href='${response.html_url}'>${response.description}</a>`)
    },
    headers: {
      Authorization: "token "+token
    }
  })
}
