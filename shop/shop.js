var lekeres = 0;
var currentTabok = [];
var tabStatCurrent = {};
var nextTabok = [];
var tabStatNext = {};
var currentLejarat = [99, 99, 99]; // month, day, hour
var nextLejarat = [99, 99, 99]; // month, day, hour
var honapok = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

window.onload = async function(){
    try {
        let response = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds", {method: "GET"});
        let data = await response.json();
        document.getElementById("body").style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;
    } catch(err) {
        console.log(err);
    }
    
    await tabokUpdate();
    await lejar();
    
    if (localStorage.getItem('lightDark')){
        if(localStorage.getItem('lightDark') == "dark") {
            document.getElementById("lightdark").textContent = "🌙";
        } else {
            document.getElementById("lightdark").textContent = "☀️";
        }
        document.getElementById("container-wrapper").style.visibility ="visible";
        document.getElementById("cim").style.visibility ="visible";
        toggle();
    } else {
        localStorage.setItem('lightDark', 'dark');
        document.getElementById("container-wrapper").style.visibility ="visible";
        document.getElementById("cim").style.visibility ="visible";
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

async function update(){
    document.getElementById("tabok").innerHTML = "";
    await tabokUpdate();
    await lejar();
}

async function tabokUpdate() {
    
    try {
        let fetchResponse = await fetch("https://cors-anywhere.herokuapp.com/https://api.nitestats.com/v1/epic/modes-smart", { method : "GET" });
        const data = await fetchResponse.json();
        console.log(data.channels['client-events'].states[0].state.sectionStoreEnds)
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

        const countdownInterval = setInterval(() => {

            const now = new Date().getTime();
            const targetDate = new Date(data.channels['client-events'].states[0].state.dailyStoreEnd);
            const remainingTime = targetDate - now;
      
            if (remainingTime < 0) {
              clearInterval(countdownInterval);
              document.getElementById("szov").innerText = "";
              document.getElementById("lejarat").innerText = "Életbe lépett a következő Item Shop";
            }
      
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)).toString();
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000).toString();
      
            if(hours >= 0 && hours <= 9) {
              hours = hours.padStart(2, '0');
            }
            if(minutes >= 0 && minutes <= 9) {
              minutes = minutes.padStart(2, '0');
            }
            if(seconds >= 0 && seconds <= 9) {
              seconds = seconds.padStart(2, '0');
            }
      
            document.getElementById("lejarat").innerText = hours + " ó " + minutes + " p " + seconds + " mp";
      
          }, 1000);
        console.log("A shop lejár: " + currentLejarat[1] + ". napon " + currentLejarat[2] + " órakor");
        //document.getElementById("lejarat").innerText = "A shop lejár " + honapok[currentLejarat[0] - 1] + " " + currentLejarat[1] + ". " + currentLejarat[2] + " órakor";
        document.getElementById("jelenlegi").innerText = "Jelenlegi shop (" + tabok.length + "x):";
        
        let fetchResponse1 = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/shop-sections?lang=en", { method : "GET" });
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
        
        
    } catch(err) {
        console.log(err);
    }
}

async function lejar() {
    const now = new Date();
    const currentHour = parseInt(now.getHours());
    const currentMinutes = parseInt(now.getMinutes());

    if((currentLejarat[2] == 1 && ((currentHour == 23 || currentHour == 0) || (currentHour == 22 && currentMinutes > 50))) || ((currentHour == (currentLejarat[2] - 1)) || (currentHour == (currentLejarat[2] - 2))) || ((currentHour == currentLejarat[2]) && (currentMinutes < 15))){
        ping();
    }
}

async function ping() {

    console.log("ping")

    try {

        let fetchResponse = await fetch("https://cors-anywhere.herokuapp.com/https://api.nitestats.com/v1/epic/modes-smart", { method : "GET" });
        const data = await fetchResponse.json();
    
        if(data.channels['client-events'].states.length != 1) {
    
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
    
            let le = document.createElement("p");
            le.id = "szov2";
            document.getElementById("containerNext").appendChild(le);
            
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
    
            /*const countdownInterval = setInterval(() => {

                const now1 = new Date().getTime();
                const targetDate1 = new Date(data.channels['client-events'].states[1].state.dailyStoreEnd);
                const remainingTime1 = targetDate1 - now1;
          
                if (remainingTime1 < 0) {
                  clearInterval(countdownInterval);
                  le.innerText = "";
                  p.innerText = "Életbe lépett a következő Item Shop";
                }
          
                let hours = Math.floor((remainingTime1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
                let minutes = Math.floor((remainingTime1 % (1000 * 60 * 60)) / (1000 * 60)).toString();
                let seconds = Math.floor((remainingTime1 % (1000 * 60)) / 1000).toString();
          
                if(hours >= 0 && hours <= 9) {
                  hours = hours.padStart(2, '0');
                }
                if(minutes >= 0 && minutes <= 9) {
                  minutes = minutes.padStart(2, '0');
                }
                if(seconds >= 0 && seconds <= 9) {
                  seconds = seconds.padStart(2, '0');
                }
          
                p.innerText = hours + " ó " + minutes + " p " + seconds + " mp";
          
              }, 1000);*/
            p.innerText = "A következő shop lejár " + honapok[nextLejarat[0] - 1] + " " + nextLejarat[1] + ". " + nextLejarat[2] + " órakor";
            h3.innerText = "Következő shop (" + tabok.length + "x):";
    
            let fetchResponse1 = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/shop-sections?lang=en", { method : "GET" });
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
        } else {
            setTimeout(lejar, 15000);
        }

    } catch(err) {
        console.log(err);
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

    if(Object.keys(addedTabsSum).length != 0 || Object.keys(removedTabsSum).length != 0){

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

    if(Object.keys(addedTabsSum).length != 0){
        
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
    
    if(Object.keys(removedTabsSum).length != 0){

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

    toggle();

}
