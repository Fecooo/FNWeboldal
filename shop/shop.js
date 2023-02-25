window.onload = () => {
    //tabokUpdate();
    //timer();
}

function update(){
    document.getElementById("tabok").innerHTML = '';
    
    timer();
    
    tabokUpdate();
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
          }
        }, 1000);
      }
  
      button.disabled = true;
      startTimer();
      
      setTimeout(() => {
          clearInterval(countdownTimer);
          button.disabled = false;
          button.innerHTML = "Frissítés (30s)";
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
        }
        
        let fetchResponse1 = await fetch("https://m10q1.wiremockapi.cloud/shoptabok", settings1);
        const data1 = await fetchResponse1.json();

        const tabokVegleges = [];

        for(let i = 0; i < tabok.length; i++) {
            for (const key in data1) {
                if(tabok[i] == key){
                    tabokVegleges.push(data1[key]);
                }
            }
        }
        
        const tabStat = {}

        for (let i = 0; i < tabokVegleges.length; i++) {
            if (tabokVegleges[i] in tabStat) {
                tabStat[tabokVegleges[i]] += 1
            }
            else {
                tabStat[tabokVegleges[i]] = 1
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