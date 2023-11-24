const keyApi = "add43da3b59d43f487d15539232411";

const buttonSearch = document.querySelector(".button");

buttonSearch.addEventListener("click", async () => {
    const city = document.getElementById("input-search").value;

    if (city == "" || city == undefined) {
        alert("Digite o nome de uma cidade");
    }

    const data = await searchCityData(city);

    console.log(data);

    if (data) showDataOnScreen(data, city);
});

async function searchCityData(city) {
    //Coloca a chave da API e a cidade para pedir as informações.
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${city}&aqi=yes&lang=pt`;

    // Busca os dados atráves da API
    const response = await fetch(apiUrl);

    if (response.status !== 200) return;

    // Transforma os dados em json
    const data = await response.json();

    return data;
}

function showDataOnScreen(data, city) {
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const uv = data.current.uv;
    const temporalIcon = data.current.condition.icon;
    const day = data.current.is_day;
    const country = data.location.country;

    changeImage(day);

    document.getElementById("country").textContent = country;

    document.getElementById("city").textContent = city;

    document.getElementById("temperature").textContent = ` ${temperature} °C`;

    document.getElementById("temporal-icon").setAttribute("src", temporalIcon);

    document.getElementById("condition").textContent = condition;

    document.getElementById("humidity").textContent = `${humidity}%`;

    document.getElementById("wind-speed").textContent = `${windSpeed}km/h`;

    showUvLevel(uv);

    document.getElementById("uv").textContent = uv;
}

function changeImage(day) {
    const image1 = "/src/images/imagens/sol.jpg";
    const image2 = "/src/images/imagens/auroraBoreal.jpg";

    if (day == 1) {
        let container = document.querySelector(".container");
        container.style.backgroundImage = `url(${image1})`;
    } else {
        let container = document.querySelector(".container");
        container.style.backgroundImage = `url(${image2})`;
    }
}

function showUvLevel(uv) {
    if (uv >= 0 && uv < 3) {
        document.getElementById("uv-level").textContent = "(Baixo)";
    } else if (uv >= 3 && uv < 6) {
        document.getElementById("uv-level").textContent = "(Moderado)";
    } else if (uv >= 6 && uv < 8) {
        document.getElementById("uv-level").textContent = "(Alto)";
    } else if (uv >= 8 && uv < 11) {
        document.getElementById("uv-level").textContent = "(Muito Alto)";
    } else {
        document.getElementById("uv-level").textContent = "(Extremo)";
    }
}
