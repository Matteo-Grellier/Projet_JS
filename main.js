const api_url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json'

async function loadData() {

    const response = await fetch(api_url);
    const heroes = await response.json()

    console.log(heroes)
}

loadData();
