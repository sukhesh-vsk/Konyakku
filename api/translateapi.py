from flask import Flask, request, jsonify
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

translator = Translator()

@app.route('/translate', methods=['POST'])
def translateapi():
    data = request.get_json()
    text_to_translate = data['text']
    source_lang = data['source_lang']
    target_lang = data['target_lang']

    translated_text = translator.translate(text_to_translate, src=source_lang, dest=target_lang)

    #print(translated_text)

    return jsonify({
                    'translated_text': translated_text.text,
                    'spell' : translated_text.pronunciation
                    })

if __name__ == '__main__':
    app.run()
