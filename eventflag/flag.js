window.onload = async function(){
    let response = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds", {method: "GET"});
    let data = await response.json();
    console.log(data.backgrounds.backgrounds[0].backgroundimage)
    document.getElementById("body").style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;

    await kiirat();
}

async function kiirat() {
    let response = await fetch("https://cors-anywhere.herokuapp.com/https://api.nitestats.com/v1/epic/modes-smart", {method: "GET"});
    const data = await response.json();
    
    let statesLen = data.channels['client-events'].states.length
    console.log(data.channels['client-events'].states[statesLen-1].state.activeEvents)

    flags = data.channels['client-events'].states[statesLen-1].state.activeEvents.length
    nev = []
    kezdet = []
    veg = []

    for (let i = 0; i < flags; i++) {
        nev.push(data.channels['client-events'].states[statesLen-1].state.activeEvents[i].devName)
        kezdet.push(data.channels['client-events'].states[statesLen-1].state.activeEvents[i].eventStart.replace("T", ". ").replace("Z", " ").replace("-", ".").replace("-", "."))
        veg.push(data.channels['client-events'].states[statesLen-1].state.activeEvents[i].eventEnd.replace("T", ". ").replace("Z", " ").replace("-", ".").replace("-", "."))
    }

    console.log(nev)
    console.log(kezdet)
    console.log(veg)
    let tablazat = document.getElementById("eventFlags")

    for (let i = 0; i < flags; i++) {
        let tr = document.createElement("tr")
        let tdnev = document.createElement("td")
        let tdkezdet = document.createElement("td")
        let tdveg = document.createElement("td")
        tdnev.innerHTML=nev[i]
        tdkezdet.innerHTML=kezdet[i]
        tdveg.innerHTML=veg[i]
        tr.appendChild(tdnev)
        tr.appendChild(tdkezdet)
        tr.appendChild(tdveg)
        tablazat.appendChild(tr)
    }
}