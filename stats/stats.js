window.onload = async function(){
    try {
        let response = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds", {method: "GET"});
        let data = await response.json();
        document.getElementById("body").style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;
    } catch(err) {
        console.log(err);
    }

    if (localStorage.getItem('lightDark')){
        if(localStorage.getItem('lightDark') == "dark") {
            document.getElementById("lightdark").textContent = "🌙";
        } else {
            document.getElementById("lightdark").textContent = "☀️";
        }
        toggle();
    }
}

function toggle() {

    if (document.getElementById("lightdark").textContent == "🌙") {

        localStorage.setItem('lightDark', 'dark');

        var elements = document.querySelectorAll(".container");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.value = "container-night";
        }

        document.getElementById("lightdark").textContent = "☀️";


    } else if (document.getElementById("lightdark").textContent == "☀️") {

        localStorage.setItem('lightDark', 'light');

        var elements = document.querySelectorAll(".container-night");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.value = "container";
        }

        document.getElementById("lightdark").textContent = "🌙";
    }
}

async function adjadastatot() {
    let nev = document.getElementById("nev").value;

    let response1 = await fetch("https://fortniteapi.io/v1/lookup?username=" + nev, {method: "GET", headers : { Authorization: "5bf91731-a9be325a-7d3e0505-a5114310" }});
    let data1 = await response1.json();

    let response = await fetch("https://fortniteapi.io/v1/stats?account=" + data1.account_id + "&&season=24", {method: "GET", headers : { Authorization: "5bf91731-a9be325a-7d3e0505-a5114310" }});
    let data = await response.json();

    document.getElementById("vagymegis").innerText = data.account.level;
}