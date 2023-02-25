import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from math import ceil, sqrt
import datetime
import time

while True:
    t = time.localtime()
    #if time.strftime("%H:%M", t)[0:5] == "01:02":
    if "01:02" == "01:02":
        headers = {
            "Authorization": ""
            }

        response = requests.get("https://fortniteapi.io/v2/shop?lang=en", headers=headers)
        adat = response.json()

        #item_kep = []
        item_bg = []
        item_nev = []
        item_utolsoalap = []
        item_ar = []

        for i in adat['shop']:
            #item_kep.append(i['displayAssets'][0]['url'])
            if i['displayName'] == "Valkyrie" or i['displayName'] == "Chopper":
                item_bg.append(i['granted'][0]['images']['background'])
            else:
                item_bg.append(i['displayAssets'][0]['background'])
            """if i['displayDescription'] is None or i['displayDescription'] == '':
                item_leiras.append("")
            else:
                item_leiras.append(i['displayDescription'])"""
            item_nev.append(i['displayName'])
            if i['previousReleaseDate'] is None:
                item_utolsoalap.append("Új!")
            else:
                item_utolsoalap.append(i['previousReleaseDate'])
            item_ar.append(i['price']['finalPrice'])

        item_utolso = []
        for j in item_utolsoalap:
            if j != "Új!":
                madate = datetime.date.today()
                maev = madate.isoformat()[0:4]
                mahonap = madate.isoformat()[5:7]
                manap = madate.isoformat()[8:10]
                utolsodate = datetime.datetime.strptime(j, "%Y-%m-%d")
                utolsoev = utolsodate.isoformat()[0:4]
                utolsohonap = utolsodate.isoformat()[5:7]
                utolsonap = utolsodate.isoformat()[8:10]
                d0 = datetime.date(int(maev), int(mahonap), int(manap))
                d1 = datetime.date(int(utolsoev), int(utolsohonap), int(utolsonap))
                deltautolso = str(d0-d1).split(" ")[0]
                item_utolso.append(deltautolso)
            else:
                item_utolso.append("ÚJ")
        datas = []

        # region SOKSZOR KELL
        keret = Image.open("discord-bot/shop/keret_kisebb.png")
        keret = keret.convert("RGBA")
        keret = keret.resize((524, 572))
        
        vb = Image.open("discord-bot/shop/vbucks.png")
        vb = vb.convert("RGBA")
        vb = vb.resize((52, 52))

        font36 = ImageFont.truetype("D:/PY projects/fortnite-api/cosmetics/fonts/BurbankBigRegular-BlackItalic.otf", 36)
        font28 = ImageFont.truetype("D:/PY projects/fortnite-api/cosmetics/fonts/BurbankBigRegular-BlackItalic.otf", 28)
        font20 = ImageFont.truetype("D:/PY projects/fortnite-api/cosmetics/fonts/BurbankBigRegular-BlackItalic.otf", 20)
        # endregion

        for i in range(len(item_nev)):
            alap = Image.new("RGBA", (524, 572))

            """bg = requests.get(item_bg[i])
            bg = Image.open(BytesIO(bg.content))
            bg = bg.resize((524, 524))"""

            bg = Image.open(BytesIO(requests.get(item_bg[i]).content)).resize((524, 524))

            #kep = requests.get(item_kep[i])
            #kep = Image.open(BytesIO(kep.content))
            #kep = kep.resize((524, 524))

            alap.paste(bg, (0, 48))
            #alap.paste(kep, (0, 48), kep)
            alap.paste(keret, (0, 0), keret)
            alap.paste(vb, (392, 520), vb)

            nev = item_nev[i]
            draw = ImageDraw.Draw(alap)

            w_nev = draw.textlength(nev, font=font36)
            draw.text(((524 - w_nev)/2, 9), nev, "white", font36)

            if item_utolso[i] == '1':
                draw.text((5, 534), f"TEGNAP", "white", font28)
            elif item_utolso[i] != "ÚJ":
                draw.text((5, 534), f"{item_utolso[i]} napja", "white", font28)
            else:
                draw.text((5,534), "ÚJ", "white", font28)
            draw.text((447, 534), str(item_ar[i]), "white", font28)
            print(f"[EXPORT] ({i+1}/{len(item_nev)}) - {item_nev[i]} | {item_ar[i]} VBUCKS | {item_utolso[i]} napja")
            datas.append(alap)

        #datas.append(Image.open("discord-bot/botpfp.png").resize((612, 572)))
        row_n = len(datas)
        rowslen = ceil(sqrt(row_n))
        columnslen = round(sqrt(row_n))
        mode = "RGBA"
        rows = rowslen * 524
        columns = columnslen * 572
        merge = Image.new(mode, (rows, columns))
        i = 0
        for card in datas:
            merge.paste(card, ((0 + ((i % rowslen) * card.width)), (0 + ((i // rowslen) * card.height))))
            i += 1 
        merge.show()

        merge.save(f"discord-bot/shop/{str(madate)[0:10]}.png", "PNG")
        break
    else:
        print(".")
        time.sleep(1)
        print(".")
        time.sleep(1)
        print(".")
        time.sleep(1)
        print(time.strftime("%H:%M", t)[0:5])
        time.sleep(5)