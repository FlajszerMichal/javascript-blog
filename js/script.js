'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('to jest mój event', event.target);

  /* remove class 'active' from all articlelinks  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  const clickedLink = event.target;
  clickedLink.classList.add('active');

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.titles a.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  /* klucz atrybut - google -> pobrac atrybut z elementu */

  const articleSelector = document.querySelectorAll('href');
  console.log('Link was clicked');

  var a = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  
  const targetArticle = document.querySelector('href');
  console.log('clickedElement');

  /* add class 'active' to the correct article */
  targetArticle.clickedElement.add('active');

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}