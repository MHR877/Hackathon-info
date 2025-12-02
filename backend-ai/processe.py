import re
import string
from deep_translator import GoogleTranslator

def normalize_arabic(text):
    text = text.lower()
    text = re.sub(r"[\u0617-\u061A\u064B-\u0652]", "", text)
    text = text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    text = text.replace("ى", "ي").replace("ئ", "ي").replace("ؤ", "و")
    text = text.replace("ة", "ه")
    return text

def normalize_arabizi(text):
    mapping = {
        "3": "a",
        "7": "h",
        "9": "q",
        "5": "kh",
        "8": "gh",
        "2": "a"
    }
    for k, v in mapping.items():
        text = text.replace(k, v)
    return text

darija_map = {
    "راك": "انت",
    "راكم": "انتم",
    "راهو": "انه",
    "علاه": "لماذا",
    "علاش": "لماذا",
    "عندك": "لديك",
    "حقا": "فعلا",
    "بزاف": "كثير",
    "واش": "ماذا",
    "شحال": "كم",
    "مليح": "جيد",
    "معليش": "لا باس",
    "نكدبو": "نكذب",
    "كذوب": "كذب",
    "ليوم": "اليوم",
    "البارح": "امس"
}

def map_darija(text):
    for k, v in darija_map.items():
        text = text.replace(k, v)
    return text

def preprocess_darija(text):
    if not isinstance(text, str):
        text = str(text)

    text = re.sub(r"\s+", " ", text).strip()

    text = normalize_arabic(text)
    text = normalize_arabizi(text)
    text = map_darija(text)

    try:
        text = GoogleTranslator(source='auto', target='en').translate(text)
    except:
        pass

    return text
