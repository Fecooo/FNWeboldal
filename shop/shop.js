var lekeres = 0;
var currentTabok = [];
var tabStatCurrent = {};
var nextTabok = [];
var tabStatNext = {};
var currentLejarat = [99, 99, 99]; // month, day, hour
var nextLejarat = [99, 99, 99]; // month, day, hour
var honapok = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

window.onload = async function(){
    let response = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds", {method: "GET"});
    let data = await response.json();
    console.log(data.backgrounds.backgrounds[0].backgroundimage)
    document.getElementById("body").style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;

    await tabokUpdate();
    await lejar();
    //timer();
}

async function update(){
    document.getElementById("tabok").innerHTML = "";
    await tabokUpdate();
    await lejar();
    //timer();
}

/*function timer(){
    const button = document.getElementById('countdown');
    let timeLeft = 30;
    let countdownTimer;
    
    function startTimer() {
        countdownTimer = setInterval(() => {
          if (timeLeft > 0) {
            timeLeft--;
            button.innerHTML = `Frissítés (${timeLeft}s)`;
          } else {
            clearInterval(countdownTimer);
            button.disabled = true;
            button.classList.add("disabled");
        }
        }, 1000);
      }
  
      button.disabled = true;
      button.classList.add("disabled");
      startTimer();
      
      setTimeout(() => {
          clearInterval(countdownTimer);
          button.disabled = false;
          button.classList.remove("disabled");
          button.innerHTML = "Frissítés";
          timeLeft = 30;
        }, 30000);
}*/

async function tabokUpdate() {

    const settings1  = {
        method : "GET"
    }
    
    try {
        let fetchResponse = await fetch("https://cors-anywhere.herokuapp.com/https://api.nitestats.com/v1/epic/modes-smart", settings1);
        const data = await fetchResponse.json();

        const tabok = [];
        
        for (const key in data.channels['client-events'].states[0].state.sectionStoreEnds) {
            tabok.push(key);
        }

        currentLejarat[2] = parseInt(data.channels['client-events'].states[0].state.dailyStoreEnd.split(':')[0].split('T')[1]) + 1;
        currentLejarat[1] = parseInt(data.channels['client-events'].states[0].state.dailyStoreEnd.split('T')[0].split('-')[2]);
        if(currentLejarat[2] == 0){
            currentLejarat[1]++;
        }
        currentLejarat[0] = parseInt(data.channels['client-events'].states[0].state.dailyStoreEnd.split('T')[0].split('-')[1]);

        console.log("A shop lejár: " + currentLejarat[1] + ". napon " + currentLejarat[2] + " órakor");
        document.getElementById("lejarat").innerText = "A shop lejár " + honapok[currentLejarat[0] - 1] + " " + currentLejarat[1] + ". " + currentLejarat[2] + " órakor";
        document.getElementById("jelenlegi").innerText = "Jelenlegi shop (" + tabok.length + "x):";
        
        let fetchResponse1 = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/shop-sections?lang=en", settings1);
        const data1 = await fetchResponse1.json();

        const display = [];

        for(let i = 0; i < tabok.length; i++) {
            for (const key in data1.sectionList.sections) {

                if(tabok[i] == data1.sectionList.sections[key].sectionId){

                    if(data1.sectionList.sections[key].sectionDisplayName != null  && data1.sectionList.sections[key].sectionDisplayName != ""){
                        display.push(data1.sectionList.sections[key].sectionDisplayName);
                    }
                    else {
                        let str = data1.sectionList.sections[key].sectionId;
                        if (str.match(/[0-9AB]$/)) {
                            str = str.slice(0, -1);
                        }
                        if (str.match(/[0-9AB]$/)) {
                            str = str.slice(0, -1);
                        }
                        if (str.match(/[0-9AB]$/)) {
                            str = str.slice(0, -1);
                        }

                        for (const key in data1.sectionList.sections) {
                            if(data1.sectionList.sections[key].sectionId == str){
                                display.push(data1.sectionList.sections[key].sectionDisplayName);
                            }
                        }
                    }
                }
            }
        }

        lekeres++;

        if(lekeres != 1) {
            lekeres = 1;
            currentTabok = [];
            tabStatCurrent = [];
        }

        for (let i = 0; i < display.length; i++) {
            currentTabok.push(display[i]);
        }
        
        for (let i = 0; i < currentTabok.length; i++) {
            if (currentTabok[i] in tabStatCurrent) {
                tabStatCurrent[currentTabok[i]] += 1;
            }
            else {
                tabStatCurrent[currentTabok[i]] = 1;
            }
        }
        
        for (const key in tabStatCurrent) {
            let li = document.createElement("li");
            li.innerText = key + " (" + tabStatCurrent[key] + "x)";
            document.getElementById("tabok").appendChild(li);
        }
        
        
    } catch (e) {
        console.log(e);
    }
}

async function lejar(){
    const now = new Date();
    const currentDayOfMonth = parseInt(now.getDate());
    const currentHour = parseInt(now.getHours());
    const currentMinutes = parseInt(now.getMinutes());

    if((currentLejarat[2] == 1 && (currentHour == 23 || currentHour == 0)) || ((currentHour == (currentLejarat[2] - 1)) || (currentHour == (currentLejarat[2] - 2)))){

        let ping =  setInterval(async() => {

            const settings1  = {
                method : "GET"
            }
    
            let fetchResponse = await fetch("https://cors-anywhere.herokuapp.com/https://api.nitestats.com/v1/epic/modes-smart", settings1);
            const data = await fetchResponse.json();
    
            if(data.channels['client-events'].states.length != 1) {
    
                clearInterval(ping);
    
                if(!document.getElementById("containerNext")){
                    let div = document.createElement("div");
                    div.classList.add("container");
                    div.id = "containerNext";
                    document.getElementById("container-wrapper").appendChild(div);
                }
                else{
                    document.getElementById("containerNext").innerHTML = "";
                }
    
                let h3 = document.createElement("h3");
                h3.id = "kovetkezo";
                document.getElementById("containerNext").appendChild(h3);
    
                let ul = document.createElement("ul");
                ul.id = "tabokNext";
                ul.innerHTML = "";
                document.getElementById("containerNext").appendChild(ul);
    
                let p = document.createElement("p");
                p.id = "ido";
                document.getElementById("containerNext").appendChild(p);
    
                const tabok = [];
                for (const key in data.channels['client-events'].states[1].state.sectionStoreEnds) {
                    tabok.push(key);
                }
    
                nextLejarat[2] = parseInt(data.channels['client-events'].states[1].state.dailyStoreEnd.split(':')[0].split('T')[1]) + 1;
                nextLejarat[1] = parseInt(data.channels['client-events'].states[1].state.dailyStoreEnd.split('T')[0].split('-')[2]);
                if(nextLejarat[2] == 0){
                    nextLejarat[1]++;
                }
                nextLejarat[0] = parseInt(data.channels['client-events'].states[1].state.dailyStoreEnd.split('T')[0].split('-')[1]);
    
                p.innerText = "A következő shop lejár " + honapok[nextLejarat[0] - 1] + " " + nextLejarat[1] + ". " + nextLejarat[2] + " órakor";
                h3.innerText = "Következő shop (" + tabok.length + "x):";
    
                let fetchResponse1 = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/shop-sections?lang=en", settings1);
                const data1 = await fetchResponse1.json();
        
                const display = [];
    
                for(let i = 0; i < tabok.length; i++) {
                    for (const key in data1.sectionList.sections) {
        
                        if(tabok[i] == data1.sectionList.sections[key].sectionId){
        
                            if(data1.sectionList.sections[key].sectionDisplayName != null && data1.sectionList.sections[key].sectionDisplayName != ""){
                                display.push(data1.sectionList.sections[key].sectionDisplayName);
                            }
                            else {
                                let str = data1.sectionList.sections[key].sectionId;
                                if (str.match(/[0-9AB]$/)) {
                                    str = str.slice(0, -1);
                                }
                                if (str.match(/[0-9AB]$/)) {
                                    str = str.slice(0, -1);
                                }
                                if (str.match(/[0-9AB]$/)) {
                                    str = str.slice(0, -1);
                                }
        
                                for (const key in data1.sectionList.sections) {
                                    if(data1.sectionList.sections[key].sectionId == str){
                                        display.push(data1.sectionList.sections[key].sectionDisplayName);
                                    }
                                }
                            }
                        }
                    }
                }
        
                lekeres++;
        
                if(lekeres != 1) {
                    lekeres = 1;
                    nextTabok = [];
                    tabStatNext = [];
                }
        
                for (let i = 0; i < display.length; i++) {
                    nextTabok.push(display[i]);
                }
    
                for (let i = 0; i < nextTabok.length; i++) {
                    if (nextTabok[i] in tabStatNext) {
                        tabStatNext[nextTabok[i]] += 1;
                    }
                    else {
                        tabStatNext[nextTabok[i]] = 1;
                    }
                }
                
                for (const key in tabStatNext) {
                    let li = document.createElement("li");
                    li.innerText = key + " (" + tabStatNext[key] + "x)";
                    document.getElementById("tabokNext").appendChild(li);
                }
    
                kulonbseg();
            }

        }, 15000);
        
    }
}

function kulonbseg() {
    console.log(tabStatCurrent)
    console.log(tabStatNext)

    let addedTabsSum = {};
    let removedTabsSum = {};

    for (const key in tabStatCurrent) {
        let van = false;
        for (const key1 in tabStatNext) {
            if(key == key1) {
                if (tabStatCurrent[key] > tabStatNext[key1]) {
                    removedTabsSum[key] = tabStatCurrent[key] - tabStatNext[key1];
                    van = true;
                    break;
                }
                else if (tabStatCurrent[key] < tabStatNext[key1]) {
                    addedTabsSum[key] = tabStatNext[key] - tabStatCurrent[key1];
                    van = true;
                    break;
                }
                else if (tabStatCurrent[key] == tabStatNext[key1]) {
                    van = true;
                    break;
                }
            }
        }
        if(van == false) {
            removedTabsSum[key] = tabStatCurrent[key];
        }
    }

    for (const key1 in tabStatNext) {
        let van = false;
        for (const key in tabStatCurrent) {
            if(key == key1) {
                van = true;
                break;
            }
        }
        if(van == false) {
            addedTabsSum[key1] = tabStatNext[key1];
        }
    }

    if(addedTabsSum.length != 0 || removedTabsSum.length != 0){

        if(!document.getElementById("containerKulonbseg")){
            let div = document.createElement("div");
            div.classList.add("container");
            div.id = "containerKulonbseg";
            document.getElementById("body").appendChild(div);
        }
        else {
            document.getElementById("containerKulonbseg").innerHTML = "";
        }
    }

    if(addedTabsSum.length != 0){
        
        let h3h = document.createElement("h3");
        h3h.id = "hozzaadott";
        h3h.innerText = "Hozzáadott tabok:"
        document.getElementById("containerKulonbseg").appendChild(h3h);
        
        let ulh = document.createElement("ul");
        ulh.id = "tabokHozzaadott";
        ulh.innerHTML = "";
        document.getElementById("containerKulonbseg").appendChild(ulh);

        for (const key in addedTabsSum) {
            let lih = document.createElement("li");
            lih.innerText = key + " (" + addedTabsSum[key] + "x)";
            document.getElementById("tabokHozzaadott").appendChild(lih);
        }
    }
    
    if(removedTabsSum.length != 0){

        let h3k = document.createElement("h3");
        h3k.id = "kivett";
        h3k.innerText = "Kivett tabok:"
        document.getElementById("containerKulonbseg").appendChild(h3k);

        let ulk = document.createElement("ul");
        ulk.id = "tabokKivett";
        ulk.innerHTML = "";
        document.getElementById("containerKulonbseg").appendChild(ulk);
        
        for (const key in removedTabsSum) {
            let lik = document.createElement("li");
            lik.innerText = key + " (" + removedTabsSum[key] + "x)";
            document.getElementById("tabokKivett").appendChild(lik);
        }
    }

}