let API = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";
let DEFAULT_COURSE_IMG = "./img/download.jpg";
let DEFAULT_MENTOR_IMG = "./img/user.png";
let coursesGrid = document.getElementById("coursesGrid");

let courses = [];
let currentCourseIndex = null;

fetch(API)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        courses = data;
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
                        <span>📚 Модули: ${module}</span>
                        <span>📖 Уроки: ${lessons}</span>
                    </div>
                    <div class="buttons">
                        <a class="journal" href="#">Журнал</a>
                        <button class="edit" data-id="${course.id}">✏</button>
                    </div>
                </div>
            </div>
            `;
        });
        coursesGrid.innerHTML = html;
        initDrawer();
    })
    .catch(function () {
        coursesGrid.innerHTML = `
            <h2 class="error">Error loading courses!</h2>
        `;
    });

function getTeachers(course) {
    return course.teachers && course.teachers.length
        ? course.teachers
        : [{
            name:  course.mentorName        || "-",
            img:   course.mentorAvatar      || DEFAULT_MENTOR_IMG,
            phone: course.mentorNumberPhone || "—"
        }];
}

function renderMentors(teachers) {
    let html = "";
    teachers.forEach(function (t) {
        html += `
        <div class="mentor-card" style="margin-bottom:12px;">
            <img src="${t.img || DEFAULT_MENTOR_IMG}" alt="${t.name || '-'}">
            <div class="mentor-info">
                <p>${t.name || "-"}</p>
                <span>${t.phone || "—"}</span>
            </div>
        </div>
        `;
    });
    document.getElementById("mentorsList").innerHTML = html;
}

function renderCourseDetails(c) {
    document.getElementById("courseDescription").innerHTML = c.description || "—";
    document.getElementById("courseCategory").innerHTML    = c.category    || "—";
    document.getElementById("courseStatus").innerHTML      = "Активен: " + (c.status ? "✅ Да" : "❌ Нет");
    document.getElementById("courseSertificate").innerHTML = "Сертификат: " + (c.hasSertificate ? "✅ Да" : "❌ Нет");

    let count   = c.reviewsCount   || 0;
    let average = c.averageReviews || 0;

    document.getElementById("reviewsLabel").innerHTML    = "Отзывы (" + count + ")";
    document.getElementById("reviewsRatingTop").innerHTML = "⭐ " + average;
    document.getElementById("reviewsInfo").innerHTML      = "⭐ " + average + " (" + count + " отзывов)";

    document.getElementById("courseBadge").innerHTML = c.status ? "Active" : "Inactive";
}

function initDrawer() {
    let overlay          = document.getElementById("overlay");
    let close             = document.getElementById("close");
    let courseLogo        = document.getElementById("courseLogo");
    let courseName        = document.getElementById("courseName");
    let courseModule      = document.getElementById("courseModule");
    let courseLesson      = document.getElementById("courseLesson");
    let addMentorBtn      = document.getElementById("addMentorBtn");
    let cancelMentorBtn   = document.getElementById("cancelMentorBtn");
    let saveMentorBtn     = document.getElementById("saveMentorBtn");
    let mentorForm         = document.getElementById("mentorForm");
    let newMentorName      = document.getElementById("newMentorName");
    let newMentorPhone     = document.getElementById("newMentorPhone");
    let newMentorImg       = document.getElementById("newMentorImg");
    let drawerJournalBtn   = document.getElementById("drawerJournalBtn");
    let drawerEditBtn      = document.getElementById("drawerEditBtn");

    let cards = document.querySelectorAll(".card");

    cards.forEach(function (card, i) {
        card.onclick = function () {
            let c = courses[i];
            currentCourseIndex = i;
            overlay.classList.add("active");
            mentorForm.classList.add("hidden");

            // collapse all accordion panels each time a new course opens
            document.querySelectorAll(".accordion-panel").forEach(function (p) {
                p.classList.add("hidden");
            });
            document.querySelectorAll(".accordion-item.open").forEach(function (it) {
                it.classList.remove("open");
            });

            courseLogo.src         = c.logo    || DEFAULT_COURSE_IMG;
            courseName.innerHTML   = c.name    || "-";
            courseModule.innerHTML = c.module  || "—";
            courseLesson.innerHTML = c.lessons || "—";

            renderCourseDetails(c);
            renderMentors(getTeachers(c));
        };

        let editBtn = card.querySelector(".edit");
        editBtn.onclick = function (event) {
            event.stopPropagation();
            localStorage.setItem("courseId", courses[i].id);
            window.location.href = "edit.html";
        };

        let journalBtn = card.querySelector(".journal");
        journalBtn.onclick = function (event) {
            event.preventDefault();
            event.stopPropagation();
            localStorage.setItem("courseId", courses[i].id);
            window.location.href = "journal.html";
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

    drawerEditBtn.onclick = function (event) {
        event.preventDefault();
        if (currentCourseIndex === null) return;
        localStorage.setItem("courseId", courses[currentCourseIndex].id);
        window.location.href = "edit.html";
    };

    drawerJournalBtn.onclick = function (event) {
        event.preventDefault();
        if (currentCourseIndex === null) return;
        localStorage.setItem("courseId", courses[currentCourseIndex].id);
        window.location.href = "journal.html";
    };

    // Accordion toggle
    document.querySelectorAll(".accordion-item").forEach(function (item) {
        item.onclick = function () {
            let targetId = item.getAttribute("data-target");
            let panel = document.getElementById(targetId);
            let isOpen = item.classList.contains("open");

            item.classList.toggle("open");
            if (panel) panel.classList.toggle("hidden", isOpen);
        };
    });

    addMentorBtn.onclick = function (event) {
        event.preventDefault();
        mentorForm.classList.remove("hidden");
    };

    cancelMentorBtn.onclick = function () {
        mentorForm.classList.add("hidden");
        newMentorName.value = "";
        newMentorPhone.value = "";
        newMentorImg.value = "";
    };

    saveMentorBtn.onclick = function (event) {
        event.preventDefault();
        if (currentCourseIndex === null) return;

        let name = newMentorName.value.trim();
        let phone = newMentorPhone.value.trim();
        let img = newMentorImg.value.trim();

        if (!name) {
            alert("Имя преподавателя обязательно");
            return;
        }

        let course = courses[currentCourseIndex];
        let teachers = getTeachers(course);
        teachers.push({ name: name, phone: phone || "—", img: img || DEFAULT_MENTOR_IMG });

        saveMentorBtn.innerHTML = "Сохранение...";

        fetch(API + "/" + course.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teachers: teachers })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (updatedCourse) {
                courses[currentCourseIndex] = updatedCourse;
                renderMentors(getTeachers(updatedCourse));
                mentorForm.classList.add("hidden");
                newMentorName.value = "";
                newMentorPhone.value = "";
                newMentorImg.value = "";
            })
            .catch(function () {
                alert("Не удалось сохранить преподавателя. Попробуйте снова.");
            })
            .finally(function () {
                saveMentorBtn.innerHTML = "Сохранить";
            });
    };
}