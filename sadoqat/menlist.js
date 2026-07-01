
let API = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Mentors";
let DEFAULT_MENTOR_IMG = "./img/user.png";
let mentorsGrid = document.getElementById("mentorsGrid");

async function getMentors(){
    try {
        
        let atvet = await fetch(API, { method: "GET" })
        let mentors = await atvet.json()
        
        mentorsGrid.innerHTML = ""
        
        mentors.forEach((element) => {
            let div = document.createElement("div")
            div.className = "mentor-card"
            
            let avatarSrc = element.avatar ? element.avatar : DEFAULT_MENTOR_IMG
            let contactValue = element.phoneNumber ? element.phoneNumber : element.email
            let arrowSrc = "./img/arrow.png"
            
            div.innerHTML = `
            <div class="top">
                <img src="${avatarSrc}" alt="${element.name}">
                <div class="top1">
                    <h2>${element.name}</h2>
                    <p>${element.description}</p>
                </div>
            </div>
            <div class="bottom">
                ${contactValue}
                <button class="btn">-></button>
            </div>
            `
            mentorsGrid.appendChild(div)
        })

    } catch (error) {
        console.error(error)
        mentorsGrid.innerHTML = "<p>Xatogi!</p>"
    }
}

getMentors()