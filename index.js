let API = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

let coursesGrid = document.getElementById("coursesGrid");

fetch(API)
.then(function(response){
    return response.json();
})
.then(function(courses){

    let html = "";

    for(let i = 0; i < courses.length; i++){

        html += `
        <div class="card">

            <img src="${courses[i].logo}" alt="${courses[i].name}">

            <div class="info">

                <h3>${courses[i].name}</h3>

                <div class="meta">
                    <span>📚 Modules: ${courses[i].module}</span>
                    <span>📖 Lessons: ${courses[i].lessons}</span>
                </div>

                <div class="buttons">
                    <a class="journal" href="#">Journal</a>

                    <button class="edit" data-id="${courses[i].id}">
                        ✏
                    </button>

                </div>

            </div>

        </div>
        `;

    }

    coursesGrid.innerHTML = html;

    let overlay = document.getElementById("overlay");
    let close = document.getElementById("close");

    let courseLogo = document.getElementById("courseLogo");
    let courseName = document.getElementById("courseName");
    let courseModule = document.getElementById("courseModule");
    let courseLesson = document.getElementById("courseLesson");

    let cards = document.querySelectorAll(".card");

    for(let i = 0; i < cards.length; i++){

        cards[i].onclick = function(){

            overlay.classList.add("active");

            courseLogo.src = courses[i].logo;
            courseName.innerHTML = courses[i].name;
            courseModule.innerHTML = courses[i].module;
            courseLesson.innerHTML = courses[i].lessons;

        };

    }

    let edit = document.querySelectorAll(".edit");

    for(let i = 0; i < edit.length; i++){

        edit[i].onclick = function(e){

            e.stopPropagation();

            window.location = "edit.html" 

        }

    }


    close.onclick = function(){

        overlay.classList.remove("active");

    };

    overlay.onclick = function(event){

        if(event.target == overlay){

            overlay.classList.remove("active");

        }

    };

})
.catch(function(){

    coursesGrid.innerHTML = `
        <h2 class="error">
            Error loading courses!
        </h2>
    `;

});