function scrollToSection(sectionId) {
   const element = document.getElementById(sectionId);
   if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
   }
}

function openTicketModal(event) {
   const modal = document.getElementById('ticket-modal');
   modal.style.display = 'flex';
   document.body.style.overflow = 'hidden';
   
   if (event && event.target.closest('tr')) {
      const row = event.target.closest('tr');
      const venue = row.cells[0].textContent.trim();
      const date = row.cells[2].textContent.trim();
      document.getElementById('ticket-venue').value = venue;
      document.getElementById('ticket-date').value = date;
   }
}

function closeTicketModal() {
   const modal = document.getElementById('ticket-modal');
   modal.style.display = 'none';
   document.body.style.overflow = 'auto';
   document.getElementById('ticket-form').reset();
}

function validateForm(formData) {
   const errors = {};
   
   if (!formData.name || formData.name.trim().length === 0) {
      errors.name = 'Ім\'я є обов\'язковим полем';
   } else if (formData.name.trim().length < 2) {
      errors.name = 'Ім\'я має містити мінімум 2 символи';
   } else if (formData.name.trim().length > 50) {
      errors.name = 'Ім\'я не може перевищувати 50 символів';
   } else if (!/^[а-яА-ЯіІїЇєЄґҐ\s'-]+$/.test(formData.name.trim())) {
      errors.name = 'Ім\'я може містити тільки українські літери, пробіли, дефіси та апострофи';
   }
   
   if (!formData.email || formData.email.trim().length === 0) {
      errors.email = 'Email є обов\'язковим полем';
   } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
         errors.email = 'Введіть коректний email адрес';
      } else if (formData.email.trim().length > 100) {
         errors.email = 'Email не може перевищувати 100 символів';
      }
   }
   
   if (!formData.message || formData.message.trim().length === 0) {
      errors.message = 'Повідомлення є обов\'язковим полем';
   } else if (formData.message.trim().length < 10) {
      errors.message = 'Повідомлення має містити мінімум 10 символів';
   } else if (formData.message.trim().length > 500) {
      errors.message = 'Повідомлення не може перевищувати 500 символів';
   } else if (formData.message.trim().length < 20) {
      errors.message = 'Будь ласка, опишіть детальніше ваше питання (мінімум 20 символів)';
   }
   
   return errors;
}

function displayErrors(errors) {
   document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
   document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
      el.style.borderColor = '#3A3A43';
   });
   
   Object.keys(errors).forEach(field => {
      const errorEl = document.getElementById(`${field}-error`);
      const inputEl = document.getElementById(field);
      if (errorEl && inputEl) {
         errorEl.textContent = errors[field];
         inputEl.style.borderColor = '#FF1F57';
      }
   });
}

function handleFormSubmit(event) {
   event.preventDefault();
   
   const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
   };
   
   const errors = validateForm(formData);
   
   if (Object.keys(errors).length > 0) {
      displayErrors(errors);
      return;
   }
   
   const url = `mailto:info@grim-grim.com?subject=Повідомлення з сайту&body=${encodeURIComponent(formData.message)}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
   window.location.href = url;
   
   alert('Дякуємо за повідомлення! Ваш email клієнт відкриється для відправки.');
   document.getElementById('contact-form').reset();
}

function validateTicketForm(formData) {
   const errors = {};
   
   if (!formData.name || formData.name.trim().length === 0) {
      errors.name = 'Ім\'я є обов\'язковим полем';
   } else if (formData.name.trim().length < 2) {
      errors.name = 'Ім\'я має містити мінімум 2 символи';
   } else if (formData.name.trim().length > 50) {
      errors.name = 'Ім\'я не може перевищувати 50 символів';
   } else if (!/^[а-яА-ЯіІїЇєЄґҐ\s'-]+$/.test(formData.name.trim())) {
      errors.name = 'Ім\'я може містити тільки українські літери, пробіли, дефіси та апострофи';
   }
   
   if (!formData.email || formData.email.trim().length === 0) {
      errors.email = 'Email є обов\'язковим полем';
   } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
         errors.email = 'Введіть коректний email адрес';
      } else if (formData.email.trim().length > 100) {
         errors.email = 'Email не може перевищувати 100 символів';
      }
   }
   
   if (!formData.quantity || formData.quantity < 1 || formData.quantity > 10) {
      errors.quantity = 'Кількість квитків має бути від 1 до 10';
   }
   
   return errors;
}

function handleTicketSubmit(event) {
   event.preventDefault();
   
   const formData = {
      venue: document.getElementById('ticket-venue').value,
      date: document.getElementById('ticket-date').value,
      name: document.getElementById('ticket-name').value.trim(),
      email: document.getElementById('ticket-email').value.trim(),
      quantity: parseInt(document.getElementById('ticket-quantity').value)
   };
   
   const errors = validateTicketForm(formData);
   
   if (Object.keys(errors).length > 0) {
      displayTicketErrors(errors);
      return;
   }
   
   const url = `mailto:tickets@grim-grim.com?subject=Замовлення квитків&body=Замовлення квитків на концерт: ${encodeURIComponent(formData.venue)}%0D%0AДата: ${encodeURIComponent(formData.date)}%0D%0AКількість: ${formData.quantity}%0D%0AІм'я: ${encodeURIComponent(formData.name)}%0D%0AEmail: ${encodeURIComponent(formData.email)}`;
   window.location.href = url;
   
   alert('Дякуємо за замовлення! Ваш email клієнт відкриється для підтвердження.');
   closeTicketModal();
}

function displayTicketErrors(errors) {
   document.querySelectorAll('.ticket-error-message').forEach(el => el.remove());
   document.querySelectorAll('#ticket-form input, #ticket-form select').forEach(el => {
      el.style.borderColor = '#3A3A43';
   });
   
   Object.keys(errors).forEach(field => {
      const inputEl = document.getElementById(`ticket-${field}`);
      if (inputEl) {
         inputEl.style.borderColor = '#FF1F57';
         const errorEl = document.createElement('span');
         errorEl.className = 'ticket-error-message';
         errorEl.style.color = '#FF1F57';
         errorEl.style.fontSize = '12px';
         errorEl.style.marginTop = '5px';
         errorEl.style.display = 'block';
         errorEl.textContent = errors[field];
         inputEl.parentNode.appendChild(errorEl);
      }
   });
}

document.addEventListener('keydown', function(event) {
   if (event.key === 'Escape') {
      closeTicketModal();
   }
});

function setupRealTimeValidation() {
   const contactForm = document.getElementById('contact-form');
   if (contactForm) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      if (nameInput) {
         nameInput.addEventListener('blur', function() {
            validateField('name', this.value.trim());
         });
         nameInput.addEventListener('input', function() {
            clearFieldError('name');
         });
      }
      
      if (emailInput) {
         emailInput.addEventListener('blur', function() {
            validateField('email', this.value.trim());
         });
         emailInput.addEventListener('input', function() {
            clearFieldError('email');
         });
      }
      
      if (messageInput) {
         messageInput.addEventListener('blur', function() {
            validateField('message', this.value.trim());
         });
         messageInput.addEventListener('input', function() {
            clearFieldError('message');
         });
      }
   }
   
   const ticketForm = document.getElementById('ticket-form');
   if (ticketForm) {
      const ticketNameInput = document.getElementById('ticket-name');
      const ticketEmailInput = document.getElementById('ticket-email');
      
      if (ticketNameInput) {
         ticketNameInput.addEventListener('blur', function() {
            validateTicketField('name', this.value.trim());
         });
         ticketNameInput.addEventListener('input', function() {
            clearTicketFieldError('name');
         });
      }
      
      if (ticketEmailInput) {
         ticketEmailInput.addEventListener('blur', function() {
            validateTicketField('email', this.value.trim());
         });
         ticketEmailInput.addEventListener('input', function() {
            clearTicketFieldError('email');
         });
      }
   }
}

function validateField(fieldName, value) {
   const formData = { [fieldName]: value };
   const errors = validateForm(formData);
   
   if (errors[fieldName]) {
      displayFieldError(fieldName, errors[fieldName]);
   } else {
      clearFieldError(fieldName);
   }
}

function validateTicketField(fieldName, value) {
   const formData = { [fieldName]: value };
   const errors = validateTicketForm(formData);
   
   if (errors[fieldName]) {
      displayTicketFieldError(fieldName, errors[fieldName]);
   } else {
      clearTicketFieldError(fieldName);
   }
}

function displayFieldError(fieldName, message) {
   const inputEl = document.getElementById(fieldName);
   const errorEl = document.getElementById(`${fieldName}-error`);
   
   if (inputEl) {
      inputEl.style.borderColor = '#FF1F57';
   }
   
   if (errorEl) {
      errorEl.textContent = message;
   }
}

function clearFieldError(fieldName) {
   const inputEl = document.getElementById(fieldName);
   const errorEl = document.getElementById(`${fieldName}-error`);
   
   if (inputEl) {
      inputEl.style.borderColor = '#3A3A43';
   }
   
   if (errorEl) {
      errorEl.textContent = '';
   }
}

function displayTicketFieldError(fieldName, message) {
   const inputEl = document.getElementById(`ticket-${fieldName}`);
   
   if (inputEl) {
      inputEl.style.borderColor = '#FF1F57';
      const existingError = inputEl.parentNode.querySelector('.ticket-error-message');
      if (existingError) {
         existingError.remove();
      }
      const errorEl = document.createElement('span');
      errorEl.className = 'ticket-error-message';
      errorEl.style.color = '#FF1F57';
      errorEl.style.fontSize = '12px';
      errorEl.style.marginTop = '5px';
      errorEl.style.display = 'block';
      errorEl.textContent = message;
      inputEl.parentNode.appendChild(errorEl);
   }
}

function clearTicketFieldError(fieldName) {
   const inputEl = document.getElementById(`ticket-${fieldName}`);
   
   if (inputEl) {
      inputEl.style.borderColor = '#3A3A43';
      const existingError = inputEl.parentNode.querySelector('.ticket-error-message');
      if (existingError) {
         existingError.remove();
      }
   }
}

document.addEventListener('DOMContentLoaded', function() {
   const images = document.querySelectorAll('img[data-src]');
   const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
         }
      });
   });
   
   images.forEach(img => imageObserver.observe(img));
   setupRealTimeValidation();
});
