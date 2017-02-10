(function(){
  'use strict'

  angular
    .module("adminClient")
    .factory('staging', staging)

  function staging($http, $filter, $log) {    
    $log.debug("-=== Staging Service ===-")

    var staticData

    var services = {  
      promise:        promise,
      articles:       getArticles,
      article:        getArticle,
      deleteArticle:  deleteArticle,
      saveArticle:    saveArticle,
      addLanguageToArticle: addLanguageToArticle,
      removeLanguageFromArticle: removeLanguageFromArticle, 
      pages:          getPages,
      page:           getPage,
      deletePage:     deletePage,
      savePage:       savePage,
      users:          getUsers,
      user:           getUser,
      saveUser:       saveUser,
      deleteUser:     deleteUser,
      settings:       settings,
      setting:        getSetting,
      removeLanguage: removeLanguage,
      addLanguage:    addLanguage,
      login:          login
    }
    
    var promise = $http
      .get('app/staging.data.json')
      .success(function(response){
        staticData = response; 
        $log.debug("-== Staging File Loaded ==-")
        $log.debug(staticData)
      })

    //$log.debug(staticData)
    return services

    // ARTICLES

    function getArticles() {
      var currentArticles = staticData.articles
      return currentArticles
    }

    function getArticle(id, lang){
      var currentArticle = $filter('filter')(staticData.articles, {id: id})[0];
      var articleLanguages = []
      if (lang != null) {
        var currentContent = $filter('filter')(currentArticle.content, {lang: lang})[0];  
        for (var i = 0; i < currentArticle.content.length; i++) {
          articleLanguages.push(currentArticle.content[i].lang)
        };
        angular.extend(currentArticle, currentContent)
        currentArticle.lang = articleLanguages
      };
      return currentArticle
    }

    function deleteArticle(id, deleted) { 
      var article = getArticle(id)
      var index = staticData.articles.indexOf(article)
      staticData.articles.splice(index, 1)
      deleted(staticData.articles) 
    }

    function saveArticle(data, id, lang, saved, error) {
      if(data.title == null){
        error({msg: "Please enter post title, before saving!"})
        return 
      }
      
      if (data.page == null) {
        error({msg: "Please select a page for this article!"})
        return 
      }

      var articleData = {  
        title:     data.title,
        page:      data.page,
        author:    "Simun Strukan",
        date:      moment().format('DD.MM.YYYY, HH:mm'),
        published: false,
        languages: [$filter('filter')(staticData.settings.languages, {code: lang})[0]],
        content:    {}
      }

      articleData.content[lang] = {
        title:       data.title,
        frontMatter: data.frontMatter,
        mainMatter:  data.mainMatter,
      }
      
      if (id == null) {
        var id = Math.max.apply(this,$.map(staticData.articles, function(article){ return article.id; }));
        id++
        articleData["id"] = id
        staticData.articles.push(articleData)
      }
      else {
        var article = getArticle(id)
        var index   = staticData.articles.indexOf(article)
        article.content[lang].title       = data.title
        article.content[lang].frontMatter =  data.frontMatter
        article.content[lang].mainMatter  =  data.mainMatter
        article.page                      = data.page        
        
        staticData.articles[index] = article
      }
      saved(staticData.articles)
    }

    function addLanguageToArticle(id, code, success, error){
      var article = getArticle(id)
      var index = staticData.articles.indexOf(article)

      var lang = $filter('filter')(staticData.settings.languages, {code: code})[0]

      article.languages.push(lang)
      article.content[lang.code] = {}
      staticData.articles[index] = article

      success(article)

    }

    function removeLanguageFromArticle(id, lang, success, error){
      var article = getArticle(id)
      var index = staticData.articles.indexOf(article)
      var langIndex = article.languages.indexOf(lang) 
      
      delete article.content[lang.code]
      article.languages.splice(langIndex, 1)
      success(article)
    }

    // PAGES

    function getPages() {
      return staticData.pages
    }

    function getPage(id) {
      var filteredPage
      var search = function(array, id) {
        var page = $filter('filter')(array, {id: id})[0];
        if (page != undefined) {
          filteredPage = page
        }
        else {
          for (var i = 0; i <= array.length - 1; i++) {
            if (Array.isArray(array[i].subPages) && array[i].subPages.length > 0) {
              search(array[i].subPages, id)
            }
          };  
        }
      }

      search(staticData.pages, id)
      return filteredPage
    }

    function deletePage(id, deleted) {
      var page = getPage(id)
      
      var search = function(array, obj){
        var index = array.indexOf(obj)
        if(index != -1){
          array.splice(index, 1)
        }
        else {
          for (var i = 0; i <= array.length - 1; i++) {
            if (Array.isArray(array[i].subPages) && array[i].subPages.length > 0) {
              search(array[i].subPages, obj)
            }  
          };
        } 
      }
      search(staticData.pages, page)
      deleted(staticData.pages)
    }

    function savePage(data, id, saved, error) {

      if(data.title == null){
        error({msg: "Please enter page title, before saving"})
        return
      }

      if (id == null) {
        var id = Math.max.apply(this,$.map(staticData.pages, function(page){ return page.id; }));
        id++
        var pageData = {
          id: id,
          title: data.title,
          author: "Simun Strukan",
          date:   moment().format('DD.MM.YYYY, HH:mm'),
          published: false,
          articlesCount: 0
        }
        staticData.pages.push(pageData)   
      }
      else{
        var page = getPage(id)
        var index = staticData.pages.indexOf(page)
        page.title = data.title
        staticData.pages[index] = page
      }
      
      saved(staticData.pages)
    }

    // USERS

    function login(username, password, success, error) {
      success({})
    }

    function getUsers() {
      return staticData.users
    }

    function getUser(id) {
      return $filter('filter')(staticData.users, {id: id})[0];
    }

    function saveUser(data, id, saved, error) {
      if (data.password != null && data.passwordConfirm != null){
        if (data.password.length > 0 && data.passwordConfirm.length > 0) {
          if(data.password != data.passwordConfirm){
            error({msg: "Passwords do not match!"})
            return
          }
        }  
      }
      
      if (id == null) {
        var id = Math.max.apply(this,$.map(staticData.pages, function(page){ return page.id; }));
        id++
        var userData = {
          id: id,
          firstName:      data.firstName,
          lastName:       data.lastName,
          email:          data.email,
          secondaryEmail: data.secondaryEmail,
          role: "Admin",
          status: 1
        }
        staticData.users.push(userData)
      }
      else {
        
        var user  = getUser(id)
        var index = staticData.users.indexOf(user) 
        user.firstName = data.firstName
        user.lastName = data.lastName
        user.email = data.email
        user.secondaryEmail = data.secondaryEmail
        staticData.users[index] = user

      }
      saved(staticData.users[index])
    }

    function deleteUser(id, deleted, error) {
      var user = getUser(id)
      var index = staticData.users.indexOf(user)
      staticData.users.splice(index, 1)
      deleted(staticData.users) 
    }

    // SETTINGS

    function settings() { 
      return staticData.settings
    }

    function getSetting(key) {
      if (key == null) {
        return staticData.settings
      }
      else {
        return staticData.settings[key] 
      }
    }

    function addLanguage(code, added, error) {
      $http
        .get('app/common/languages/languages.json')
        .success(function(response){
          var commonLanguages = response
          var language = $filter('filter')(commonLanguages, {code: code})[0];
          staticData.settings.languages.push(language)
          added(staticData.settings.languages)
        })
      
    }

    function removeLanguage(lang, deleted, error){
      var index = staticData.settings.languages.indexOf(lang)
      staticData.settings.languages.splice(index, 1)
      deleted(staticData.settings.languages)
    }

  }

})()

