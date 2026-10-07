import json, os, re, subprocess, sys, textwrap

CLIPS = [
(1,0.02,91.20,"ASET TERBESAR DI USIA 20–30","T2_01_ASET_TERBESAR_USIA_20_30.mp4"),
(2,91.20,198.90,"WAKTU & ENERGI = MODAL YANG TERBAKAR","T2_02_WAKTU_ENERGI_MODAL_TERBAKAR.mp4"),
(3,199.20,346.36,"GAJI 50 JUTA VS SKILL STACKING","T2_03_GAJI_50JT_VS_SKILL_STACKING.mp4"),
(4,346.36,498.42,"UANG CUMA OUTPUT — MESINNYA ADALAH LO","T2_04_UANG_CUMA_OUTPUT_MESINNYA_LO.mp4"),
(5,498.42,553.02,"SATU SKILL BIKIN KAYA, DUA DUNIA BIKIN BERBAHAYA","T2_05_DUA_DUNIA_BIKIN_BERBAHAYA.mp4"),
(6,553.66,694.04,"RAHASIA WARREN BUFFETT: DUA DUNIA","T2_06_RAHASIA_WARREN_BUFFETT.mp4"),
(7,696.34,803.14,"ELON MUSK & CATEGORY OF ONE","T2_07_ELON_MUSK_CATEGORY_OF_ONE.mp4"),
(8,803.14,864.22,"JANGAN CARI PASSION — BANGUN OTAK ANTI MISKIN","T2_08_OTAK_ANTI_MISKIN.mp4"),
(9,864.22,964.14,"BERUBAH BUKAN PLIN-PLAN, TAPI ADAPTIF","T2_09_BERUBAH_BUKAN_PLIN_PLAN_TAPI_ADAPTIF.mp4"),
(10,971.10,1051.36,"UANG ITU UNTUK OPTIONALITAS","T2_10_UANG_UNTUK_OPTIONALITAS.mp4"),
(11,1051.90,1200.52,"STATUS GAK ADA HABISNYA","T2_11_STATUS_GAK_ADA_HABISNYA.mp4"),
(12,1200.52,1368.30,"4 LEVEL KEKAYAAN","T2_12_4_LEVEL_KEKAYAAN.mp4"),
(13,1368.68,1506.78,"NETWORKING BUKAN KENALAN — TAPI VALUE","T2_13_NETWORKING_ADALAH_VALUE.mp4"),
(14,1507.32,1620.14,"PILIH GAME YANG COMPOUND","T2_14_PILIH_GAME_YANG_COMPOUND.mp4"),
(15,1620.14,1654.92,"1000 KONTEN, 10.000 BARIS, 1000 JAM","T2_15_1000_KONTEN_10000_BARIS_1000_JAM.mp4"),
(16,1655.32,1709.36,"JANGAN BIKIN STARTUP KARENA GENGSI","T2_16_JANGAN_STARTUP_KARENA_GENGSI.mp4"),
(17,1710.02,1757.20,"UANG ITU UNTUK BELI WAKTU","T2_17_UANG_UNTUK_BELI_WAKTU.mp4"),
(18,1757.70,1881.20,"JANGAN PANIK KALAU BELUM KAYA DI 23","T2_18_JANGAN_PANIK_BELUM_KAYA_UMUR_23.mp4"),
]
KEYS={"uang","waktu","energi","skill","reputasi","optionalitas","investasi","warren","buffett","berkshire","elon","musk","sales","marketing","copywriting","media","adaptif","ownership","networking","value","compound","startup","passion","miskin","kaya","status","mesin","1000","10000","beli","bebas"}

def esc(s):
    return s.replace("\\","\\\\").replace("{","(").replace("}",")")

def fmt(t):
    t=max(0,t); h=int(t//3600); t-=h*3600; m=int(t//60); s=t-m*60
    return f"{h}:{m:02d}:{s:05.2f}"

def deco(group):
    out=[]
    for x in group:
        raw=x["word"].strip()
        key=re.sub(r"[^0-9A-Za-zÀ-ÿ_-]","",raw).lower()
        if key in KEYS:
            out.append(r"{\c&H00D7FF&}"+esc(raw)+r"{\c&HFFFFFF&}")
        else:
            out.append(esc(raw))
    return " ".join(out).upper()

group=int(sys.argv[1])
selected=CLIPS[group*3:group*3+3]
data=json.load(open("work/transcript.json",encoding="utf-8"))
words=[w for s in data["segments"] for w in s.get("words",[]) if w.get("start") is not None and w.get("end") is not None]
os.makedirs("work/out",exist_ok=True)
os.makedirs("work/ass",exist_ok=True)

for n,start,end,title,filename in selected:
    cw=[w for w in words if w["start"]>=start-0.08 and w["end"]<=end+0.08]
    groups=[]; cur=[]
    for w in cw:
        if not cur:
            cur=[w]; continue
        gap=w["start"]-cur[-1]["end"]; dur=w["end"]-cur[0]["start"]
        if len(cur)>=4 or gap>0.48 or dur>1.75 or (re.search(r"[.!?]$",cur[-1]["word"].strip()) and len(cur)>=2):
            groups.append(cur); cur=[w]
        else:
            cur.append(w)
    if cur: groups.append(cur)

    ass=f"work/ass/{n:02d}.ass"
    with open(ass,"w",encoding="utf-8") as f:
        f.write("""[Script Info]
ScriptType: v4.00+
PlayResX: 720
PlayResY: 1280
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Sub,DejaVu Sans,58,&H00FFFFFF,&H0000D7FF,&H00000000,&H70000000,-1,0,0,0,100,100,0,0,1,5,1,2,60,60,190,1
Style: Title,DejaVu Sans,50,&H00FFFFFF,&H0000D7FF,&H00000000,&H88000000,-1,0,0,0,100,100,0,0,3,2,0,8,42,42,76,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
""")
        title_text=r"\N".join(esc(x) for x in textwrap.wrap(title,27)[:2])
        f.write(f"Dialogue: 1,{fmt(0)},{fmt(min(2.0,end-start))},Title,,0,0,0,,{title_text}\n")
        for g in groups:
            st=max(0,g[0]["start"]-start)
            en=min(end-start,max(st+0.45,g[-1]["end"]-start))
            f.write(f"Dialogue: 0,{fmt(st)},{fmt(en)},Sub,,0,0,0,,{deco(g)}\n")

    vf=f"crop=608:1080:500:0,scale=720:1280:flags=lanczos,ass='{ass}'"
    dur=end-start
    out=f"work/out/{filename}"
    subprocess.run([
        "ffmpeg","-y","-hide_banner","-loglevel","warning",
        "-ss",f"{start:.2f}","-i","work/timothy2.mp4","-t",f"{dur:.2f}",
        "-vf",vf,
        "-c:v","libx264","-preset","veryfast","-crf","20","-maxrate","4M","-bufsize","8M",
        "-pix_fmt","yuv420p","-r","24",
        "-c:a","aac","-b:a","128k","-ar","44100",
        "-movflags","+faststart",out
    ],check=True)
