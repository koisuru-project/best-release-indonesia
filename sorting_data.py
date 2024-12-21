import json

file_path = 'public/data/animeRelease.json'

with open(file_path, 'r+', encoding='utf-8') as file:
    data = json.load(file)

    data.sort(key=lambda x: x['title'])

    file.seek(0)
    json.dump(data, file, indent=4, ensure_ascii=False)
    file.truncate()
