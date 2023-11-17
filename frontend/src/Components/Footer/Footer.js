const footer = document.querySelector('footer');
const Footer = () => {
  footer.classList.add('text-center', 'pt-2', 'bg-warning', 'fixed-bottom');
  getRandomQuote();
}

// api to translate to french
async function translateToFrench(text) {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`
  );
  const data = await response.json();
  return data.responseData.translatedText;
}

// api to get a random quote
function getRandomQuote() {
  fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then( async data => {
    if (data.content.length >= 160) getRandomQuote();
    const quote = await translateToFrench(data.content);
    const {author} = data;
    // Utilisation de la citation et de l'auteur
    footer.innerHTML = `<h6><i>« ${quote} »</i><b> - ${author} </b></h6>`;
  })
  .catch( () => {
    footer.innerHTML = `<h6><i>« L'amitié est un esprit en deux corps. »</i><b> - Mencius </b></h6>`;
  });
};

export default Footer;
