let map = L.map('map').setView([18.5204, 73.8567], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

let markers = [];

function loadWorkers() {
  fetch('/api/workers')
  .then(res => res.json())
  .then(data => {
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    data.forEach(w => {
      let m = L.marker([w.lat, w.lng]).addTo(map)
      .bindPopup(`${w.name} - ${w.service}`);
      markers.push(m);
    });
  });
}

setInterval(loadWorkers, 3000);
loadWorkers();

document.getElementById("bookingForm").onsubmit = async (e) => {
  e.preventDefault();

  await fetch('/api/bookings', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: bname.value,
      phone: bphone.value,
      address: baddress.value,
      service: bservice.value,
      date: bdate.value
    })
  });

  alert("Booked!");
};

document.getElementById("workerForm").onsubmit = async (e) => {
  e.preventDefault();

  await fetch('/api/workers', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: wname.value,
      phone: wphone.value,
      service: wservice.value,
      lat: lat.value,
      lng: lng.value
    })
  });

  alert("Worker Added!");
  loadWorkers();
};

function selectService(service) {
  document.getElementById("bservice").value = service;

  document.getElementById("serviceDetails").innerHTML = `
    <h3>${service}</h3>
    <p>Premium quality ${service} service.</p>
    ⭐⭐⭐⭐⭐ (4.8 rating)
    <p>"Excellent service!"</p>
  `;
}

async function loadAdmin() {
  let bookings = await fetch('/api/bookings').then(r => r.json());
  let workers = await fetch('/api/workers').then(r => r.json());

  document.getElementById("admin").innerHTML = `
    <h3>Bookings</h3>
    ${bookings.map(b => `<p>${b.name} - ${b.service}</p>`).join("")}
    <h3>Workers</h3>
    ${workers.map(w => `<p>${w.name} - ${w.service}</p>`).join("")}
  `;
}

setInterval(loadAdmin, 3000);
loadAdmin();
