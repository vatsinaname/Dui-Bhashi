interface CulturalQuote {
  text: string;
  transliteration: string;
  translation: string;
  source: string;
  type: 'poem' | 'song' | 'proverb' | 'literature';
}

export const teluguQuotes: CulturalQuote[] = [
  {
    text: "మంచి మాటకు మారు మాట లేదు",
    transliteration: "Manchi maataku maaru maata ledu",
    translation: "There is no counter to a kind word",
    source: "Telugu Proverb",
    type: "proverb"
  },
  {
    text: "చదువు కొండంత... సంస్కారం విందంత",
    transliteration: "Chaduvu kondanta... samskaram vindanta",
    translation: "Education is as big as a mountain... culture is as grand as a feast",
    source: "Telugu Proverb",
    type: "proverb"
  },
  {
    text: "తెలుగు వెలుగు వెన్నెల దీవెన",
    transliteration: "Telugu velugu vennela deevena",
    translation: "Telugu is like the blessing of moonlight",
    source: "Sri Sri Poetry",
    type: "poem"
  },
  {
    text: "పల్లెటూరి పిల్లగాలి పాటపాడే వేళ",
    transliteration: "Palletoori pillagaali paataapaade vela",
    translation: "When the village breeze sings its song",
    source: "Classical Telugu Literature",
    type: "literature"
  }
];

export const kannadaQuotes: CulturalQuote[] = [
  {
    text: "ಕಲಿತರೆ ಬೆಳಕು ಕಾಣುವುದು",
    transliteration: "Kalitare belaku kaanuvudu",
    translation: "Learning brings light",
    source: "Kannada Proverb",
    type: "proverb"
  },
  {
    text: "ಹಸಿವು ಅನ್ನದ ಬೆಲೆ, ದಾಹ ನೀರಿನ ಬೆಲೆ",
    transliteration: "Hasivu annada bele, daaha neerina bele",
    translation: "Hunger knows the value of food, thirst knows the value of water",
    source: "Traditional Wisdom",
    type: "proverb"
  },
  {
    text: "ಭಾರತ ಭೂಮಿಯ ಪುಣ್ಯ ನಾಡು ಕರ್ನಾಟಕ",
    transliteration: "Bharata bhoomiya punya naadu Karnataka",
    translation: "Karnataka is the blessed land of India",
    source: "Kuvempu Poetry",
    type: "poem"
  },
  {
    text: "ಬಾನಾಡಿ ಬರುವ ಗಾಳಿ ನಮ್ಮದು",
    transliteration: "Banaadi baruva gaali nammadu",
    translation: "The wind that roams the sky is ours",
    source: "Da Ra Bendre Poetry",
    type: "literature"
  }
]; 