window.onload = async function(){
    await kiirat();
}

async function kiirat() {
    let response = await fetch("https://fortnitecentral.genxgames.gg/api/v1/aes", {method: "GET"});
    const data = await response.json();
    
    document.getElementById("version").innerHTML = data.version
    document.getElementById("mainKey").innerHTML = data.mainKey

    pakok = data.unloaded.length
    nevek = []
    fileok = []
    highres = []
    meret = []

    for (let i = 0; i < pakok; i++) {
        nevek.push(data.unloaded[i].name.substring(8, 12))
        fileok.push(data.unloaded[i].fileCount)
        highres.push(data.unloaded[i].hasHighResTextures.toString())
        meret.push(data.unloaded[i].size.formatted)
    }

    console.log(nevek)
    console.log(fileok)
    console.log(highres)
    console.log(meret)
    let titkos = document.getElementById("titkositott")

    for (let i = 0; i < pakok; i++) {
        let tr = document.createElement("tr")
        let tdnev = document.createElement("td")
        let tdfile = document.createElement("td")
        let tdhigh = document.createElement("td")
        let tdmeret = document.createElement("td")
        tdnev.innerHTML=nevek[i]
        tdfile.innerHTML=fileok[i]
        tdhigh.innerHTML=highres[i]
        tdmeret.innerHTML=meret[i]
        tr.appendChild(tdnev)
        tr.appendChild(tdfile)
        tr.appendChild(tdhigh)
        tr.appendChild(tdmeret)
        titkos.appendChild(tr)
    }

    pakok = data.dynamicKeys.length
    nevek = []
    fileok = []
    highres = []
    meret = []

    for (let i = 0; i < pakok; i++) {
        nevek.push(data.dynamicKeys[i].name.substring(8, 12))
        fileok.push(data.dynamicKeys[i].fileCount)
        highres.push(data.dynamicKeys[i].hasHighResTextures.toString())
        meret.push(data.dynamicKeys[i].size.formatted)
    }

    console.log(nevek)
    console.log(fileok)
    console.log(highres)
    console.log(meret)
    let titkositatlan = document.getElementById("titkositatlan")

    for (let i = 0; i < pakok; i++) {
        let tr = document.createElement("tr")
        let tdnev = document.createElement("td")
        let tdfile = document.createElement("td")
        let tdhigh = document.createElement("td")
        let tdmeret = document.createElement("td")
        tdnev.innerHTML=nevek[i]
        tdfile.innerHTML=fileok[i]
        tdhigh.innerHTML=highres[i]
        tdmeret.innerHTML=meret[i]
        tr.appendChild(tdnev)
        tr.appendChild(tdfile)
        tr.appendChild(tdhigh)
        tr.appendChild(tdmeret)
        titkositatlan.appendChild(tr)
    }
}