// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js'; /* la fx para crear el url. */
import { LoginByEmailPassword } from '../firebaseAuth.js';

export const Login = () => {
  const homeDiv = document.createElement('div');

  const form = document.createElement('div');
  form.className = 'form';
  form.textContent = 'Aquí van los hijos';

  const Welcome = document.createElement('h1');
  Welcome.textContent = 'Bienvenido'; /* Revisar cómo hacer independiente este label */
  Welcome.id = 'Welcome';
  Welcome.className = 'Welcome';

  const label1 = document.createElement('label');
  label1.textContent = 'Correo electrónico'; /* Revisar cómo hacer independiente este label */
  label1.id = 'label1';
  label1.className = 'label';

  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Ingresa tu correo electronico';
  inputEmail.type = 'email';
  inputEmail.id = 'inputEmail';

  const label2 = document.createElement('label');
  label2.textContent = 'Contraseña'; /* Revisar cómo hacer independiente este label */
  label2.id = 'label2';
  label2.className = 'label';

  const inputPass = document.createElement('input');
  inputPass.placeholder = 'Ingresa tu contraseña';
  inputPass.type = 'text';
  inputPass.id = 'inputPass';

  const btnLogin = document.createElement('button');
  btnLogin.id = 'btnLogin';
  btnLogin.className = 'btnLogin';
  btnLogin.textContent = 'Inicia Sesión';

  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Regresar al Home';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  homeDiv.insertAdjacentElement('beforeend', Welcome);
  homeDiv.insertAdjacentElement('beforeend', label1);
  homeDiv.insertAdjacentElement('beforeend', inputEmail);
  homeDiv.insertAdjacentElement('beforeend', label2);
  homeDiv.insertAdjacentElement('beforeend', inputPass);
  homeDiv.insertAdjacentElement('beforeend', btnLogin);
  homeDiv.insertAdjacentElement('beforeend', buttonHome);

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const email = homeDiv.querySelector('#inputEmail').value;
    const password = homeDiv.querySelector('#inputPass').value;
    LoginByEmailPassword(email, password);
    // if (LoginByEmailPassword === true) {
    //   onNavigate('/feed');
    // }
  });

  return homeDiv;
};

/* export const LoginWithGoogle = () => {
  const homeDiv = document.createElement('div');
  homeDiv.textContent = 'AQUI VA el feed';

  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Cerrar sesión';
  buttonHome.className = 'signOut';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  homeDiv.appendChild(buttonHome);

  return homeDiv;
}; */
