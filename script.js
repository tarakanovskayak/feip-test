console.log('loh pidr');

function validateForm() {
    validateName();
    validateMessage();
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
    if (input.validity.valueMissing) {
        let classList = input.classList;
        classList.add('invalid');
        let errorContainer = document.getElementById(idErrorMessageContainer);
        errorContainer.innerHTML = 'Поле обязательно для заполнения';
    }
}

window.onload = function() {

    let sendButton = document.getElementById('send-message');
    let form = document.getElementById('form');

    sendButton.addEventListener('click', () => {
        validateForm();
    });

}