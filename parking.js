let ESTACIONAMIENTO_DATA = []; // Esta variable ahora es global y accesible en todo el archivo

cargarEstadoEstacionamiento();

async function cargarEstadoEstacionamiento() {
    try {
      const response = await axios.get('http://localhost:3000/api/estacionamientos');
      const data = response.data;
      ESTACIONAMIENTO_DATA = data; 
      pintarParking(); 
    } catch (error) {
      console.error('Error al cargar los datos de los parkings:', error);
    }
  }
  

  function pintarParking() {
    ESTACIONAMIENTO_DATA.forEach(espacio => {
        let idEspacio = 'p' + espacio.numero;
        let elementoEspacio = document.getElementById(idEspacio);

        if (elementoEspacio) {
            elementoEspacio.style.backgroundColor = espacio.disponible ? 'green' : 'red';
        }
    });
}

function generarMatriculaEspana() {
    const numeros = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const letrasExcluidas = ['A', 'E', 'I', 'O', 'U', 'Ñ'];
    let letras = '';
    while (letras.length < 3) {
        let letraAleatoria = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
        if (!letrasExcluidas.includes(letraAleatoria)) {
            letras += letraAleatoria;
        }
    }
    return numeros + ' ' + letras;
}


async function entradacoche() {
  const matricula = generarMatriculaEspana();
  console.log(matricula);
  try {
    const response = await axios.post('http://localhost:3000/api/ingresar', {
      matricula: matricula
    });
    const numeroplaza = response.data.aparcamiento.numero;
    console.log(numeroplaza);
    pintarUnParking(numeroplaza, false);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Aquí se maneja el caso de error cuando no hay plazas disponibles
      alert('No hay plazas disponibles.');
    } else {
      console.error('Error al ingresar el ticket:', error);
    }
  }
}


async function salidaCoche() {
  try {
    const response = await axios.post('http://localhost:3000/api/salir');
    const numeroplaza = response.data.aparcamiento;
    console.log(numeroplaza);
    
    // Verificar si el número de plaza es -1, lo cual indica que no hay tickets disponibles
    if (numeroplaza === -1) {
      alert('No hay coches en el parking para procesar.');
    } else {
      // Proceder normalmente si hay una plaza disponible
      pintarUnParking(numeroplaza, true);
    }
  } catch (error) {
    console.error('Error al procesar la salida del coche:', error);
    alert('Ocurrió un error al procesar la solicitud.');
  }
}


  function pintarUnParking(espacio, disponible) {
    let idEspacio = 'p' + espacio;
    let elementoEspacio = document.getElementById(idEspacio);
    console.log(idEspacio+" "+ (disponible ? "Liberado" : "Ocupado"));
    if (elementoEspacio) {
      elementoEspacio.style.backgroundColor = disponible ? 'green' : 'red';
  }
}