console.log('loh pidr');

function validateForm() {
    validateName();
    validateMessage();
    validateEmailOrPhoneIsNotEmpty();
}

function validateName() {
    let nameInput = document.getElementsByName("name")[0];
    validateRequiredField(nameInput, 'name-error');
}

function validateMessage() {
    let messageTextarea = document.getElementsByName("message")[0];
    validateRequiredField(messageTextarea, 'message-error');
}

function validateRequiredField(input, idErrorMessageContainer) {
    input.classList.remove('invalid');
    let errorContainer = document.getElementById(idErrorMessageContainer);
    errorContainer.innerHTML = '';
    if (input.validity.valueMissing) {
        input.classList.add('invalid');
        errorContainer.innerHTML = 'Поле обязательно для заполнения.';
    }
}

function validateEmailOrPhoneIsNotEmpty() {
    let email = document.getElementsByName("email")[0];
    let phone = document.getElementsByName("phone")[0];

    email.classList.remove('invalid');
    phone.classList.remove('invalid');

    let emailErrorContainer = document.getElementById('email-error');
    let errorContainer = document.getElementById('phone-error');

    emailErrorContainer.innerHTML = '';
    errorContainer.innerHTML = '';

    if (!email.value && !phone.value) {
        email.classList.add('invalid');
        phone.classList.add('invalid');

        emailErrorContainer.innerHTML = 'Поле Эл.почта или Телефон должны быть заполнены.';
        errorContainer.innerHTML = 'Поле Эл.почта или Телефон должны быть заполнены.';
    }
}

window.onload = function() {

    let sendButton = document.getElementById('send-message');
    let form = document.getElementById('form');

    sendButton.addEventListener('click', () => {
        validateForm();

        let messageTextarea = document.getElementsByName("email")[0];
    });

}