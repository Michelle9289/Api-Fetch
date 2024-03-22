const button = document.getElementById('btn');
console.log("entra aqui ")
button.addEventListener("click", solicitudFetch);
console.log("entra aqui ")
let data = document.getElementById("content");
const localStorageTimeLimit_s = 60;
const pasoConIntervalo = () => {
    //setInterval( fncCallback, time_ms  );
    setInterval(
      () =>
        console.log(
          `Hola se ejecuto al minuto ${new Date().toLocaleString()} se remueve informacion en localstorage`
        ),
        localStorage.removeItem("users"),
      60000
    ); 
  };

function solicitudFetch() {
const users = JSON.parse(localStorage.getItem("users"));
data.innerHTML = "";
console.log(users);

pasoConIntervalo();
console.log(typeof users);
date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;
day = date.getDate();
hours = date.getHours();
minutes = date.getMinutes();
seconds = date.getSeconds();
const fechaSolicitud=year +"/"+ month +"/"+ day +" "+ hours +":"+ minutes +":"+ seconds;
localStorage.setItem("FechaHraSolicitud",fechaSolicitud);
console.log("hora fecha", fechaSolicitud)
    if (users && users.time > Date.now()) {
        
    fetchData(users.data);
    }
    else {
        data.innerHTML = `
        <tr>
            <td class="col-md-1 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                        </div>
                </div>
            </td>

            <td class=" col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-2 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>
        </tr>
    `;

    fetch("https://reqres.in/api/users?delay=3")
        .then ((msje) => {
            if (msje.status == 200) {
                console.log("Estado de la peticion: Realizada");
                return msje.json();
            }

        })
        .then((users) => {
            const usersData = {
                data: users.data,
                time: Date.now() + 60000,
            };
            data.innerHTML = "";

            localStorage.setItem("users", JSON.stringify(usersData));
            fetchData(users.data)

        })
        .catch ( err => {
            console.log("Error en la peticion:", err);
            console.warn("Estado de la peticion:", err.status);
    });

    }
}


function fetchData(user) {
    for (let i = 0; i <user.length; i++) {
        data.innerHTML += `
            <tr class="users container-sm text-center" >
                <td id="user-id" class="col-md-1 table-primary"> ${user[i].id}</td>
                <td id="user-name" class="col-md-3 table-primary"> ${user[i].first_name}</td>
                <td id="user-lastname" class="col-md-3 table-primary"> ${user[i].last_name}</td>
                <td id="user-email" class="col-md-2 table-primary"> ${user[i].email}</td>
                <td id="user-avatar" class="col-md-3 table-primary"><img src="${user[i].avatar}" alt="${user[i].first_name}" class="rounded-circle " style="width: 65px"/></td>
            </tr>`;
    };
}

async function eliminarDatos(){
    const FechaHraSolicitud = localStorage.getItem("FechaHraSolicitud");
    date2 = new Date();
    year2 = date2.getFullYear();
    month2 = date2.getMonth() + 1;
    day2 = date2.getDate();
    hours2 = date2.getHours();
    minutes2 = date2.getMinutes();
    seconds2 = date2.getSeconds();
    const fechaSolicitud2=year2 +"/"+ month2 +"/"+ day2 +" "+ hours2 +":"+ minutes2 +":"+ seconds2;
    console.log("primera", FechaHraSolicitud, "segunda",fechaSolicitud2)
}

