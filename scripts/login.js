let submitBtn = document.querySelector("#submitBtn");
let form = document.querySelector("#formDiv")
let alert = document.querySelector("#alert")
let mainSection = document.querySelector("#mainSection")


let login = (userData) => {
    setTimeout(() => {
        mainSection.innerHTML = `<div class="text-center p-3">
                                    <h3>Profile Details:</h3>
                                    <h5>${userData.email}</h5>
                                </div>`

    }, 2000);
}


const Alert = (message, type) => {
    alert.innerHTML = ""
    const wrapper = document.createElement('div')

    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    alert.append(wrapper)
}


form.addEventListener("submit", () => {
    event.preventDefault()
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#password").value;
    let API = "http://localhost:5000/api/v1"
    fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            pass
        })
    })
        .then(res => {
            // if (!res.ok) {
            //     // return { status: "", message: "Email or password incorrect!" }
            // } else {
            return res.json()
            // }

        })
        .then(data => {
            console.log(data)
            if (data.status == "loggedIn") {
                // console.log("User Successfully Logined!")

                // Alert('User Successfully Logined!', 'success')
                Alert(data.message, 'success')
                login(data.user)

            } else {
                console.log("User already exists")
                // Alert('User already exists', 'warning')
                Alert(data.message, 'warning')

            }
        })
        .catch(error => console.error('Error:', error));

})

