var currentTabok = [];
var nextTabok = [];
var currentLejarat = [99, 99, 24]; // month, day, hour
var nextLejarat = [99, 99, 24]; // month, day, hour
var honapok = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

window.onload = () => {
    tabokUpdate();
    lejar();
    timer();
}

async function lejar(){
    const now = new Date();
    const currentDayOfMonth = now.getDate();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    if(currentLejarat[2] == 1) {
        if(currentHour = 23 || currentHour == 0){

            let div = document.createElement("div");
            div.classList.add("container");
            div.id = "containerNext";
            body.appendChild(div);

            let h3 = document.createElement("h3");
            h3.id = "kovetkezo";
            document.getElementById("containerNext").appendChild(h3);

            let ul = document.createElement("ul");
            ul.id = "tabokNext";
            document.getElementById("containerNext").appendChild(ul);

            let p = document.createElement("p");
            p.id = "ido";
            document.getElementById("containerNext").appendChild(p);

            const settings  = {
                method : "GET",
                headers: {
                    Authorization : "5bf91731-a9be325a-7d3e0505-a5114310"
                }
            }

            let fetchResponse = await fetch("https://fortniteapi.io/v2/shop?lang=en", settings);
            const data = await fetchResponse.json();

            const tabok = [];
            for (const key in data.nextRotation) {
                tabok.push(key);

                console.log(data.nextRotation[key]);
                if(data.nextRotation[key].split(':')[0].split(' ')[1] < nextLejarat[2]) {
                    nextLejarat[2] = parseInt(data.nextRotation[key].split(':')[0].split(' ')[1]) + 1;
                }
                if(data.nextRotation[key].split(' ')[0].split('-')[2] < nextLejarat[1]) {
                    nextLejarat[1] = parseInt(data.nextRotation[key].split(' ')[0].split('-')[2]);
                    if(nextLejarat[2] == 0){
                        nextLejarat[1]++;
                    }
                }
                if(data.nextRotation[key].split(' ')[0].split('-')[1] < nextLejarat[0]) {
                    nextLejarat[0] = parseInt(data.nextRotation[key].split(' ')[0].split('-')[1]);
                }
            }
            p.innerText = "A következő shop lejár " + honapok[nextLejarat[0] - 1] + " " + nextLejarat[1] + ". " + nextLejarat[2] + " órakor";
            h3.innerText = "Következő shop (" + tabok.length + "x):";

            const settings1  = {
                method : "GET"
            }

            let fetchResponse1 = await fetch("https://m10q1.wiremockapi.cloud/shoptabok", settings1);
            const data1 = await fetchResponse1.json();

            for(let i = 0; i < tabok.length; i++) {
                for (const key in data1) {
                    if(tabok[i] == key){
                        nextTabok.push(data1[key]);
                    }
                }
            }
            
            const tabStat = {};

            for (let i = 0; i < nextTabok.length; i++) {
                if (nextTabok[i] in tabStat) {
                    tabStat[nextTabok[i]] += 1;
                }
                else {
                    tabStat[nextTabok[i]] = 1;
                }
            }
            
            for (const key in tabStat) {
                let li = document.createElement("li");
                li.innerText = key + " (" + tabStat[key] + "x)";
                document.getElementById("tabokNext").appendChild(li);
            }
        }
    }

    console.log(currentDayOfMonth + " " + currentHour + " " + currentMinutes);
}

function update(){
    timer();
    
    tabokUpdate();
    lejar();
}

function timer(){
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
}

async function tabokUpdate() {
    const settings  = {
        method : "GET",
        headers: {
            Authorization : "5bf91731-a9be325a-7d3e0505-a5114310"
        }
    }
    
    const settings1  = {
        method : "GET"
    }

    try {
        let fetchResponse = await fetch("https://fortniteapi.io/v2/shop?lang=en", settings);
        const data = await fetchResponse.json();

        const tabok = [];

        for (const key in data.currentRotation) {
            tabok.push(key);

            console.log(data.currentRotation[key]);
            if(data.currentRotation[key].split(':')[0].split(' ')[1] < currentLejarat[2]) {
                currentLejarat[2] = parseInt(data.currentRotation[key].split(':')[0].split(' ')[1]) + 1;
            }
            if(data.currentRotation[key].split(' ')[0].split('-')[2] < currentLejarat[1]) {
                currentLejarat[1] = parseInt(data.currentRotation[key].split(' ')[0].split('-')[2]);
                if(currentLejarat[2] == 0){
                    currentLejarat[1]++;
                }
            }
            if(data.currentRotation[key].split(' ')[0].split('-')[1] < currentLejarat[0]) {
                currentLejarat[0] = parseInt(data.currentRotation[key].split(' ')[0].split('-')[1]);
            }
        }

        console.log("A shop lejár: " + currentLejarat[0] + ". napon " + currentLejarat[1] + " órakor");
        document.getElementById("lejarat").innerText = "A shop lejár " + honapok[currentLejarat[0] - 1] + " " + currentLejarat[1] + ". " + currentLejarat[2] + " órakor";
        document.getElementById("jelenlegi").innerText = "Jelenlegi shop (" + tabok.length + "x):";
        
        let fetchResponse1 = await fetch("https://m10q1.wiremockapi.cloud/shoptabok", settings1);
        const data1 = await fetchResponse1.json();

        for(let i = 0; i < tabok.length; i++) {
            for (const key in data1) {
                if(tabok[i] == key){
                    currentTabok.push(data1[key]);
                }
            }
        }
        
        const tabStat = {};

        for (let i = 0; i < currentTabok.length; i++) {
            if (currentTabok[i] in tabStat) {
                tabStat[currentTabok[i]] += 1;
            }
            else {
                tabStat[currentTabok[i]] = 1;
            }
        }
        
        for (const key in tabStat) {
            let li = document.createElement("li");
            li.innerText = key + " (" + tabStat[key] + "x)";
            document.getElementById("tabok").appendChild(li);
        }
        
        
    } catch (e) {
        console.log(e);
    }
}



// https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/shop-sections
/*const loadingScreen = document.querySelector('.loading-screen');
loadingScreen.style.opacity = 1;
loadingScreen.style.visibility = 'visible';*/