const API = "https://63849dde3fa7acb14ffada13.mockapi.io/api/Courses";

function save() {

    const data = {
        name:        document.getElementById("nazvanie").value.trim(),
        description: document.getElementById("opisanie").value.trim(),
        logo:        document.getElementById("logotip").value.trim(),
        sertifikat:  document.getElementById("sertifikat").checked,
        module:      document.getElementById("moduli").value.trim(),
        lessons:     document.getElementById("uroki").value.trim(),
        teacher:     document.getElementById("uchitel").value.trim(),
        avatar:      document.getElementById("avatar").value.trim(),
        category:    document.getElementById("kategoriya").value.trim(),
        status:      document.getElementById("status").checked,
    };

    if (!data.name) {
        alert("Nomi kursro vorid kuned!");
        document.getElementById("nazvanie").focus();
        return;
    }

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function() {
        alert("Kursi nav vorid shud!");
        window.location.href = "./index.html";
    })
    .catch(function() {
        alert("Xato! Kurs vorid nashud.");
    });

}

function otmenit() {
    window.location.href = "./index.html";
}