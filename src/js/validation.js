import intlTelInput from 'intl-tel-input';

document.addEventListener('DOMContentLoaded', function() {
    const formNameSurname = document.querySelector('#form-name-surname');
    const formEmail = document.querySelector('#form-email');
    const formPhone = document.querySelector('#form-phone');
    const submitButton = document.querySelector('.btn');
    const webinarForm = document.querySelector('#webinarForm');

    const nameError = document.querySelector('#name-error');
    const emailError = document.querySelector('#email-error');
    const phoneError = document.querySelector('#phone-error');

    const namePattern = /^[A-Za-zА-Яа-яЁё\s]{2,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const iti = intlTelInput(formPhone, {
        initialCountry: "ua",
        separateDialCode: true,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
    });

    function validateName() {
        if (!namePattern.test(formNameSurname.value)) {
            formNameSurname.classList.add('error');
            nameError.textContent = 'Имя и фамилия должны содержать только буквы и минимум 2 символа.';
            return false;
        } else {
            formNameSurname.classList.remove('error');
            nameError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        if (!emailPattern.test(formEmail.value)) {
            formEmail.classList.add('error');
            emailError.textContent = 'Введите корректный email.';
            return false;
        } else {
            formEmail.classList.remove('error');
            emailError.textContent = '';
            return true;
        }
    }

    function validatePhone() {
        if (formPhone.value.trim() === "") {
            formPhone.classList.add('error');
            phoneError.textContent = 'Телефон не может быть пустым.';
            return false;
        } else if (!iti.isValidNumber()) {
            formPhone.classList.add('error');
            const errorCode = iti.getValidationError();
            let errorMessage = 'Введите корректный номер телефона.';
            phoneError.textContent = errorMessage;
            return false;
        } else {
            formPhone.classList.remove('error');
            phoneError.textContent = '';
            return true;
        }
    }

    formNameSurname.addEventListener('input', validateName);
    formEmail.addEventListener('input', validateEmail);
    formPhone.addEventListener('input', validatePhone);

    webinarForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();

        if (isNameValid && isEmailValid && isPhoneValid) {
            console.log('Форма успешно отправлена!');
            webinarForm.classList.add('success');

            const formData = new FormData(webinarForm);
            console.log(formData)

            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(responseText => {
                    console.log(responseText);
                    webinarForm.reset()
                    setTimeout(function() {
                        webinarForm.classList.remove('success');
                    }, 3000);
                })
                .catch(error => {
                    console.error('Ошибка отправки формы:', error);
                });

            const name = formNameSurname.value;
            const phone = formPhone.value;
            const email = formEmail.value;

            const message = `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}`;

            const telegramToken = '7455823877:AAHgY-UoWo3KP6LDYnF88oSduByyt_2U2KE'; // Ваш токен

            fetch(`https://api.telegram.org/bot${telegramToken}/getUpdates`)
                .then(response => response.json())
                .then(data => {
                    const updates = data.result;
                    if (updates.length === 0) {
                        throw new Error('Нет обновлений для получения chat_id.');
                    }
                    const lastUpdate = updates[updates.length - 1];
                    const chatId = lastUpdate.message.chat.id;

                    return fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: message
                        })
                    });
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        console.log('Сообщение успешно отправлено!');
                    } else {
                        console.error('Ошибка отправки сообщения:', data);
                    }
                })
                .catch(error => {
                    console.error('Ошибка отправки сообщения:', error);
                });
        }
    });
});
