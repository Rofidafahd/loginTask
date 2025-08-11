// =======================
// Element Selectors
// =======================
let form = document.querySelector("form");

let fnameField       = document.querySelector("#first-name");
let lnameField       = document.querySelector("#last-name");
let phoneField       = document.querySelector("#phone");
let birthdateField   = document.querySelector("#birthdate");
let emailField       = document.querySelector("#email");
let passwordField    = document.querySelector("#password");
let passwordField2   = document.querySelector("#confirm-password");

// =======================
// Regex Patterns
// =======================
let nameRegex       = /^[A-Z][a-z]{2,}$/;
let phoneRegex      = /^(01)[0125]\d{8}$/;
let emailRegex      = /^[a-z][a-z0-9$%]+(@gmail.com)$/;
let birthdateRegex  = /^\d{4}\/\d{2}\/\d{2}$/;
let passwordRegex   = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// =======================
// Custom Validation Function
// =======================
function customValidate(field, regex, errorMessages, successMsg) {
    let isValid = regex.test(field.value);
    let output  = field.parentElement.querySelector(".output");

    if (!isValid) {
        output.innerHTML = errorMessages
            .map(msg => `<p class="invalid-text"><i class="fa-solid fa-circle-xmark"></i> ${msg}</p>`)
            .join('');
    } else {
        output.innerHTML = `<p class="valid-text"><i class="fa-solid fa-circle-check"></i> ${successMsg}</p>`;
    }

    return isValid;
}

// =======================
// Real-time Field Validation
// =======================
fnameField.addEventListener("input", () => {
    customValidate(fnameField, nameRegex, [
        "Firstname must start with capital letter",
        "Only letters allowed",
        "No spaces allowed",
        "Minimum 3 characters"
    ], "Valid first name");
});

lnameField.addEventListener("input", () => {
    customValidate(lnameField, nameRegex, [
        "Lastname must start with capital letter",
        "Only letters allowed",
        "No spaces allowed",
        "Minimum 3 characters"
    ], "Valid last name");
});

phoneField.addEventListener("input", () => {
    customValidate(phoneField, phoneRegex, [
        "Must start with 010, 011, 012, or 015",
        "Must be 11 digits total",
        "No spaces allowed"
    ], "Valid phone number");
});

birthdateField.addEventListener("input", () => {
    customValidate(birthdateField, birthdateRegex, [
        "Date format must be yyyy/mm/dd"
    ], "Valid date format");
});

emailField.addEventListener("input", () => {
    customValidate(emailField, emailRegex, [
        "Must start with lowercase letter",
        "Only letters, numbers, and %$ allowed",
        "Must end with @gmail.com",
        "No spaces allowed"
    ], "Valid email");
});

passwordField.addEventListener("input", () => {
    customValidate(passwordField, passwordRegex, [
        "Minimum 8 characters",
        "Must contain at least one uppercase",
        "Must contain at least one lowercase",
        "Must contain at least one number",
        "No spaces allowed"
    ], "Valid password");
});

passwordField2.addEventListener("input", () => {
    let match  = passwordField.value === passwordField2.value && passwordField.value !== '';
    let output = passwordField2.parentElement.querySelector(".output");

    if (!match) {
        output.innerHTML = `<p class="invalid-text"><i class="fa-solid fa-circle-xmark"></i> Passwords don't match</p>`;
    } else {
        output.innerHTML = `<p class="valid-text"><i class="fa-solid fa-circle-check"></i> Passwords match</p>`;
    }
    return match;
});

// =======================
// Submit Form Validation
// =======================
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let validFname  = customValidate(fnameField, nameRegex, [], "");
    let validLname  = customValidate(lnameField, nameRegex, [], "");
    let validPhone  = customValidate(phoneField, phoneRegex, [], "");
    let validBirth  = customValidate(birthdateField, birthdateRegex, [], "");
    let validEmail  = customValidate(emailField, emailRegex, [], "");
    let validPass   = customValidate(passwordField, passwordRegex, [], "");
    let matchPass   = passwordField.value === passwordField2.value && passwordField.value !== '';

    if (validFname && validLname && validPhone && validBirth && validEmail && validPass && matchPass) {
        Swal.fire({
            icon: "success",
            title: "Signed in successfully"
        });
        fnameField.value = '';
        lnameField.value = '';  
        phoneField.value = '';
        birthdateField.value = '';
        emailField.value = '';
        passwordField.value = '';
        passwordField2.value = '';
    } else {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please check your inputs and try again."
        });
    }
});
