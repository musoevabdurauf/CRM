let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Mentors"
let form = document.getElementById("form")
let photoUpload = document.getElementById("photoUpload")
let photoFile = document.getElementById("logoFile")
let photoPreview = document.getElementById("photoPreview")
let photoPlaceholder = document.getElementById("photoPlaceholder")
let photoRemove = document.getElementById("photoRemove")
let logoInput = document.getElementById("logo")
let cancelBtn = document.getElementById("cancelBtn")

photoUpload.onclick = () => {
    photoFile.click()
}

photoFile.onchange = () => {
    let file = photoFile.files[0]
    if (!file) return

    let reader = new FileReader()
    reader.onload = () => {
        photoPreview.src = reader.result
        photoPreview.hidden = false
        photoPlaceholder.hidden = true
        photoRemove.hidden = false
        logoInput.value = reader.result
    }
    reader.readAsDataURL(file)
}

photoRemove.onclick = (e) => {
    e.stopPropagation()
    photoFile.value = ""
    logoInput.value = ""
    photoPreview.src = ""
    photoPreview.hidden = true
    photoPlaceholder.hidden = false
    photoRemove.hidden = true
}

async function addMentor() {
    let newMentor = {
        name: form["name"].value,
        surname: form["surname"].value,
        dateBirthday: form["dateBirthday"].value,
        gender: form["gender"].value,
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
        logo: form["logo"].value
    }

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMentor)
    })

    let createdMentor = await response.json()
    console.log("Добавлено:", createdMentor)
}

form.onsubmit = (e) => {
    e.preventDefault()
    addMentor()
    window.location = "index.html"
}

cancelBtn.onclick = () => {
    window.location = "index.html"
}