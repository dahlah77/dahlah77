from faster_whisper import WhisperModel
import json

prompt = """Bahasa Indonesia santai. Topik: waktu, energi, skill stacking, reputasi, kesempatan, uang, optionalitas, investasi, Warren Buffett, Berkshire Hathaway, Elon Musk, sales, marketing, copywriting, media, category of one, adaptif, ownership, networking, value, compound, startup, passion."""
model = WhisperModel("small", device="cpu", compute_type="int8")
segments, info = model.transcribe(
    "work/timothy2.mp4",
    language="id",
    beam_size=5,
    vad_filter=True,
    word_timestamps=True,
    initial_prompt=prompt,
    condition_on_previous_text=True,
)
data = {"language": info.language, "segments": []}
for i, s in enumerate(segments, 1):
    data["segments"].append({
        "id": i,
        "start": s.start,
        "end": s.end,
        "text": s.text.strip(),
        "words": [
            {"start": w.start, "end": w.end, "word": w.word, "probability": w.probability}
            for w in (s.words or [])
        ],
    })
with open("work/transcript.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
