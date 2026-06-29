let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses"
let courseId = localStorage.getItem("courseId")
let form = document.getElementById("form");

async function get() {
    let response = await fetch(`${url}/${courseId}`)
    let courseInfo = await response.json()
    console.log(courseInfo)
    form["courseName"].value = courseInfo.name
    form["mentorName"].value = courseInfo.mentorName
    form["lessons"].value = courseInfo.lessons
    form["module"].value = courseInfo.module
    form["category"].value = courseInfo.category
    form["logo"].value = courseInfo.logo
    form["description"].value = courseInfo.description
}
get()

async function edit() {
    let newCourse = {
        name: form["courseName"].value,
        mentorName: form["mentorName"].value,
        lessons: form["lessons"].value,
        module: form["module"].value,
        category: form["category"].value,
        logo: form["logo"].value,
        description: form["description"].value
    }

    let response = await fetch(`${url}/${courseId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
    })

    let updatedCourse = await response.json()
    console.log("Обновлено:", updatedCourse)
}
form.onsubmit( (e) =>{
    e.preventDefault()
    edit()
    window.location = "index.html"
})