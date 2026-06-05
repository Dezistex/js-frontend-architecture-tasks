// BEGIN
export default (laptops) => {
  const form = document.querySelector('form');
  const result = document.querySelector('.result');

  const renderLaptops = (items) => {
    if (items.length === 0) {
      result.innerHTML = '';
      return;
    }
    result.innerHTML = `<ul>${items.map((l) => `<li>${l.model}</li>`).join('')}</ul>`;
  };

  const applyFilter = () => {
    const data = new FormData(form);
    const processorEq = data.get('processor_eq');
    const memoryEq = data.get('memory_eq');
    const frequencyGte = data.get('frequency_gte');
    const frequencyLte = data.get('frequency_lte');

    const filtered = laptops.filter((laptop) => [
      !processorEq || laptop.processor === processorEq.toLowerCase(),
      !memoryEq || laptop.memory === parseInt(memoryEq, 10),
      !frequencyGte || laptop.frequency >= parseFloat(frequencyGte),
      !frequencyLte || laptop.frequency <= parseFloat(frequencyLte),
    ].every(Boolean));

    renderLaptops(filtered);
  };

  renderLaptops(laptops);

  form.addEventListener('change', applyFilter);
  form.addEventListener('input', applyFilter);
};
// END
