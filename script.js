var seasonStart = [];
var seasonEnd = [];

window.onload = async function () {

  try {
    fetch('https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));


    /*let response = await fetch("https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds",{ method: "GET" });
    let data = await response.json();
    document.getElementById("body").style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;*/
  } catch(err){
    console.log(err);
  }

  visszaszamlalo();
};

async function visszaszamlalo() {

  let fetchResponse = await fetch("https://cors-anywhere.herokuapp.com/https://api.nitestats.com/v1/epic/modes-smart", {method : "GET"});
  const data = await fetchResponse.json();

  seasonStart[0] = parseInt(data.channels['client-events'].states[0].state.seasonBegin.split('T')[0].split('-')[0]).toString();
  seasonStart[1] = parseInt(data.channels['client-events'].states[0].state.seasonBegin.split('T')[0].split('-')[1]).toString();
  seasonStart[2] = parseInt(data.channels['client-events'].states[0].state.seasonBegin.split('T')[0].split('-')[2]).toString();

  seasonEnd[0] = parseInt(data.channels['client-events'].states[0].state.seasonDisplayedEnd.split('T')[0].split('-')[0]).toString();
  seasonEnd[1] = parseInt(data.channels['client-events'].states[0].state.seasonDisplayedEnd.split('T')[0].split('-')[1]).toString();
  seasonEnd[2] = parseInt(data.channels['client-events'].states[0].state.seasonDisplayedEnd.split('T')[0].split('-')[2]).toString();

  if(parseInt(seasonStart[1]) >= 0 && parseInt(seasonStart[1]) <= 9) {
    seasonStart[1] = seasonStart[1].padStart(2, '0');
  }
  if(parseInt(seasonStart[2]) >= 0 && parseInt(seasonStart[2]) <= 9) {
    seasonStart[2] = seasonStart[2].padStart(2, '0');
  }
  if(parseInt(seasonEnd[1]) >= 0 && parseInt(seasonEnd[1]) <= 9) {
    seasonEnd[1] = seasonEnd[1].padStart(2, '0');
  }
  if(parseInt(seasonEnd[2]) >= 0 && parseInt(seasonEnd[2]) <= 9) {
    seasonEnd[2] = seasonEnd[2].padStart(2, '0');
  }

  document.getElementById("range").innerHTML = seasonStart[0] + "." + seasonStart[1] + "." + seasonStart[2] + " - " + seasonEnd[0] + "." + seasonEnd[1] + "." + seasonEnd[2];

  const targetDate = new Date(data.channels['client-events'].states[0].state.seasonDisplayedEnd).getTime();
  const startDate = new Date(data.channels['client-events'].states[0].state.seasonBegin).getTime();

  const countdownInterval = setInterval(() => {

    const now = new Date().getTime();
    const remainingTime = targetDate - now;
    const fullTime = targetDate - startDate;

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

    document.getElementById("countdown").innerText = days  + "n " + hours + "ó " + minutes + "p " + seconds + "mp";

    const szazalek = Math.round(100 - remainingTime / fullTime * 100 , 0);

    document.getElementById("progressBar").style.width = szazalek + "%";
  }, 1000);

}