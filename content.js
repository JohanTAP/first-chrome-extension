const biblicalVerses = [
  "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna. - Juan 3:16",
  "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas. - Mateo 6:33",
  "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas. - Josué 1:9",
  "El Señor es mi pastor, nada me faltará. - Salmos 23:1",
  "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis. - Jeremías 29:11"
];

function getRandomVerse() {
  return biblicalVerses[Math.floor(Math.random() * biblicalVerses.length)];
}

function showBlockedContent() {
  // Limpiar el contenido existente
  document.body.innerHTML = '';

  // Crear el contenedor principal
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
  `;

  // Crear el mensaje de contenido bloqueado
  const blockedMessage = document.createElement('h1');
  blockedMessage.textContent = 'Contenido Bloqueado';
  blockedMessage.style.cssText = `
    color: red;
    font-size: 24px;
    margin-bottom: 20px;
  `;

  // Crear el elemento para el versículo
  const verseElement = document.createElement('p');
  verseElement.textContent = getRandomVerse();
  verseElement.style.cssText = `
    font-size: 18px;
    max-width: 600px;
    line-height: 1.5;
  `;

  // Agregar elementos al contenedor
  container.appendChild(blockedMessage);
  container.appendChild(verseElement);

  // Agregar el contenedor al body
  document.body.appendChild(container);
}

function analyzePageContent() {
  const content = document.body.innerText;
  chrome.runtime.sendMessage({action: "analyzeContent", content: content}, (response) => {
    if (response.score >= 10) {
      showBlockedContent();
    }
  });
}

// Ejecutar el análisis una vez que la página se haya cargado completamente
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', analyzePageContent);
} else {
  analyzePageContent();
}