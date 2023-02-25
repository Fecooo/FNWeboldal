async function update() {
    const settings  = {
        method : "GET",
        headers: {
            Authorization : "5bf91731-a9be325a-7d3e0505-a5114310"
        }
    }
    
    try {
        let fetchResponse = await fetch("https://fortniteapi.io/v2/shop?lang=en", settings);
        const data = await fetchResponse.text();
        console.log(data)

        
    } catch (e) {
        console.log(e);
    }
}