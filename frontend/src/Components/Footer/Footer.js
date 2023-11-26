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
    footer.innerHTML = `<h6><b><u> Advice</u> : </b><i> ${advice} </i></h6>`;
  })
  .catch( () => {
    footer.innerHTML = `<h6><b><u> Advice</u> : </b><i> Happiness is a journey, not a destination. </i></h6>`;
  });
};

export default Footer;
