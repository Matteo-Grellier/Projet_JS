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
            
            var tableau = document.getElementById("tab");
            var row = tableau.insertRow();

            var icon = row.insertCell(); 
            var div = row.insertCell();
            var FullName = row.insertCell();
            var powerstats = row.insertCell();
            var appearence = row.insertCell();
            var placeOfBirth = row.insertCell();
            var alignment = row.insertCell();

            var imageName = ["background-image:url('", heroes[i].images.sm, "')"];
            imageName = imageName.join("");
            icon.style = imageName;

            div.innerHTML = 'Name: ' + heroes[i].name;
            FullName.innerHTML = 'Full Name: ' + heroes[i].biography.fullName;
            powerstats.innerHTML = 'Powerstats: ' + heroes[i].powerstats;
            appearence.innerHTML = 'Race: ' + heroes[i].appearance.race + ' / Gender: ' + heroes[i].appearance.gender + '\n / Height: ' + heroes[i].appearance.height + ' / Weight: ' + heroes[i].appearance.weight;
            placeOfBirth.innerHTML = 'Place of Birth: ' + heroes[i].biography.placeOfBirth;
            alignment.innerHTML = heroes[i].biography.alignment;


            mainContainer.appendChild(tableau);

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