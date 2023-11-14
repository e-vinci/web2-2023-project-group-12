const Footer = () => {
  const footer = document.querySelector('footer');

  // api for translating advice
  async function translateToFrench(text) {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|fr`
    );
    const data = await response.json();
    return data.responseData.translatedText;
  }

  // api giving random advices
  fetch('https://api.adviceslip.com/advice')
    .then((response) => response.json())
    .then(async (data) => {
      const originalAdvice = data.slip.advice;
      const translatedAdvice = await translateToFrench(originalAdvice)
    footer.classList.add('text-center', 'pt-2', 'bg-warning', 'fixed-bottom');
    footer.innerHTML = `<h6>${translatedAdvice}</h6>`;
  }) 
    .catch((error) => {
      console.log(error)
  });
};
export default Footer;
