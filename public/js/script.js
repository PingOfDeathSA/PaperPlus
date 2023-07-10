

const passwordInput = document.querySelector('#password');
const password2Input = document.querySelector('#password2');

function validatePassword() {
  if (passwordInput.value !== password2Input.value) {
    password2Input.setCustomValidity("Passwords don't match");
  } else {
    password2Input.setCustomValidity("");
  }
}

passwordInput.addEventListener('input', validatePassword);
password2Input.addEventListener('input', validatePassword);
          
          const passwordToggle = document.querySelector('#password-toggle');
        
          passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            passwordToggle.querySelector('i').classList.toggle('fa-eye');
            passwordToggle.querySelector('i').classList.toggle('fa-eye-slash');
          });
        
          function validatePassword() {
            if (passwordInput.value !== password2Input.value) {
              password2Input.setCustomValidity("Passwords don't match");
            } else {
              password2Input.setCustomValidity("");
            }
          }










// call updateEmployeeTax initially to set the value






