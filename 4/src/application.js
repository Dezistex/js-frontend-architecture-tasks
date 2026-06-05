// BEGIN
export default (companies) => {
  const container = document.querySelector('.container');
  let activeId = null;

  const render = () => {
    const buttonsHtml = companies
      .map((c) => `<button class="btn btn-primary">${c.name}</button>`)
      .join('');
    const activeCompany = activeId !== null ? companies.find((c) => c.id === activeId) : null;
    const descriptionHtml = activeCompany ? `<div>${activeCompany.description}</div>` : '';
    container.innerHTML = buttonsHtml + descriptionHtml;

    companies.forEach((company) => {
      const btn = Array.from(container.querySelectorAll('button'))
        .find((b) => b.textContent === company.name);
      btn.addEventListener('click', () => {
        activeId = activeId === company.id ? null : company.id;
        render();
      });
    });
  };

  render();
};
// END
