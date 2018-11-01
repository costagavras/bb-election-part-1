document.addEventListener("DOMContentLoaded", function() {
    // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    var results_btn = document.querySelector('#get_results_btn');
    var refresh_btn = document.querySelector('#refresh_btn');
    var br = document.createElement("br");
    var hr = document.createElement("hr");

      refresh_btn.addEventListener('click', function(){

          var update_results = axios({
              url: 'https://bb-election-api.herokuapp.com/',
              method: 'GET',
              dataType: 'json',
          });

            update_results
                .then(function(response){
                    var outputVotes = document.querySelectorAll('.li_votes');
                    var voteButtons = document.querySelectorAll('.vote_btn');
                    for (var i = 0; i < response.data.candidates.length; i++) {
                          outputVotes[i].innerHTML = "";
                          outputVotes[i].innerHTML = "Votes: " + response.data.candidates[i].votes;
                          voteButtons[i].disabled = false;
                    };

                });
      });



      results_btn.addEventListener('click', function(){

          var get_results = axios({
              url: 'https://bb-election-api.herokuapp.com/',
              method: 'GET',
              dataType: 'json',
        });

        get_results
            .then(function(response){
                var outputUl = document.createElement('ul');
                // outputUl.id = 'elections_ul';
                response.data.candidates.forEach(function(candidate){
                    var outputName = document.createElement('h3');
                    outputName.classList = 'li_name';
                    var outputVotes = document.createElement('h4');
                    outputVotes.classList = 'li_votes';
                    var outputLi = document.createElement('li');
                    var form = document.createElement('form');
                    var btn = document.createElement('input');
                    btn.setAttribute('type', 'submit');
                    form.setAttribute('method', 'POST');
                    // form.setAttribute('enctype', 'multipart/form-data');
                    form.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote');
                    btn.value = 'Submit vote';
                    btn.classList = 'vote_btn';
                    var hidden_field = document.createElement('input');
                    hidden_field.setAttribute('type', 'hidden');
                    hidden_field.setAttribute("name", "name");
                    hidden_field.setAttribute("value", candidate.name);

                    form.addEventListener('submit',function(e){
                      e.preventDefault();
                        var vote = axios({
                          url: form.getAttribute('action'),
                          method: form.getAttribute('method'),
                          data: {"name" : candidate.name},
                        });
                    btn.disabled = true;
                    });

                    var br = document.createElement("br");
                    var hr = document.createElement("hr");
                    outputName.innerHTML = "Name: " + candidate.name;
                    outputVotes.innerHTML = "Votes: " + candidate.votes;
                    outputLi.appendChild(hr);
                    outputLi.appendChild(outputName);
                    outputLi.appendChild(outputVotes);
                    outputLi.appendChild(form);
                    form.appendChild(btn);
                    form.appendChild(hidden_field);
                    outputLi.appendChild(hr);
                    outputUl.appendChild(outputLi);
                    document.body.appendChild(outputUl);
                });
            })
            .catch(function(response){
                console.log("The request didn't pass due to an error!");
            });
    });

});
