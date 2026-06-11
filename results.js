// Fyll i liveresultat eller slutresultat här.
// Lämna tom sträng om matchen inte är spelad än.
// Exempel:
// 1: "2-1",

const MATCH_RESULTS = {
  // 11-jun | Grupp A | Mexiko - Sydafrika
  1: "3-1",
  // 12-jun | Grupp A | Sydkorea - Czechia
  2: "1-1",
  // 12-jun | Grupp B | Kanada - Bosnien-Herzigovina
  3: "",
  // 13-jun | Grupp D | USA - Paraguay
  4: "",
  // 14-jun | Grupp C | Haiti - Skottland
  5: "",
  // 14-jun | Grupp D | Australien - Turkiet
  6: "",
  // 14-jun | Grupp C | Brasilien - Marocko
  7: "",
  // 13-jun | Grupp B | Qatar - Schweiz
  8: "",
  // 15-jun | Grupp E | Elfenbenskusten - Ecuador
  9: "",
  // 14-jun | Grupp E | Tyskland - Curaçao
  10: "",
  // 14-jun | Grupp F | Nederländerna - Japan
  11: "",
  // 15-jun | Grupp F | Sverige - Tunisien
  12: "",
  // 16-jun | Grupp H | Saudiarabien - Uruguay
  13: "",
  // 15-jun | Grupp H | Spanien - Kap Verde
  14: "",
  // 16-jun | Grupp G | Iran - Nya Zeeland
  15: "",
  // 15-jun | Grupp G | Belgien - Egypten
  16: "",
  // 16-jun | Grupp I | Frankrike - Senegal
  17: "",
  // 17-jun | Grupp I | Irak - Norge
  18: "",
  // 17-jun | Grupp J | Argentina - Algeriet
  19: "",
  // 17-jun | Grupp J | Österrike - Jordanien
  20: "",
  // 18-jun | Grupp L | Ghana - Panama
  21: "",
  // 17-jun | Grupp L | England - Kroatien
  22: "",
  // 17-jun | Grupp K | Portugal - Kongo
  23: "",
  // 18-jun | Grupp K | Uzbekistan - Colombia
  24: "",
  // 18-jun | Grupp A | Czechia - Sydafrika
  25: "",
  // 18-jun | Grupp B | Schweiz - Bosnien-Herzigovina
  26: "",
  // 19-jun | Grupp B | Kanada - Qatar
  27: "",
  // 19-jun | Grupp A | Mexiko - Sydkorea
  28: "",
  // 20-jun | Grupp C | Brasilien - Haiti
  29: "",
  // 20-jun | Grupp C | Skottland - Marocko
  30: "",
  // 20-jun | Grupp D | Turkiet - Paraguay
  31: "",
  // 19-jun | Grupp D | USA - Australien
  32: "",
  // 20-jun | Grupp E | Tyskland - Elfenbenskusten
  33: "",
  // 21-jun | Grupp E | Ecuador - Curaçao
  34: "",
  // 20-jun | Grupp F | Nederländerna - Sverige
  35: "",
  // 21-jun | Grupp F | Tunisien - Japan
  36: "",
  // 22-jun | Grupp H | Uruguay - Kap Verde
  37: "",
  // 21-jun | Grupp H | Spanien - Saudiarabien
  38: "",
  // 21-jun | Grupp G | Belgien - Iran
  39: "",
  // 22-jun | Grupp G | Nya Zeeland - Egypten
  40: "",
  // 23-jun | Grupp I | Norge - Senegal
  41: "",
  // 22-jun | Grupp I | Frankrike - Irak
  42: "",
  // 22-jun | Grupp J | Argentina - Österrike
  43: "",
  // 23-jun | Grupp J | Jordanien - Algeriet
  44: "",
  // 23-jun | Grupp L | England - Ghana
  45: "",
  // 24-jun | Grupp L | Panama - Kroatien
  46: "",
  // 23-jun | Grupp K | Portugal - Uzbekistan
  47: "",
  // 24-jun | Grupp K | Colombia - Kongo
  48: "",
  // 25-jun | Grupp C | Skottland - Brasilien
  49: "",
  // 25-jun | Grupp C | Marocko - Haiti
  50: "",
  // 24-jun | Grupp B | Schweiz - Kanada
  51: "",
  // 24-jun | Grupp B | Bosnien-Herzigovina - Qatar
  52: "",
  // 25-jun | Grupp A | Czechia - Mexiko
  53: "",
  // 25-jun | Grupp A | Sydafrika - Sydkorea
  54: "",
  // 25-jun | Grupp E | Curaçao - Elfenbenskusten
  55: "",
  // 25-jun | Grupp E | Ecuador - Tyskland
  56: "",
  // 26-jun | Grupp F | Japan - Sverige
  57: "",
  // 26-jun | Grupp F | Tunisien - Nederländerna
  58: "",
  // 26-jun | Grupp D | Turkiet - USA
  59: "",
  // 26-jun | Grupp D | Paraguay - Australien
  60: "",
  // 26-jun | Grupp I | Norge - Frankrike
  61: "",
  // 26-jun | Grupp I | Senegal - Irak
  62: "",
  // 27-jun | Grupp G | Egypten - Iran
  63: "",
  // 27-jun | Grupp G | Nya Zeeland - Belgien
  64: "",
  // 27-jun | Grupp H | Kap Verde - Saudiarabien
  65: "",
  // 27-jun | Grupp H | Uruguay - Spanien
  66: "",
  // 27-jun | Grupp L | Panama - England
  67: "",
  // 27-jun | Grupp L | Kroatien - Ghana
  68: "",
  // 28-jun | Grupp J | Algeriet - Österrike
  69: "",
  // 28-jun | Grupp J | Jordanien - Argentina
  70: "",
  // 28-jun | Grupp K | Colombia - Portugal
  71: "",
  // 28-jun | Grupp K | Kongo - Uzbekistan
  72: "",
  // 28-jun | Grupp L | Sydkorea - Kanada
  73: "",
  // 29-jun | Grupp L | Tyskland - Paraguay
  74: "",
  // 30-jun | Grupp L | Nederländerna - Skottland
  75: "",
  // 29-jun | Grupp L | Brasilien - Japan
  76: "",
  // 30-jun | Grupp L | Frankrike - Sverige
  77: "",
  // 30-jun | Grupp L | Elfenbenskusten - Norge
  78: "",
  // 01-jul | Grupp L | Mexiko - Marocko
  79: "",
  // 01-jul | Grupp L | Kroatien - Ecuador
  80: "",
  // 02-jul | Grupp L | Turkiet - Bosnien-Herzigovina
  81: "",
  // 01-jul | Grupp L | Belgien - Czechia
  82: "",
  // 03-jul | Grupp L | Colombia - England
  83: "",
  // 02-jul | Grupp L | Spanien - Argentina
  84: "",
  // 03-jul | Grupp L | Schweiz - Iran
  85: "",
  // 04-jul | Grupp L | Österrike - Uruguay
  86: "",
  // 04-jul | Grupp L | Portugal - Ghana
  87: "",
  // 03-jul | Grupp L | USA - Egypten
  88: "",
  // 04-jul | Grupp L | Tyskland - Frankrike
  89: "",
  // 04-jul | Grupp L | Sydkorea - Nederländerna
  90: "",
  // 05-jul | Grupp L | Brasilien - Norge
  91: "",
  // 06-jul | Grupp L | Mexiko - Ecuador
  92: "",
  // 06-jul | Grupp L | England - Spanien
  93: "",
  // 07-jul | Grupp L | Turkiet - Belgien
  94: "",
  // 07-jul | Grupp L | Österrike - USA
  95: "",
  // 07-jul | Grupp L | Schweiz - Portugal
  96: "",
  // 09-jul | Grupp L | Frankrike - Nederländerna
  97: "",
  // 10-jul | Grupp L | England - Belgien
  98: "",
  // 11-jul | Grupp L | Brasilien - Ecuador
  99: "",
  // 12-jul | Grupp L | Österrike - Portugal
  100: "",
  // 14-jul | Grupp L | Frankrike - England
  101: "",
  // 15-jul | Grupp L | Brasilien - Portugal
  102: "",
  // 18-jul | Grupp L | England - Portugal
  103: "",
  // 19-jul | Grupp L | Frankrike - Brasilien
  104: "",
};
