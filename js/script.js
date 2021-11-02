const prices = {
    'landing-page': {
        pm: 700,
        design: 600,
        developer: 1200,
        qa: 500
    },
    'online-store': {
        pm: 1200,
        design: 900,
        developer: 2500,
        qa: 800,
    },
    'web-application': {
        pm: 2000,
        design:1100,
        developer:3000,
        qa: 1000,
    },
    'mobile-application': {
        pm: 3000,
        design: 1500,
        developer: 4000,
        qa: 1300,
    }
};

function getFormValues(){
    const websiteTypeElement = document.querySelector('#project-type')
    const pmEl = document.querySelector('#project-management') 
    const designEl = document.querySelector('#design')
    const developmentEl = document.querySelector('#development')
    const qaEl = document.querySelector('#qa')
    
    return {
        websiteType: websiteTypeElement.value,
        pm: pmEl.checked,
        design: designEl.checked,
        developer: developmentEl.checked,
        qa: qaEl.checked,
    }
}

function calculateWork() {
    const value = getFormValues()
    
    let totalPrice = 0
    const workTypes = prices[value.websiteType]
    if (value.pm) {
        totalPrice = workTypes.pm
    }
    if (value.design) {
        totalPrice = totalPrice + workTypes.design
    }
    if (value.developer) {
        totalPrice = totalPrice + workTypes.developer
    }
    if (value.qa) {
        totalPrice = totalPrice + workTypes.qa
    }

    const totalPriceEl = document.querySelector('#total-price')
    totalPriceEl.textContent = totalPrice
}

getFormValues()

const formEl = document.querySelector('#project-price-form')
const emailModal = document.querySelector('#modal-email')
const successModal = document.querySelector('#success-modal')

formEl.addEventListener('change', calculateWork)

formEl.addEventListener('submit', function(e) {
    e.preventDefault()

    emailModal.classList.add('modal-active')

})

const closeBtns = document.querySelectorAll('.modal-close-btn')

closeBtns.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        emailModal.classList.remove('modal-active')
        successModal.classList.remove('modal-active')
    })
})

const modalEmailContainer = document.querySelector('#modal-email-container')

modalEmailContainer.addEventListener('submit', function(e) {
    e.preventDefault()

    const userEmailInput = document.querySelector('#user-email')

    if (userEmailInput.value) {

        const formData = new FormData(formEl)

        formData.append('Email', userEmailInput.value)

        
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    }).then(function () {
        emailModal.classList.remove('modal-active')
        successModal.classList.add('modal-active')
    }).catch(() => alert('Не удалось отправить форму'))

        return
        
    }
    const inputContainer = document.querySelector('#email-input-container')
    inputContainer.classList.add('email-input-container-error')
})