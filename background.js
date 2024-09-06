const blockedKeywords = [
  'adulto', 'maduro', 'xxx', 'porn', 'sexo', 'hentai', 'violencia', 'gore',
  'desnudo', 'erótico', 'fetiche', 'bdsm', 'escort', 'prostitución',
  'drogas', 'gambling', 'apuestas', 'alcohol', 'tabaco', 'armas',
  'webcam', 'chaturbate', 'myfreecams', 'cams', 'livejasmin',
  'stripchat', 'bongacams', 'onlyfans', 'contenido sexual', 'explícito',
  'mayor de edad', '18+', 'nsfw', 'uncensored', 'adultos', 'sexualmente'
];

const adultContentPatterns = [
  /sex/i, /porn/i, /xxx/i, /adult/i, /mature/i, /erotic/i,
  /nsfw/i, /18\+/i, /\bxxx\b/i, /escort/i, /webcam/i, /cams/i,
  /chaturbate/i, /myfreecams/i, /livejasmin/i, /stripchat/i,
  /bongacams/i, /onlyfans/i, /explicit/i, /sexually/i
];

function analyzeUrl(url) {
  const lowerUrl = url.toLowerCase();
  let score = 0;

  // Verificar patrones en la URL
  adultContentPatterns.forEach(pattern => {
    if (pattern.test(lowerUrl)) {
      score += 2;
    }
  });

  // Verificar palabras clave en la URL
  blockedKeywords.forEach(keyword => {
    if (lowerUrl.includes(keyword)) {
      score += 1;
    }
  });

  return score;
}

function shouldBlockUrl(url) {
  const score = analyzeUrl(url);
  return score >= 3;
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (shouldBlockUrl(details.url)) {
      return { cancel: true };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeContent") {
    const score = analyzeContent(request.content);
    sendResponse({score: score});
  }
});

function analyzeContent(content) {
  let score = 0;
  const lowerContent = content.toLowerCase();

  // Verificar palabras clave en el contenido
  blockedKeywords.forEach(keyword => {
    const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
    const matches = (lowerContent.match(regex) || []).length;
    score += matches;
  });

  // Verificar patrones de contenido para adultos
  adultContentPatterns.forEach(pattern => {
    if (pattern.test(lowerContent)) {
      score += 2;
    }
  });

  return score;
}