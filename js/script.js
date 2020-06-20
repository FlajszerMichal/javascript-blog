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

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  /* klucz atrybut - google -> pobrac atrybut z elementu */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  
  const targetArticle = document.querySelector(articleSelector);
  
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks(){

    /* remove contents of titleList */

    const titleList = document.querySelector('optTitleListSelector');

    function clearMessages(){
      titleList.innerHTML = '';
    }

    const articles = document.querySelectorAll('optArticleSelector');

    /* for each article */

    let html = '';

    for (let article of articles) {
  
      /* get the article id */

      const articleId = article.getAttribute('id');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
      /* get the title from the title element */
  
      /* create HTML of the link */

      const linkHTML = 'id' + articleId + 'title' + articleTitle + 'titleList';
      console.log ('poprawny kod html');

      /* insert link into titleList */

      html = html + linkHTML;

      titleList.innerHTML = html;

    }

    

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
 
    }
  }
  
  generateTitleLinks();