export function display() {
    fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            sessionStorage.setItem('datasave', data)
            document.getElementById("nuke").onclick = function () {
                document.location.reload()
                sessionStorage.clear()
            }
            document.getElementById("weight").onclick = function () {
                if (sessionStorage.getItem('isSorted') == null) {
                    data.sort(function(a, b){
                        return parseInt(a.appearance.weight[1]) - parseInt(b.appearance.weight[1]);
                    });
                    data = JSON.stringify(data)
                    sessionStorage.setItem('data', data)
                    sessionStorage.setItem("isSorted", 1)
                } else {
                    data.reverse()
                    data = JSON.stringify(data)
                    sessionStorage.setItem('data', data)
                }
            }
            document.getElementById("size").onclick = function () {
                if (sessionStorage.getItem('isSorted2') == null) {
                    data.sort(function(a, b){
                        return parseInt(a.appearance.height[1]) - parseInt(b.appearance.height[1]);
                    });
                    data = JSON.stringify(data)
                    sessionStorage.setItem('data', data)
                    sessionStorage.setItem("isSorted2", 1)
                } else {
                    data.reverse()
                    data = JSON.stringify(data)
                    sessionStorage.setItem('data', data)
                }
            }
            document.getElementById("page-nxt").onclick = function () {
                let pagelength = sessionStorage.getItem('pagelength')
                let pagenumber = sessionStorage.getItem('pagenb')
                if (pagenumber == null) {
                    pagenumber = 0
                }
                pagenumber = parseInt(pagenumber, 10) + 1
                let index = pagelength * pagenumber
                if (parseInt(pagenumber) * parseInt(pagelength) > parseInt(sessionStorage.getItem('herolength'))) {
                    pagenumber = pagenumber - 2
                } else {
                    sessionStorage.setItem('lasthero', index)
                }
                sessionStorage.setItem('pagenb', pagenumber)
            }
            document.getElementById("page-pre").onclick = function () {
                let pagelength = sessionStorage.getItem('pagelength')
                let pagenumber = sessionStorage.getItem('pagenb')
                if (pagenumber == null) {
                    pagenumber = 0
                } else if (pagenumber > 0) {
                    pagenumber = parseInt(pagenumber, 10) - 1
                    let index = parseInt(pagelength) * parseInt(pagenumber)
                    sessionStorage.setItem('lasthero', index)
                    sessionStorage.setItem('pagenb', pagenumber)
                }
            }

            // bouton qui va nous pemettre donc onclick, d'afficher 10 personnages
            document.getElementById("btn-10").onclick = function () {
                let before = sessionStorage.getItem('pagelength')
                if (before == 100) {
                    let page = sessionStorage.getItem('pagenb') * 10
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 20) {
                    let page = sessionStorage.getItem('pagenb') * 2
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 50) {
                    let page = sessionStorage.getItem('pagenb') * 5
                    sessionStorage.setItem('pagenb', page)
                }
                sessionStorage.setItem('pagelength', 10)
            }

            // bouton qui va nous pemettre donc onclick, d'afficher 20 personnages
            document.getElementById("btn-20").onclick = function () {
                let before = sessionStorage.getItem('pagelength')
                if (before == 10) {
                    let page = Math.floor(sessionStorage.getItem('pagenb') / 2)
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 100) {
                    let page = sessionStorage.getItem('pagenb') * 5
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 50) {
                    let page = sessionStorage.getItem('pagenb') * 2.5
                    sessionStorage.setItem('pagenb', page)
                }
                sessionStorage.setItem('pagelength', 20)
            }

            // bouton qui va nous pemettre donc onclick, d'afficher 50 personnages
            document.getElementById("btn-50").onclick = function () {
                let before = sessionStorage.getItem('pagelength')
                if (before == 10) {
                    let page = Math.floor(sessionStorage.getItem('pagenb') / 5)
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 20) {
                    let page = Math.floor(sessionStorage.getItem('pagenb') / 2.5)
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 100) {
                    let page = sessionStorage.getItem('pagenb') * 2
                    sessionStorage.setItem('pagenb', page)
                }
                sessionStorage.setItem('pagelength', 50)
            }

            // bouton qui va nous pemettre donc onclick, d'afficher 100 personnages
            document.getElementById("btn-100").onclick = function () {
                let before = sessionStorage.getItem('pagelength')
                if (before == 10) {
                    let page = Math.floor(sessionStorage.getItem('pagenb') / 10)
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 20) {
                    let page = Math.floor(sessionStorage.getItem('pagenb') / 5)
                    sessionStorage.setItem('pagenb', page)
                } else if (before == 50) {
                    let page = Math.floor(sessionStorage.getItem('pagenb') / 2)
                    sessionStorage.setItem('pagenb', page)
                }
                sessionStorage.setItem('pagelength', 100)
            }
            document.getElementById("reverse").onclick = function () {
                data.reverse()
                data = JSON.stringify(data)
                sessionStorage.setItem('data', data)
            }
            if (sessionStorage.getItem('data') == null) {
            } else {
                data = sessionStorage.getItem('data')
                data = JSON.parse(data)
            }
            appendData(data);
            document.getElementById("srch").onclick = function () { srch(data) };
        })

        .catch(function (err) {
            console.log('error: ' + err);
        });

    function appendData(heroes) {
        sessionStorage.setItem('herolength', heroes.length)
        var mainContainer = document.getElementById("myData")
        let limitpage = sessionStorage.getItem('pagelength')
        let lasthero = sessionStorage.getItem('lasthero')
        let page = sessionStorage.getItem('pagenb')

        // Mise en place du nombre de page par d??faut qui est de 20
        if (limitpage == null) { 
            sessionStorage.setItem('pagelength', 20)
            limitpage = 20
        }
        if (lasthero == null) {
            sessionStorage.setItem('herostart', 0)
            lasthero = 0
        }
        console.log(limitpage, lasthero, sessionStorage.getItem('pagenb'))
        let lp = parseInt(lasthero) + parseInt(limitpage)
        for (let i = lasthero; i < lp; i++) { // on va parcourir le tableau d'hero
            let tableau = document.getElementById("tab"); // on creer une variable qui va prendre pour information tout ce qui ce trouve dans l'id "tab"
            let row = tableau.insertRow(); // on creer un tableau 

            let icon = row.insertCell(); // dans ce tableau on ajoute les colonnes 
            let div = row.insertCell();
            let FullName = row.insertCell();
            let powerstats = row.insertCell();
            let race = row.insertCell();
            let gender = row.insertCell();
            let height = row.insertCell();
            let weight = row.insertCell();
            let placeOfBirth = row.insertCell();
            let alignment = row.insertCell();
            let imageName = ["background-image:url('", heroes[i].images.sm, "')"]; // on ajoute les icones des personnages dans le style de la page
            imageName = imageName.join("");
            icon.style = imageName; 


            // Dans nos colonnes du html, on va ajouter les informations du fichier api
            div.innerHTML = heroes[i].name; 
            FullName.innerHTML = heroes[i].biography.fullName;
            powerstats.innerHTML = 'Intelligence: ' + heroes[i].powerstats.intelligence + '/ Strength: ' + heroes[i].powerstats.strength + '/ Speed: ' + heroes[i].powerstats.speed + '/ Durability: ' + heroes[i].powerstats.durability + '/ Power: ' + heroes[i].powerstats.power + '/ Combat: ' + heroes[i].powerstats.combat;
            race.innerHTML = heroes[i].appearance.race;
            gender.innerHTML = heroes[i].appearance.gender;
            height.innerHTML = heroes[i].appearance.height[0] + ", " + heroes[i].appearance.height[1];
            weight.innerHTML = heroes[i].appearance.weight[0] + ", " + heroes[i].appearance.weight[1];
            placeOfBirth.innerHTML = heroes[i].biography.placeOfBirth;
            alignment.innerHTML = heroes[i].biography.alignment;
            mainContainer.appendChild(tableau); // le data va donc etre ajouter dans notre tableau 
            sessionStorage.setItem('currentindex', i)
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
    finded = JSON.stringify(finded)
    sessionStorage.setItem("data", finded)
}

/* const searchBar = document.forms['srchContent'].querySelector('input');
searchBar.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase();
  const names = list.getElementsByTagName('td');
  Array.from(names).forEach((name) => {
    const title = book.firstElementChild.textContent;
    if(title.toLowerCase().indexOf(e.target.value) != -1){
      name.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
}); */