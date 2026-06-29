
const API = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
    fetch(API + "/" + "id" )
        .then(function(response){
            return response.json();
        })
        .then(function(course){
            document.getElementById("nazvanie").value   = course.name       || "";
            document.getElementById("opisanie").value   = course.description|| "";
            document.getElementById("logotip").value    = course.logo       || "";
            document.getElementById("sertifikat").value = course.sertifikat || "";
            document.getElementById("moduli").value     = course.module     || "";
            document.getElementById("uroki").value      = course.lessons    || "";
            document.getElementById("uchitel").value    = course.teacher    || "";
            document.getElementById("avatar").value     = course.avatar     || "";
            document.getElementById("kategoriya").value = course.category   || "";
            document.getElementById("status").value     = course.status     || "";
        })

        .catch(function(){
            alert("Kurs va Malumotho pur karda nashud!")
        });
}

function save (){
    const data = {
        name:        document.getElementById("nazvanie").value.trim(),
        description: document.getElementById("opisanie").value.trim(),
        logo:        document.getElementById("logotip").value.trim(),
        sertifikat:  document.getElementById("sertifikat").value.trim(),
        module:      document.getElementById("moduli").value.trim(),
        lessons:     document.getElementById("uroki").value.trim(),
        teacher:     document.getElementById("uchitel").value.trim(),
        avatar:      document.getElementById("avatar").value.trim(),
        category:    document.getElementById("kategoriya").value.trim(),
        status:      document.getElementById("status").value.trim(),
    };


    if (!data.name){
        alert("Nomi Kursro vorid kuned!");
        document.getElementById("nazvanie").focus();
        return;
    }

    if (id) {
        fetch (API + "/" + id,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })

            .then(function(){
                alert("Kurs bo Muvafaqiyat vorid Karda shud!")
                window.location.href = "./index.html";
            })
            .catch(function(){
                alert("Xatogi! Kurs vorid Nashud.")
            })

    }
    else {
        fetch(API,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(function(response){
            return response.json()
        })
        .then(function() {
        alert("Yangi kurs qo'shildi!");
        window.location.href = "./index.html";
         
        })
          .catch(function() {
             alert("Xatolik! Kurs qo'shilmadi.");
       });
    }
}

function otmenit() {
  window.location.href = "./index.html";
}