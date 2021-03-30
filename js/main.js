const api_url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json'

async const loadData = heroes => {
    var heroes = document.createElement("heroes")

    const response = await fetch(api_url);
    const heroeDescription = await response.json()

    console.log(heroeDescription)

    heroes.textContent = heroeDescription

    body.appendChild(heroes)
}

loadData();