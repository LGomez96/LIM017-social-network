/* eslint-disable import/no-cycle */
import { onNavigate } from '../main.js';
import {
  logOutSocialTravel, addPost, onGetPostInRealTime, deletePost,
} from '../firebaseAuth.js';

export const feed = () => {
  const feedDiv = document.createElement('div');
  const templateFeed = `
  <section id= "feed" class = "contenedorTextos">

  <nav class="Menu" id="Menu">
    <div id = "introduction">
    <img src="./imgns/Vectorlogo.svg" class= "logo">
    <a title="Mi perfil" href=""><img src="./imgns/blank-profile-picture.webp" class = "profile" alt="Mi Perfil" /></a>
    </div>
    <div id = "regards">
     <span>Hola + '_______' </span>
    </div>
  </nav>

  <div id = "main">
  <h2 class="containerH2"><center>Descubre un nuevo lugar para visitar</center></h2>

  <div id = "btnPostAndPhoto">
  <img src = "./imgns/blank-profile-picture.webp" id = "photoProfile" width = "40px" height = "40px">
  <button class = "cta" > ¿Quiéres contarnos tu experiencia? </button>
  </div>
  </div>

  <div class ="modal-container">
  <div id = "containerPost" class = "modal modal-close">

  <div class = "textAndSelect">
  <span class = "textModal">Escribe tu reseña</span>
  <div id = "categoriesBtns" class ="filter">
  <select id= "categories">
  <option>Lugares</option>
  <option>Hospedajes</option>
  <option>Restaurantes</option>
  <option>Bares</option>
  </select>
  </div>
  </div>
  <form id ="postIt" class ="postFedd">
  <input type = "text" class = "title" placeholder = ¿Cómo te gustaría nombrar a tu reseña?" id = "title">
  <input type = "text" class = "inputPost" placeholder = "¿Qué es lo más impresionante de tu visita? Cuéntanos...">

  <p class = "close">X</p>

  <div id = "containerIconTransports">
  <span>Selecciona el/los transporte/s que usaste para llegar aquí</span>
  <div id = "TransportButtons">

   <i id = "walk"><img class = "transIcon" src = "./imgns/transportation_walk.svg"></i>
   <i id = "car"><img class = "transIcon" src = "./imgns/transportation_car.svg"></i>
   <i id = "boat"><img class = "transIcon" src = "./imgns/transportation_boat.svg"></i>
   <i id = "train"><img class = "transIcon" src = "./imgns/transportation_train.svg"></i>
   <i id = "bicycle"><img class = "transIcon" src = "./imgns/transportation_bicycle.svg"></i>
   <i id = "motorcycle"><img class = "transIcon" src = "./imgns/transportation_motorcycle.svg"></i>
  </div>
  </div>
  <div class = "postButtons">
  <button type = "button" id = "postPhotosButton" class = "modalButton">Fotos</button>
  <input type = "submit"  id = "postButton" class = "modalButton" value = "Publicar">
  </div>
  </form>
  <div id = "postConfirm" class= "hide"> 
  <p> ¿Estás seguro de publicar tu reseña? </p>
  <div id= "btnYoN">
  <button id="postInFeed" class = "yoNButton"> Sí </button>
  <button id="descartPost" class = "yoNButton"> No </button>
  </div>
  </div>
  </div>
  </div>

  <footer id="footer">
    <span class="content_1"><a>© SOCIAL TRAVEL - Desarrollado por Briggtte B. y Linda G.</a>
      <div class="contacto"><a href="#" class="fas fa-phone-alt"></a>
        <a>01-123456</a>
      </div>
      <div class="contacto"><a href="#" class="fas fa-phone-alt"></a>
        <a>02-123456</a>
      </div>

      <div class="Box">
        <h2>SIGUENOS</h2>
        <ul class="red-social">
          <li><a href="" class="fa fa-facebook"></a></li>
          <li><a href="" class="fa fa-instagram"></a></li>
          <li><a href="" class="fa fa-twitter"></a></li>
          <li><a href="" class="fa fa-youtube"></a></li>
        </ul>
      </div>
    </span>
    
      <div class="content_3">
      <img src="./imgns/Vectorlogo.svg">
      <small>©2022 - Todos los derechos Reservados.</small>
      </div>
    </span>
  </footer>

  </section>
  `;
  
  feedDiv.innerHTML += templateFeed;

  const cerrar = feedDiv.querySelectorAll('.close')[0];
  const abrir = feedDiv.querySelectorAll('.cta')[0];
  const modal = feedDiv.querySelectorAll('.modal')[0];
  const modalC = feedDiv.querySelectorAll('.modal-container')[0];

  abrir.addEventListener('click', (e) => {
    e.preventDefault();
    modalC.style.opacity = '1';
    modalC.style.visibility = 'visible';
    modal.classList.toggle('modal-close');
  });

  cerrar.addEventListener('click', () => {
    modal.classList.toggle('modal-close');
    setTimeout(() => {
      modalC.style.opacity = '0';
      modalC.style.visibility = 'hidden';
    }, 800);
  });

  window.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target === modalC) {
      modal.classList.toggle('modal-close');
      setTimeout(() => {
        modalC.style.opacity = '0';
        modalC.style.visibility = 'hidden';
      }, 800);
    }
  });

  const sendPost = feedDiv.querySelector('#postButton');
  sendPost.addEventListener('click', (e) => {
    e.preventDefault();
    const post = feedDiv.querySelector('.inputPost').value;
    const title = feedDiv.querySelector('.title').value;
    const categories = feedDiv.querySelector('#categories').value;

    if (post !== '') {
      const postConfirm = feedDiv.querySelector('#postConfirm');
      postConfirm.classList.remove('hide');
      postConfirm.classList.add('postConfirm');

      const descartPost = feedDiv.querySelector('#descartPost');
      const postInFeed = feedDiv.querySelector('#postInFeed');

      descartPost.addEventListener('click', () => {
        e.preventDefault();
        modal.classList.toggle('modal-close');
        setTimeout(() => {
          modalC.style.opacity = '0';
          modalC.style.visibility = 'hidden';
          postConfirm.classList.add('hide');
          postConfirm.classList.remove('postConfirm');
        }, 800);
      });
      postInFeed.addEventListener('click', () => {
        e.preventDefault();
        alert(post);
        addPost(post, title, categories);
        modal.classList.toggle('modal-close');
        setTimeout(() => {
          modalC.style.opacity = '0';
          modalC.style.visibility = 'hidden';
        }, 800);
      });
    }
    const postIt = feedDiv.querySelector('#postIt');
    postIt.reset();
  });

  const btnLogOut = document.createElement('a');
  btnLogOut.setAttribute('href', '');
  btnLogOut.id = 'logOut';
  btnLogOut.className = 'btnLogOut';
  btnLogOut.textContent = 'Cerrar Sesión';

  feedDiv.insertAdjacentElement('beforeend', btnLogOut);

  const goToProfile = feedDiv.querySelector('#photoProfile');
  goToProfile.addEventListener('click', () => {
    onNavigate('/profile');
  });

  const logOut = feedDiv.querySelector('#logOut');
  logOut.addEventListener('click', (e) => {
    e.preventDefault();
    logOutSocialTravel();
    onNavigate('/');
  });

  const profileDiv = document.createElement('div');
  profileDiv.id = 'profileDiv';

  const postCreatedByUser = document.createElement('div');
  postCreatedByUser.id = 'postCreatedByUser';
  postCreatedByUser.className = 'cardsPosted';

  window.addEventListener('DOMContentLoaded', () => {
    onGetPostInRealTime((querySnapShot) => { // console.log(querySnapShot);
      // variable con string vacio para que cada que se recorra añadamos info al contenedor
      let html = '';

      querySnapShot.forEach((doc) => {
        html += `
    <section class = 'containerCards'>
    <div id = 'editPost'>

    <div class = "infoOfPost">
    <div class = "titleOfData">Santuario de Reserva Nacional</div>
    <div class = "dateOfData">22/04/22 11:54 hs.</div>
    </div>
  
    <button id = "editPostButton" value =""> ... </button>
    <button id = "edit"> Editar </button>
    <button class ="delete" data-id = "${doc.id}"> Borrar </button>
    </div>


    <div class = 'cardsOfData'> ${doc.data().post}</div>
    </section>
    `;
      });

      // creamos este div para limpiar el html
      postCreatedByUser.innerHTML = html;

      const btnDelete = postCreatedByUser.querySelectorAll('.delete');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deletePost(dataset.id);
        });
      });
    });
  });
  const callToMain = feedDiv.querySelector('#main');
  callToMain.insertAdjacentElement('beforeend', postCreatedByUser);

  return feedDiv;
};
