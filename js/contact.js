// js/contact.js — Contact form validation and submission with toast notification
export function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!validateForm(form)) return;
        submitForm(form);
    });

    // Real-time field validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('invalid')) validateField(field);
        });
    });
}

function validateField(field) {
    const isEmpty = !field.value.trim();
    const isEmailInvalid = field.type === 'email' && field.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    const isPhoneInvalid = field.type === 'tel' && field.value &&
        !/^[\d\s\+\-\(\)]{7,15}$/.test(field.value.replace(/\s/g, ''));

    const isValid = !isEmpty && !isEmailInvalid && !isPhoneInvalid;

    field.classList.toggle('invalid', !isValid);
    field.classList.toggle('valid', isValid);

    // Show/clear inline message
    let errEl = field.parentElement.querySelector('.field-error');
    if (!isValid) {
        if (!errEl) {
            errEl = document.createElement('p');
            errEl.className = 'field-error';
            errEl.style.cssText = `
        font-size: 0.75rem;
        color: #e8321e;
        margin-top: 4px;
        font-weight: 600;
      `;
            field.parentElement.appendChild(errEl);
        }
        if (isEmpty) errEl.textContent = 'This field is required';
        else if (isEmailInvalid) errEl.textContent = 'Please enter a valid email';
        else if (isPhoneInvalid) errEl.textContent = 'Please enter a valid phone number';
    } else if (errEl) {
        errEl.remove();
    }

    return isValid;
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;
    requiredFields.forEach(field => {
        if (!validateField(field)) allValid = false;
    });
    return allValid;
}

function submitForm(form) {
    const submitBtn = form.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('span');

    // Loading state
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending…';
    submitBtn.style.opacity = '0.7';

    // Simulate an API call
    setTimeout(() => {
        form.reset();

        // Clear valid styling
        form.querySelectorAll('.valid, .invalid').forEach(el => {
            el.classList.remove('valid', 'invalid');
        });

        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Book My Free Session';
        submitBtn.style.opacity = '1';

        showToast('🎉 Your session is booked! We\'ll call you within 24 hours. See you at BTB!');
    }, 1500);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 5000);
}
