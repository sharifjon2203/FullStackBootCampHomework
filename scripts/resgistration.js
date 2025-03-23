
let submitBtn = document.querySelector("#submitBtn");
let form = document.querySelector("#formDiv")
let alert = document.querySelector("#alert")

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


form.addEventListener("submit", (event) => {
    event.preventDefault()
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#password").value;
    // let API = "http://localhost:5000/api/v1"  // local ishga tushurib ishltish mumkin hammasi ishlaydi

    // let API = "https://full-stack-boot-camp-homework.vercel.app/api/v1"; // Bu ishlamayabdi vercelda backendga ulanmayabdi. faqat frontend ishlatoldim vercelda

    let API = "http://164.152.20.153:5000/api/v1/register"   //  bu shu to'liq loyihani ishlayotgan server lekin html ,css frontend ko'rinmayabdi

    console.log("Js running")
    fetch(`${API}/register`, {
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
            if (!res.ok) {
                return { message: "exist" }
            } else {
                return res.json()
            }

        })
        .then(data => {
            if (data.message == "success") {
                console.log("User created Successfully!")

                Alert('User created Successfully!', 'success')

            } else {
                console.log("User already exists")
                Alert('User already exists', 'warning')

            }
        })
        .catch(error => console.error('Error:', error));

})

