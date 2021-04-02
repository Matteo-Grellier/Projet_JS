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
            var div = document.createElement("div");
            div.innerHTML = 'Name: ' + heroes[i].name;
            mainContainer.appendChild(div);

            var race = document.createElement("race");
            race.innerHTML = 'Race: ' + heroes[i].appearance.race;
            mainContainer.appendChild(race);
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
