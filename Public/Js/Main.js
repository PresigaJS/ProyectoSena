document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('username').value;
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;
    const proveedor = 'local';
    const id_proveedor = null;

    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, correo, contraseña, proveedor, id_proveedor })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  });
  
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const correo = document.querySelector('.email-2').value;
    const contraseña = document.querySelector('.password-2').value;
  
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, contraseña })
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  });
