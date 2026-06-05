import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = document.querySelector('[data-form="sign-up"]');
  const submitBtn = form.querySelector('[type="submit"]');
  const fieldNames = ['name', 'email', 'password', 'passwordConfirmation'];

  const touched = {};
  let errors = validate({ name: '', email: '', password: '', passwordConfirmation: '' });
  const fields = { name: '', email: '', password: '', passwordConfirmation: '' };

  const renderField = (fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    const error = errors[fieldName];

    if (touched[fieldName] && error) {
      input.classList.add('is-invalid');
      let feedback = input.nextElementSibling;
      if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        input.after(feedback);
      }
      feedback.textContent = error.message;
    } else {
      input.classList.remove('is-invalid');
      const feedback = input.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.remove();
      }
    }
  };

  const render = () => {
    fieldNames.forEach(renderField);
    submitBtn.disabled = !isEmpty(errors);
  };

  render();

  form.addEventListener('input', (e) => {
    const { name, value } = e.target;
    touched[name] = true;
    fields[name] = value;
    errors = validate(fields);
    render();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    try {
      await axios.post(routes.usersPath(), fields);
      container.innerHTML = 'User Created!';
    } catch (err) {
      submitBtn.disabled = !isEmpty(errors);
    }
  });
};
// END
