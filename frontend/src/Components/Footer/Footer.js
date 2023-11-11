const Footer = () => {
  const footer = document.querySelector('footer');
  footer.classList.add('text-center', 'pt-2', 'bg-warning', 'fixed-bottom');
  footer.innerHTML = `<h6>Mangez 5 fruits et légumes par jour !</h6>`;
};

export default Footer;
