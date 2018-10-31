document.addEventListener("DOMContentLoaded", function() {

    var results_btn = document.querySelector('#get_results_btn');
    var br = document.createElement("br");
    var hr = document.createElement("hr");
    results_btn.addEventListener('click', function(){

        var placeholder = axios({
            url: 'https://bb-election-api.herokuapp.com/',
            method: 'get',
            dataType: 'json',
        });

        placeholder
            .then(function(response){
                var outputUl = document.createElement('ul');
                // outputUl.id = 'elections_ul';
                response.data.candidates.forEach(function(candidate){
                    var outputName = document.createElement('h3');
                    var outputVotes = document.createElement('h4');
                    var outputLi = document.createElement('li');
                    var br = document.createElement("br");
                    var hr = document.createElement("hr");
                    outputName.innerHTML = "Name: " + candidate.name;
                    outputVotes.innerHTML = "Votes: " + candidate.votes;
                    outputLi.appendChild(hr);
                    outputLi.appendChild(outputName);
                    outputLi.appendChild(outputVotes);
                    outputLi.appendChild(hr);                    
                    outputUl.appendChild(outputLi);
                    document.body.appendChild(outputUl);
                });

            });

    });

});
