var ld = "";

window.onload = async function(){
  
  try{
    let response = await fetch("https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds", {method: "GET"});
    let data = await response.json();
    document.getElementById("body").style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;
  } catch(err) {
    console.log(err);
  }
  
  await kiirat();

  if (localStorage.getItem('lightDark')){
    ld = localStorage.getItem('lightDark');
  } else {
    localStorage.setItem('lightDark', 'dark');
    ld = "light";
  }
  if(localStorage.getItem('lightDark') == "dark") {
    document.getElementById("lightdark").textContent = "🌙";
  } else {
    document.getElementById("lightdark").textContent = "☀️";
  }
  document.getElementById("cim").style.visibility ="visible";
  toggle();
}

async function toggle() {
  if (document.getElementById("lightdark").textContent == "🌙") {

      localStorage.setItem('lightDark', 'dark');

      var elements = document.querySelectorAll(".container");
      for (var i = 0; i < elements.length; i++) {
          elements[i].classList.value = "container-night";
      }

      document.getElementById("lightdark").textContent = "☀️";
      ld = "dark";
      document.getElementById("progressBorder").style.border = "5px solid white";

  } else if (document.getElementById("lightdark").textContent == "☀️") {

      localStorage.setItem('lightDark', 'light');

      var elements = document.querySelectorAll(".container-night");
      for (var i = 0; i < elements.length; i++) {
          elements[i].classList.value = "container";
      }

      document.getElementById("lightdark").textContent = "🌙";
      ld = "light";
      document.getElementById("progressBorder").style.border = "5px solid black";
  }
}

async function kiirat() {

    try {
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
            kezdet.push(data.channels['client-events'].states[statesLen-1].state.activeEvents[i].eventStart)
            veg.push(data.channels['client-events'].states[statesLen-1].state.activeEvents[i].eventEnd)
        }
    } catch(err) {
        console.log(err);
    }

    console.log(nev)
    console.log(kezdet)
    console.log(veg)

    const countdownInterval = setInterval(() => {
        document.getElementById("cont").innerHTML = "";
        for (let i = 0; i < flags; i++) {
    
            let cont = document.createElement("div");
            if(ld == "light"){
              cont.classList.add("container");
            } else {
              cont.classList.add("container-night");
            }
    
            let h2 = document.createElement("h2");
            h2.innerHTML=nev[i];
            cont.appendChild(h2);
    
            let progBorder = document.createElement("div");
            progBorder.classList.add("progressBorder");
            progBorder.id = "progressBorder";
            if(ld == "light"){
              progBorder.style.border = "5px solid black";
            } else {
              progBorder.style.border = "5px solid white";
            }
            let progBar = document.createElement("div");
            progBar.classList.add("progressBar");
    
    
            let countdown = document.createElement("p");
            const now = new Date().getTime();
            const remainingTime = new Date(veg[i]).getTime() - now;
            const fullTime = new Date(veg[i]).getTime() - new Date(kezdet[i]).getTime();
            if (remainingTime < 0) {
                clearInterval(countdownInterval);
                return;
              }
            let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)).toString();
            let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)).toString();
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000).toString();
            if(days >= 0 && days <= 9) {
                days = days.padStart(2, '0');
              }
              if(hours >= 0 && hours <= 9) {
                hours = hours.padStart(2, '0');
              }
              if(minutes >= 0 && minutes <= 9) {
                minutes = minutes.padStart(2, '0');
              }
              if(seconds >= 0 && seconds <= 9) {
                seconds = seconds.padStart(2, '0');
              }
            countdown.innerText = days  + "n " + hours + "ó " + minutes + "p " + seconds + "mp";
            const szazalek = Math.round(100 - remainingTime / fullTime * 100 , 0);
            progBar.style.width = szazalek + "%";
            let range = document.createElement("p");
            range.innerHTML = kezdet[i].replace("T", ". ").replace("Z", " ").replace("-", ".").replace("-", ".") + " - " + veg[i].replace("T", ". ").replace("Z", " ").replace("-", ".").replace("-", ".");
            
            progBorder.appendChild(progBar);
            cont.appendChild(progBorder);
            cont.appendChild(countdown);
            cont.appendChild(range);
            
            document.getElementById("cont").appendChild(cont);
        }
        setTimeout(1000);
    }, 0);
}
