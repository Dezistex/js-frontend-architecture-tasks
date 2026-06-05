// BEGIN
export default () => {
  let sum = 0;
  const form = document.querySelector('form[name="calculator"]');
  const input = form.querySelector('[name="number"]');
  const result = document.getElementById('result');
  const resetBtn = form.querySelector('button[type="button"]');

  input.focus();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sum += parseInt(input.value, 10);
    result.textContent = sum;
    form.reset();
    input.focus();
  });

  resetBtn.addEventListener('click', () => {
    sum = 0;
    result.textContent = sum;
    form.reset();
    input.focus();
  });
};
// END
