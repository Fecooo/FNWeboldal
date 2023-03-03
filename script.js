window.onload = async function () {
  /*let response = await fetch(
    "https://cors-anywhere.herokuapp.com/https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/dynamicbackgrounds",
    { method: "GET" }
  );
  let data = await response.json();
  console.log(data.backgrounds.backgrounds[0].backgroundimage);
  document.getElementById(
    "body"
  ).style.backgroundImage = `url(${data.backgrounds.backgrounds[0].backgroundimage})`;
    */cd();
};

async function cd() {
  const start = new Date(16701408e5).getTime(),
    end = new Date(16783488e5).getTime();
  myTimer();
  const myInterval = setInterval(myTimer, 100);
  function myTimer() {
    const e = new Date().getTime(),
      t = end - e,
      n = prependZero(Math.floor(t / 864e5)),
      o = prependZero(Math.floor((t % 864e5) / 36e5)),
      r = prependZero(Math.floor((t % 36e5) / 6e4)),
      d = prependZero(Math.floor((t % 6e4) / 1e3));
    let l,
      m = ((e - start) / (end - start)) * 100;
    if (m > 100)
      return (
        (document.getElementById("countdown").style.display = "none"),
        (document.getElementById("progressBorder").style.display = "none"),
        (document.getElementById("progressBar").style.display = "none"),
        (document.getElementById("title").innerText =
          "Downtime for Season 2 has Begun!"),
        (document.getElementById("subtitle").style.display = ""),
        void clearInterval(myInterval)
      );
    (l =
      m >= 5 && m < 10
        ? m.toFixed(0)
        : m >= 10 && m < 15
        ? m.toFixed(1)
        : m >= 15 && m < 20
        ? m.toFixed(2)
        : m >= 20 && m < 25
        ? m.toFixed(2)
        : m.toFixed(2)),
      m > 5 && (document.getElementById("progressBar").innerText = l + "%"),
      (document.getElementById("progressBar").style.width = m + "%"),
      (document.getElementById("countdown").innerText =
        n + " : " + o + " : " + r + " : " + d);
  }
  function prependZero(e) {
    return e < 10 ? "0" + e : e;
  }
}
