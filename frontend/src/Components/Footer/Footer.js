const footer = document.querySelector('footer');
const Footer = () => {
  footer.classList.add('text-center', 'pt-2', 'bg-warning', 'fixed-bottom');
  getRandomAdvice();
};

// api to get a random advice
function getRandomAdvice() {
  fetch('https://api.adviceslip.com/advice')
    .then((response) => response.json())
    .then((data) => {
      const {advice} = data.slip;
    footer.innerHTML = `<h5><b><u> Advice</u> : </b> ${advice} </h5>`;
  })
  .catch( () => {
    footer.innerHTML = `<h5><b><u> Advice</u> : </b> Happiness is a journey, not a destination. </h5>`;
  });
};

export default Footer;
