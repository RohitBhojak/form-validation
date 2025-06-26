import "./style.css";

function init() {
  // DOM
  const form = document.querySelector("form");
  const mail = document.querySelector("#mail");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm-password");
  const country = document.querySelector("#country");
  const postalCode = document.querySelector("#postal-code");

  const mailError = document.querySelector("#mail-error");
  const passwordError = document.querySelector("#password-error");
  const confirmPasswordError = document.querySelector(
    "#confirm-password-error"
  );
  const postalCodeError = document.querySelector("#postal-code-error");

  // Error messages
  const errorMessages = {
    empty: "This field is required",
    invalidMail: "Please enter a valid email address",
    invalidPassword: {
      length: "Minimum 8 characters",
      uppercase: "At least 1 uppercase letter",
      lowercase: "At least 1 lowercase letter",
      digit: "At least 1 digit",
    },
    invalidConfirmPassword: "Passwords do not match",
    invalidPostalCode: "Please enter a valid postal code",
  };

  // Postal Code Constraints
  const constraints = {
    india: {
      regex: "^[1-9][0-9]{2}\\s?[0-9]{3}$",
      placeholder: "e.g. 110001",
    },
    germany: {
      regex: "^(D-)?\\d{5}$",
      placeholder: "e.g. D-12345 or 12345",
    },
    france: {
      regex: "^(F-)?\\d{5}$",
      placeholder: "F-12345 or 12345",
    },
  };

  // Helper functions to update error messages

  function updateErrorMessage(element, message) {
    if (message === "") {
      element.innerHTML = "";
    } else {
      element.textContent = message;
    }
  }

  function updateErrorList(element, message, condition) {
    let li = document.createElement("li");
    li.textContent = message;
    if (!condition) {
      li.style.color = "green";
    }
    element.appendChild(li);
  }

  // General validation
  function validateField(element, elementError) {
    if (element.validity.valid) {
      updateErrorMessage(elementError, "");
      return false;
    } else if (element.validity.valueMissing) {
      updateErrorMessage(elementError, errorMessages.empty);
      return false;
    }
    return true;
  }

  // Specific validation
  function validateMail() {
    if (validateField(mail, mailError)) {
      updateErrorMessage(mailError, errorMessages.invalidMail);
    }
  }

  function validatePassword() {
    passwordError.innerHTML = "";
    if (validateField(password, passwordError)) {
      updateErrorList(
        passwordError,
        errorMessages.invalidPassword.length,
        password.validity.tooShort
      );
      updateErrorList(
        passwordError,
        errorMessages.invalidPassword.uppercase,
        !/[A-Z]/.test(password.value)
      );
      updateErrorList(
        passwordError,
        errorMessages.invalidPassword.lowercase,
        !/[a-z]/.test(password.value)
      );
      updateErrorList(
        passwordError,
        errorMessages.invalidPassword.digit,
        !/\d/.test(password.value)
      );
    }
  }

  function validateConfirmPassword() {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match");
    } else {
      confirmPassword.setCustomValidity("");
    }
    if (validateField(confirmPassword, confirmPasswordError)) {
      updateErrorMessage(
        confirmPasswordError,
        errorMessages.invalidConfirmPassword
      );
    }
  }

  function validatePostalCode() {
    if (validateField(postalCode, postalCodeError)) {
      updateErrorMessage(postalCodeError, errorMessages.invalidPostalCode);
    }
  }

  // Event listeners
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  mail.addEventListener("input", validateMail);
  password.addEventListener("input", validatePassword);
  confirmPassword.addEventListener("input", validateConfirmPassword);
  // Set constraints on postal code
  country.addEventListener("change", () => {
    postalCode.placeholder = constraints[country.value].placeholder;
    postalCode.pattern = constraints[country.value].regex;
  });
  // Apply constraints for default country
  country.dispatchEvent(new Event("change"));
  postalCode.addEventListener("input", validatePostalCode);
}

init();
