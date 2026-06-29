const API = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

const coursesGrid = document.getElementById("coursesGrid");

fetch(API)
.then(function(response){

    return response.json();

})
.then(function(courses){

    let html = "";

    courses.forEach(function(course){

        html += `
<div class="card">

    <img src="${course.logo}" alt="${course.name}">

    <div class="info">

        <h3>${course.name}</h3>

        <div class="meta">
            <span>📚 Modules: ${course.module}</span>
            <span>📖 Lessons: ${course.lessons}</span>
        </div>

        <div class="buttons">
            <a class="journal" href="#">Journal</a>
            <a class="edit" href="">✏</a>
        </div>

    </div>

</div>
`;

    });

    coursesGrid.innerHTML = html;

})
.catch(function(){

    coursesGrid.innerHTML = `
        <h2 class="error">
            Error loading courses!
        </h2>
    `;

});