export function display() {
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

    function appendData(heroes) {
        var mainContainer = document.getElementById("myData")
        for (var i = 0; i < heroes.length; i++) {
            var div = document.createElement("div");
            div.innerHTML = 'Name: ' + heroes[i].name;
            mainContainer.appendChild(div);
        }
    }
}

/* const api_url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json'

async const loadData = heroes => {

    var heroes = document.createElement("heroes")

    const response = await fetch(api_url);
    const heroeDescription = await response.json()

    console.log(heroeDescription)

    heroes.textContent = heroeDescription
    
    body.appendChild(heroes)
}

loadData(); */