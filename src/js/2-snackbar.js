import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.snackbar-form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const { delay, state } = event.target.elements;

  const delayValue = Number(delay.value);
  const stateValue = state.value; // "fulfilled" or "rejected"

  if (!delayValue || delayValue < 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a positive delay value',
      position: 'topRight',
    });
    return;
  }

  createPromise(delayValue, stateValue)
    .then(ms => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${ms}ms`,
        position: 'topRight',
      });
    })
    .catch(ms => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${ms}ms`,
        position: 'topRight',
      });
    });

  // optional: clear form after submit
  event.target.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
