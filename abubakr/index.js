let API = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

let DEFAULT_COURSE_IMG = "./img/download.jpg";
let DEFAULT_MENTOR_IMG = "./img/user.png";

let coursesGrid = document.getElementById("coursesGrid");

fetch(API)
    .then(function (response) {
        return response.json();
    })
    .then(function (courses) {

        let html = "";

        courses.forEach(function (course) {

            let logo    = course.logo    || DEFAULT_COURSE_IMG;
            let name    = course.name    || "-";
            let module  = course.module  || "—";
            let lessons = course.lessons || "—";

            html += `
            <div class="card">
                <img src="${logo}" alt="${name}">
                <div class="info">
                    <h3>${name}</h3>
                    <div class="meta">
                        <span>📚 Modules: ${module}</span>
                        <span>📖 Lessons: ${lessons}</span>
                    </div>
                    <div class="buttons">
                        <a class="journal" href="#">Journal</a>
                        <button class="edit" data-id="${course.id}">✏</button>
                    </div>
                </div>
            </div>
            `;
        });

        coursesGrid.innerHTML = html;

        let overlay      = document.getElementById("overlay");
        let close        = document.getElementById("close");
        let courseLogo   = document.getElementById("courseLogo");
        let courseName   = document.getElementById("courseName");
        let courseModule = document.getElementById("courseModule");
        let courseLesson = document.getElementById("courseLesson");
        let mentorImg    = document.getElementById("mentorImg");
        let mentorName   = document.getElementById("mentorName");
        let mentorPhone  = document.getElementById("mentorPhone");

        let cards = document.querySelectorAll(".card");

        cards.forEach(function (card, i) {

            card.onclick = function () {
                overlay.classList.add("active");

                courseLogo.src         = courses[i].logo    || DEFAULT_COURSE_IMG;
                courseName.innerHTML   = courses[i].name    || "-";
                courseModule.innerHTML = courses[i].module  || "—";
                courseLesson.innerHTML = courses[i].lessons || "—";

                mentorImg.src         = courses[i].mentorImg   || DEFAULT_MENTOR_IMG;
                mentorName.innerHTML  = courses[i].mentorName  || "-";
                mentorPhone.innerHTML = courses[i].mentorPhone || "—";
            };

            let editBtn = card.querySelector(".edit");

            editBtn.onclick = function (event) {
                event.stopPropagation();
                localStorage.setItem("courseId", courses[i].id);
                window.location.href = "edit.html";
            };

        });

        close.onclick = function () {
            overlay.classList.remove("active");
        };

        overlay.onclick = function (event) {
            if (event.target === overlay) {
                overlay.classList.remove("active");
            }
        };

    })
    .catch(function () {
        coursesGrid.innerHTML = `
            <h2 class="error">Error loading courses!</h2>
        `;
    });