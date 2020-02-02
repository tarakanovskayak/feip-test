const requirements = {
    name: {
        required: [true, 'Поле обязательно для заполнения.']
    },
    message: {
        required: [true, 'Поле обязательно для заполнения.']
    },
    phone: {
        required: false,
        regExp: [/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/, 'Номер телефона должен соответствовать формату: +7 (123) 456-78-90.'],
        pair: ['email', 'Поле Эл.почта или Телефон должны быть заполнены.']
    },
    email: {
        required: false,
        regExp: [/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i, 'Эл.почта должна соответствовать формату: example@email.com.'],
        pair: ['phone', 'Поле Эл.почта или Телефон должны быть заполнены.']
    }
};

class Validator {
    constructor(args) {
        this.formId = args.formId
    }

    init() {
        this.form = document.getElementById(this.formId);
        this.requirements = Object.entries(requirements);
    }

    validateForm() {
        this.requirements.forEach(item => {
            const field = this.getField(item[0]);
            const validateResult = this.validateField(field, item[1]);
            if (validateResult && !validateResult.result) {
                this.showError(field, validateResult.message);
            }
        });
    }

    validateField(element, requirements) {
        element.classList.remove('invalid');
        element.nextSibling.nextSibling.innerHTML = '';
        if (requirements.required) {
            const passed = this.checkRequired(element);
            if (!passed) {
                return { result: false, message: requirements.required[1] };
            }
        }
        if (requirements.pair) {
            const passed = this.checkPair(element, this.getField(requirements.pair[0]));
            if (!passed) {
                return { result: false, message: requirements.pair[1] };
            }
        }
        if (requirements.regExp) {
            if (!(requirements.pair && !element.value)) {
                const passed = this.checkRegExp(element, requirements.regExp[0]);
                if (!passed) {
                    return { result: false, message: requirements.regExp[1] };
                }
            }
        }
        return { result: true, message: '' };
    }

    checkRequired(element) {
        return !element.validity.valueMissing;
    }

    checkRegExp(element, regExp) {
        return !!element.value.match(regExp);
    }

    checkPair(element, pairElement) {
        return !!element.value || !!pairElement.value;
    }

    showError(element, errorMessage) {
        element.classList.add('invalid');
        element.nextSibling.nextSibling.innerHTML = errorMessage;
    }

    getField(name) {
        return document.getElementsByName(name)[0];
    }
}

window.onload = function() {
    let sendButton = document.getElementById('send-message');
    const validator = new Validator({ formId: 'form' });
    validator.init();

    IMask(document.getElementsByName('phone')[0], {
        mask: '+{7} (000) 000-00-00',
        lazy: false
    });

    sendButton.addEventListener('click', () => {
        validator.validateForm();
    });

}