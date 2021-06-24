function createAc() {
  fetch('http://localhost:80/createAc',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: document.getElementById('email1').value,
      password: document.getElementById('password1').value,
      phoneNum: document.getElementById('phone-number').value,
      address: document.getElementById('address').value
    })
  })
  .then(response => response.text())
  .then(body => document.querySelector('.result').innerHTML = `<h3>Result</h3><p>${body}</p>`)

  document.getElementById('email1').value = '';
  document.getElementById('password1').value = '';
  document.getElementById('phone-number').value = '';
  document.getElementById('address').value = '';
}

function login() {
  fetch('http://localhost:80/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: document.getElementById('email2').value,
      password: document.getElementById('password2').value
    })
  })
  .then(response => response.text())
  .then(body => document.querySelector('.result').innerHTML = `<h3>Result</h3><p>${body}</p>`)

  document.getElementById('email2').value = '';
  document.getElementById('password2').value = '';
}

function createCon() {
  fetch('http://localhost:80/createCon',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: `bearer ${document.getElementById('token1').value}`,
      clinic: document.getElementById('clinic').value,
      dName: document.getElementById('d-name').value,
      pName: document.getElementById('p-name').value,
      diag: document.getElementById('diag').value,
      medic: document.getElementById('medic').value,
      conFee: document.getElementById('con-fee').value,
      date: document.getElementById('date').value,
      followUp: document.getElementById('follow-up').value
    })
  })
  .then(response => response.text())
  .then(body => document.querySelector('.result').innerHTML = `<h3>Result</h3><p>${body}</p>`)

  document.getElementById('token1').value = '';
  document.getElementById('clinic').value = '';
  document.getElementById('d-name').value = '';
  document.getElementById('p-name').value = '';
  document.getElementById('diag').value = '';
  document.getElementById('medic').value = '';
  document.getElementById('con-fee').value = '';
  document.getElementById('date').value = '';
  document.getElementById('follow-up').value = '1';
}

function listCon() {
  fetch(`http://localhost:80/listCon`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: `bearer ${document.getElementById('token2').value}`,
      from: document.getElementById('from').value,
      to: document.getElementById('to').value,
      limit: document.getElementById('limit').value,
      offset: document.getElementById('offset').value,
    })
  })
  .then(response => response.json())
  .then(body => {
    if (body.str)
      document.querySelector('.result').innerHTML = `<h3>Result</h3><p>${body.str}</p>`;
    else {
      let result = '<h3>Result</h3><table><tr><th>Clinic</th><th>Doctor Name</th><th>Patient Name</th><th>Diagnosis</th><th>Medication</th><th>Consultation Fee</th><th>Date</th><th>Follow Up</th></tr>';

      for (let record of body) {
        result += `<tr><td>${record.clinic}</td><td>${record.doctor_name}</td><td>${record.patient_name}</td><td>${record.diagnosis}</td><td>${record.medication}</td><td>${record.consultation_fee}</td><td>${record.date}</td><td>${record.follow_up ? 'Yes' : 'No'}</td></tr>`;
      }

      document.querySelector('.result').innerHTML = result;
    }
  })

  document.getElementById('token2').value = '';
  document.getElementById('from').value = '';
  document.getElementById('to').value = '';
  document.getElementById('limit').value = '';
  document.getElementById('offset').value = '';
}