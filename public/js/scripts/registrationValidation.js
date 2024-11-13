function registrationValidation() {

  const registerForm = document.getElementById("register");
  const emailInput = document.getElementById("email-registration");
  const usernameInput = document.getElementById("username-registration");
  const passwordInput = document.getElementById("password-registration");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9]{3,12}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  emailInput.oninput = () => {
    document.getElementById("emailError").style.display = emailRegex.test(emailInput.value) ? "none" : "inline";
  };

  usernameInput.oninput = () => {
    document.getElementById("usernameError").style.display = usernameRegex.test(usernameInput.value) ? "none" : "inline";
  };

  passwordInput.oninput = () => {
    document.getElementById("passwordError").style.display = passwordRegex.test(passwordInput.value) ? "none" : "inline";
  };

  registerForm.onsubmit = (event) => {
    if(!emailRegex.test(emailInput.value) || !usernameRegex.test(usernameInput.value) || !passwordRegex.test(passwordInput.value)) {
      event.preventDefault();
      alert("Ensure that the email, username, and password are in the correct format.")
    }
  };
};

window.onload = registrationValidation;
