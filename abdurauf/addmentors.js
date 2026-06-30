let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Mentors"
let form = document.querySelector("#form")
let cancelBtn = document.getElementById("cancelBtn")


async function addMentor() {
    let newMentor = {
        name: form["name"].value,
        surname: form["surname"].value,
        dateBirthday: form["dateBirthday"].value,
        location: form["location"].value,
        email: form["email"].value,
        phoneNumber: form["phoneNumber"].value,
        Position: form["Position"].value,
        description: form["description"].value,
        "Skil-1": form["Skil-1"].value,
        "Skil-2": form["Skil-2"].value,
        "Skil-3": form["Skil-3"].value,
        "Skil-4": form["Skil-4"].value,
        Status: false,
    }

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMentor)
    })
}

form.onsubmit = (e) => {
    e.preventDefault()
    addMentor()
    // window.location = ""
}

cancelBtn.onclick = () => {
    // window.location = ""
}
