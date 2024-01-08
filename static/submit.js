const menu1 = document.querySelector("#menu1") // No Condition
const menu2 = document.querySelector("#menu2") // Vegetarian
const menu3 = document.querySelector("#menu3") // Vegan
const menu4 = document.querySelector("#menu4") // Celiac

const modalSuccess = new bootstrap.Modal(document.querySelector("#modalSuccess"), {
    keyboard: false
})

const modalError = new bootstrap.Modal(document.querySelector("#modalError"), {
    keyboard: false
})

const modalSuccessMessageContainer = document.querySelector("#modalSuccessMessage");

const modalErrorMessageContainer = document.querySelector("#modalErrorMessage");

document.querySelector("#inviform").addEventListener("submit", function(e){
    e.preventDefault();

    first_name = firstnameField.value;
    last_name = lastnameField.value;
    let menu;

    if (menu1.checked) {
        menu = menu1.value;
    } else if (menu2.checked) {
        menu = menu2.value;
    } else if (menu3.checked) {
        menu = menu3.value;
    } else if (menu4.checked) {
        menu = menu4.value;
    } else {
        menu = 'none'
    }

    const formData = new FormData();
    
    formData.append('first_name', first_name);
    formData.append('last_name', last_name)
    formData.append('menu', menu);
    formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
    
    fetch("", {
        method: 'POST',
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.username_error) {
            submitBtn.setAttribute("disabled", "");
            modalErrorMessageContainer.innerHTML = `<p class="modal-title text-light" style="font-weight: 500;">${data.username_error}</p> 
                                                            <span aria-hidden="true">&#9940;</span>`
            modalError.show()
            firstnameField.value = "";
            lastnameField.value = "";

            menu1.checked = false;
            menu2.checked = false;
            menu3.checked = false;
            menu4.checked = false;

            setTimeout(function(){
                modalError.hide()
            }, 2000)
        } else {
            modalSuccessMessageContainer.innerHTML = `<p class="modal-title text-light" style="font-weight: 500;">${data.username_success} &#128515;</p>
                                                                <span aria-hidden="true">&#9989;</span>`
            modalSuccess.show()
            firstnameField.value = "";
            lastnameField.value = "";

            menu1.checked = false;
            menu2.checked = false;
            menu3.checked = false;
            menu4.checked = false;

            setTimeout(function(){
                modalSuccess.hide()
            }, 2000)
        }

    })
    .catch(error => {
        console.error('Error:', error);
    })
});