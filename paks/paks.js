var verKey = "";
var titkositatlan = [];
var titkositott = []

window.onload = async function(){

    try {
        let response = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds", {method: "GET"});
        let data = await response.json();
        document.getElementById("body").style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;
    } catch (err) {
        console.log(err);
    }

    await kiirat();
}

function toggle() {

    if (document.getElementById("lightdark").textContent == "🌙") {

        var elements = document.querySelectorAll(".container");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.value = "container-night";
        }
        elements = document.querySelectorAll(".containerN");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.value = "containerN-night";
        }

        document.getElementById("ver").style.backgroundColor = "rgba(0,0,0, 0.7)";
        document.getElementById("ver").style.border = "3px solid #fff";
        document.getElementById("ver").style.color = "#fff";
        document.getElementById("ver").style.boxShadow= "5px 5px 5px #fff";

        document.getElementById("lightdark").textContent = "☀️";


    } else if (document.getElementById("lightdark").textContent == "☀️") {

        var elements = document.querySelectorAll(".container-night");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.value = "container";
        }
        elements = document.querySelectorAll(".containerN-night");
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.value = "containerN";
        }

        document.getElementById("ver").style.backgroundColor = "rgba(255,255,255, 0.7)";
        document.getElementById("ver").style.border = "3px solid #000";
        document.getElementById("ver").style.color = "#000";
        document.getElementById("ver").style.color = "#000";
        document.getElementById("ver").style.boxShadow= "5px 5px 5px #000";

        document.getElementById("lightdark").textContent = "🌙";
    }
}

function versionKey(){
    navigator.clipboard.writeText(verKey);
    alert("Verzó kulcs kimásolva!");
}

async function kiirat() {

    document.getElementById("containerwrapper").innerHTML = "";

    try {
        let response = await fetch("https://fortnitecentral.genxgames.gg/api/v1/aes", {method: "GET"});
        const data = await response.json();
        
        document.getElementById("version").innerHTML = data.version;
        verKey = data.mainKey;
    
        for (let i = 0; i < data.unloaded.length; i++) {

            titkositott.push({
                "name" : data.unloaded[i].name.substring(8, 12),
                "files" : data.unloaded[i].fileCount,
                "highres" : data.unloaded[i].hasHighResTextures.toString(),
                "size" : data.unloaded[i].size.formatted,
                "key" : data.unloaded[i].key
            });
        }
    
        for (let i = 0; i < data.dynamicKeys.length; i++) {

            titkositatlan.push({
                "name" : data.dynamicKeys[i].name.substring(8, 12),
                "files" : data.dynamicKeys[i].fileCount,
                "highres" : data.dynamicKeys[i].hasHighResTextures.toString(),
                "size" : data.dynamicKeys[i].size.formatted,
                "key" : data.dynamicKeys[i].key
            });
        }

    } catch (err) {
        console.log(err);
    }

    console.log(titkositatlan);
    console.log(titkositott);
    
    if(Object.keys(titkositott).length != 0) {

        let tit = document.createElement("div");
        tit.id = "titkositott";

        let titcont = document.createElement("div");
        titcont.classList.add("containerN");

        let title = document.createElement("h3");
        title.innerText = "Titkosított";
        title.id = "titkositottTitle";

        titcont.appendChild(title);
        tit.appendChild(titcont);

        for (let i = 0; i < Object.keys(titkositott).length; i++) {
    
            let cont = document.createElement("div");
            cont.classList.add("container");
    
            let name = document.createElement("h3");
            name.innerText = "PAK" + titkositott[i]["name"];
            cont.appendChild(name);
            
            let table = document.createElement("table");

            let tr1 = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let files1 = document.createElement("p");
            files1.innerText = "Fájlok:";
            let files2 = document.createElement("p");
            files2.innerText = titkositott[i]["files"] + " 📁";
            td1.appendChild(files1);
            tr1.appendChild(td1);
            td2.appendChild(files2);
            tr1.appendChild(td2);
            table.appendChild(tr1);
    
            let tr2 = document.createElement("tr");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let highres1 = document.createElement("p");
            let highres2 = document.createElement("p");
            if(titkositott[i]["highres"] == "true") {
                highres1.innerText = "Nagy felbontású:";
                highres2.innerText = "Igen 🎞️";
            } else {
                highres1.innerText = "Nagy felbontású:";
                highres2.innerText = "Nem ❌";
            }
            td3.appendChild(highres1);
            td4.appendChild(highres2);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            table.appendChild(tr2);

    
            let tr3 = document.createElement("tr");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td");
            let size1 = document.createElement("p");
            let size2 = document.createElement("p");
            size1.innerText = "Méret:";
            size2.innerText = titkositott[i]["size"] + " 📏";
            td5.appendChild(size1);
            td6.appendChild(size2);
            tr3.appendChild(td5);
            tr3.appendChild(td6);
            table.appendChild(tr3);
    
            cont.appendChild(table);
            tit.appendChild(cont);
            document.getElementById("containerwrapper").appendChild(tit);
        }
    }

    if(Object.keys(titkositatlan).length != 0) {

        let tit = document.createElement("div");
        tit.id = "titkositatlan";

        let titcont = document.createElement("div");
        titcont.classList.add("containerN");

        let title = document.createElement("h3");
        title.innerText = "Titkosítatlan";
        title.id = "titkositotatlanTitle";

        titcont.appendChild(title);
        tit.appendChild(titcont);

        for (let i = 0; i < Object.keys(titkositatlan).length; i++) {
    
            let cont = document.createElement("div");
            cont.classList.add("container");
    
            let name = document.createElement("h3");
            name.innerText = "PAK" + titkositatlan[i]["name"];
            cont.appendChild(name);
            
            let table = document.createElement("table");

            let tr1 = document.createElement("tr");
            let td1 = document.createElement("td");
            let files1 = document.createElement("p");
            files1.innerText = "Fájlok:";
            td1.appendChild(files1);
            tr1.appendChild(td1);
            let td2 = document.createElement("td");
            let files2 = document.createElement("p");
            files2.innerText = titkositatlan[i]["files"] + " 📂";
            td2.appendChild(files2);
            tr1.appendChild(td2);
            table.appendChild(tr1);
    
            let tr2 = document.createElement("tr");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let highres1 = document.createElement("p");
            let highres2 = document.createElement("p");
            if(titkositatlan[i]["highres"] == "true") {
                highres1.innerText = "Nagy felbontású:";
                highres2.innerText = "Igen 🎞️";
            } else {
                highres1.innerText = "Nagy felbontású:";
                highres2.innerText = "Nem ❌";
            }
            td3.appendChild(highres1);
            td4.appendChild(highres2);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            table.appendChild(tr2);

    
            let tr3 = document.createElement("tr");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td");
            let size1 = document.createElement("p");
            let size2 = document.createElement("p");
            size1.innerText = "Méret:";
            size2.innerText = titkositatlan[i]["size"] + " 📏";
            td5.appendChild(size1);
            td6.appendChild(size2);
            tr3.appendChild(td5);
            tr3.appendChild(td6);
            table.appendChild(tr3);
    
            cont.appendChild(table);
            tit.appendChild(cont);
            document.getElementById("containerwrapper").appendChild(tit);
        }
    }


    if(Object.keys(titkositatlan).length == 0 && Object.keys(titkositott).length == 0) {
        let tit = document.createElement("div");
        tit.id = "null";

        let titcont = document.createElement("div");
        titcont.classList.add("containerN");

        let title = document.createElement("h3");
        title.innerText = "Ebben a verzióban nincsenek titkosított fileok!";
        title.id = "nullÍTitle";

        titcont.appendChild(title);
        tit.appendChild(titcont);
    }
}