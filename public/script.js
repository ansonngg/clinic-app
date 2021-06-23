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
}

function login() {
  
}