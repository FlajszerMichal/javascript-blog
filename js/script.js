'use strict';

function titleClickHandler(event){
  console.log('to jest mój event', event.target);

  /* remove class 'active' from all articlelinks  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  const clickedLink = event.target;
  clickedLink.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.titles A.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  /* klucz atrybut - google -> pobrac atrybut z elementu */
  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}