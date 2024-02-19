document.addEventListener('DOMContentLoaded', function() {
  axios.get('http://localhost:3000/api/tickets-cerrados')
    .then(function (response) {
      const tickets = response.data;
      let tableBody = document.querySelector('table tbody');
      tableBody.innerHTML = ''; // Limpiar el contenido actual de la tabla
      tickets.forEach(ticket => {
        let fechaEntrada = new Date(ticket.fecha_entrada).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        let fechaSalida = ticket.fecha_salida ? new Date(ticket.fecha_salida).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : 'En curso';
        let row = tableBody.insertRow();
        row.innerHTML = `
          <td>${ticket.matricula}</td>
          <td>${fechaEntrada}</td>
          <td>${fechaSalida}</td>
          <td>${ticket.total_pagar ? (ticket.total_pagar + ' €') : 'En curso'}</td>
        `;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});



// Función para obtener los ingresos totales y mostrarlos en el input
function obtenerIngresosTotales() {
  axios.get('http://localhost:3000/api/ingresos-totales')
    .then(function (response) {
      const ingresosTotales = response.data.ingresosTotales + ' €';
      console.log(ingresosTotales);
      document.getElementById('ingresosTotales').value = ingresosTotales;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  obtenerIngresosTotales();
  // ... el resto del código existente ...
});
