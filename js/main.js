export function display() {
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
            document.getElementById("srch").onclick = function() {srch(data)};
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
            powerstats.innerHTML = 'Intelligence: ' + heroes[i].powerstats.intelligence + '/ Strength: ' + heroes[i].powerstats.strength + '/ Speed: ' + heroes[i].powerstats.speed + '/ Durability: ' + heroes[i].powerstats.durability + '/ Power: ' + heroes[i].powerstats.power + '/ Combat: ' + heroes[i].powerstats.combat;
            appearence.innerHTML = 'Race: ' + heroes[i].appearance.race + ' / Gender: ' + heroes[i].appearance.gender + '\n / Height: ' + heroes[i].appearance.height + ' / Weight: ' + heroes[i].appearance.weight;
            placeOfBirth.innerHTML = 'Place of Birth: ' + heroes[i].biography.placeOfBirth;
            alignment.innerHTML = heroes[i].biography.alignment;


            mainContainer.appendChild(tableau);

        }
    }
}

export function srch(heroes) {
    let research = document.getElementById("srchContent").value;
    let search = new RegExp(research);
    let finded = []
    let valid = []
    console.log(research)
    for (let i = 0; i < heroes.length; i++) {
        valid.push(false)
        for (const property in heroes[i]) {

            if (typeof heroes[i][property] == 'object') {

                for (const subproperty in heroes[i][property]) {

                    if (typeof heroes[i][property][subproperty] == 'object') {

                        for (const sublist in heroes[i][property][subproperty]) {

                            if (search.test(heroes[i][property][subproperty][sublist]) == true) {
                                valid[i] = true

                            }
                        }
                    } else {

                        if (search.test(heroes[i][property][subproperty]) == true) {
                            valid[i] = true

                        }
                    }
                }
            } else {

                if (search.test(heroes[i][property]) == true) {
                    valid[i] = true

                }
            }
        }
        if (valid[i] == true) {
            finded.push(heroes[i])
            

        }
        
    }
    console.log(finded)
}
