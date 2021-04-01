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

            var race = document.createElement("race");
            race.innerHTML = 'Race: ' + heroes[i].appearance.race;
            mainContainer.appendChild(race);

            var powerStats = document.createElement("powerStats");
            powerStats.innerHTML = 'PowerStats: ' + heroes[i].powerStats;
            mainContainer.appendChild(powerStats);
            
            
        }
    }

}




