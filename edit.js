


let url = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses"
let courseId = localStorage.getItem("courseId")
// console.log(courseId);
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
        name: form["courseName"].value
    }
    let response = await fetch (`${url}/${courseId}` ,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
    })
}