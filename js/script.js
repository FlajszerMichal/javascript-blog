'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudCLassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

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

function generateTitleLinks(customSelector = '') {

  const articles = document.querySelectorAll(optArticleSelector);

  const titleList = document.querySelector(optTitleListSelector);

  /* for each article */

  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */

    // const linkHTML = 'id' + articleId + 'title' + articleTitle + 'titleList';
    // const linkHTML = '<li><a href="' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  }

  for (let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times ');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    }

    if(tags[tags] < params.min){
      params.min = tags[tag];
    }
  }
  return params;

};

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const wrapperTags = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray){

      /* generate HTML of the link */

      // const linkHTML = 'id' + tag + 'title' + articleTags + 'articleList';

      // const linkHTML = '<li><a href="' + articleTags + '">' + tag + '</a></li>';
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags.hasOwnProperty[tag]){

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    wrapperTags.innerHTML = html;

    /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector('.tags');

  const tagParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */

  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */

  for (let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);

}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-','');

  /* find all tag links with class active */

  const tagLink = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let tagLinks of tagLinks){

    /* remove class active */

    tagLinks.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const alltagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let alltagLinks of alltagLinks){

    /* add class active */

    alltagLinks.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

tagClickHandler();

function addClickListenersToTags(){

  /* find all links to tags */

  const alltagLinks = document.querySelectorAll('a.[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let alltagLinks of alltagLinks){

    /* add tagClickHandler as event listener for that link */

    alltagLinks.addEventListener('click', titleClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){

  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const wrapperAuthor = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleAuthors = article.getAttribute('data-author');

    /* generate HTML of the link */

    //  const linkHTML = 'id' + articleAuthors + 'title' + articleAuthors + 'articleList';

    // const linkHTML = '<a href="#' + articleAuthors + '">' + articleAuthors  + '</a>';
    const linkHTMLData = { id: articleAuthors, title: articleAuthors };
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */

    html = html + linkHTML;

    if (!allAuthors[articleAuthors]) {
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;
    }

    /* insert HTML of all the links into the tags wrapper */

    wrapperAuthor.innerHTML = html;

    /* END LOOP: for every article: */

  }

  const authorList = document.querySelector('.authors');

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function addClickListenersToAuthors(){

  /* find all links to tags */

  const allAuthorLinks = document.querySelectorAll('post-author');

  /* START LOOP: for each link */

  for (let allAuthorLinks of allAuthorLinks){

    /* add tagClickHandler as event listener for that link */

    allAuthorLinks.addEventListener('click', titleClickHandler);

    /* END LOOP: for each link */

  }

}

addClickListenersToAuthors();

function authorClickHandler(){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */

  const author = href.replace('#author-','');

  /* find all tag links with class active */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */

  for (let authorLinks of authorLinks){

    /* remove class active */

    authorLinks.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const allauthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let allauthorLinks of allauthorLinks){

    /* add class active */

    allauthorLinks.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author~="' + author + '"]');

}



