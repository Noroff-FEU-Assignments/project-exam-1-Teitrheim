// Function to validate the form
function validateForm(event) {
  event.preventDefault(); // Prevent the form from submitting initially

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Reset error messages
  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";

  let isValid = true;

  // Validate name (should be more than 5 characters long)
  if (nameInput.value.trim().length <= 5) {
    nameError.textContent = "Name should be more than 5 characters long";
    isValid = false;
  }

  // Validate email (must be a valid email address)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // from chatGPT
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Invalid email address";
    isValid = false;
  }

  // Validate subject (should be more than 15 characters long)
  if (subjectInput.value.trim().length <= 15) {
    subjectError.textContent = "Subject should be more than 15 characters long";
    isValid = false;
  }

  // Validate message content (should be more than 25 characters long)
  if (messageInput.value.trim().length <= 25) {
    messageError.textContent = "Message should be more than 25 characters long";
    isValid = false;
  }

  // If the form is valid, you can submit it
  if (isValid) {
    document.getElementById("confirmationMessage").style.display = "block";
    // Here, you can submit the form or take any other appropriate action.
  }
}

// Attach the validation function to the form's submit event
const contactForm = document.getElementById("contact");
contactForm.addEventListener("submit", validateForm);
