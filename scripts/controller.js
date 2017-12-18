angular.module("authorList")
.controller("authorListCtrl",function ($scope,$rootScope) {


    //filter for finding book by title
    $scope.bookTitleForFinding = "";
    $scope.findBookThroughName = function (item) {
        if($scope.bookTitleForFinding !==""){
        return item.bookTitle == $scope.bookTitleForFinding;}
    };

    //author part
    //all author data from storage
    $scope.dataAuthor = saver_reader_author.readAuthor();
    //updating data about author in scope when they change
    $scope.$on("updateAuthorlist",function (event) {
        $scope.dataAuthor = saver_reader_author.readAuthor();
    });
    
    //author data for creation
    $scope.authorName = "";
    $scope.authorSecondName = "";
    $scope.authorLastName = "";
    $scope.authorBdate = "";

    //function for additions author information to storage
    $scope.addAutorToStorage = function () {
        if($scope.authorName !== "" &&
            $scope.authorSecondName !== "" &&
            $scope.authorLastName !== "" &&
            $scope.authorBdate !== "") {
            saver_reader_author.addAuthor($scope.authorName, $scope.authorSecondName,$scope.authorLastName,$scope.authorBdate);
            saver_reader_author.saveAuthor();

            $rootScope.$broadcast("updateAuthorlist");
            $rootScope.$broadcast("updateGeneralList");

            $scope.authorName = "";
            $scope.authorSecondName = "";
            $scope.authorLastName = "";
            $scope.authorBdate = "";
        }else{alert("Enter all value");};
    };

    /// Author edit part
    //deleting author and his book from storage
    $scope.removeAutor = function (authorID) {
      var tempIDOfBook = [];
      var tempLastNameAthor = "";
      for (var t=0, authorLength = $scope.dataAuthor.length;t<authorLength;t++){
          if(authorID==$scope.dataAuthor[t].id){
              tempLastNameAthor = $scope.dataAuthor[t].lastname;
              break;
          }
      }
      for(var i = 0, bookLength = $scope.dataBook.length; i<bookLength;i++){
          if($scope.dataBook[i].author == tempLastNameAthor){
              tempIDOfBook.push($scope.dataBook[i].id);
          }
      }
      for(var l = 0,temp = tempIDOfBook.length;l<temp;l++){
          saver_reader_book.removeBook(tempIDOfBook[l]);
          saver_reader_book.saveBook();
          $rootScope.$broadcast("updateBooklist");
          $rootScope.$broadcast("updateGeneralList");
      }
       saver_reader_author.removeAuthor(authorID);
       saver_reader_author.saveAuthor();
    };

    //open form for edition author information
    $scope.editInfoAboutAthor = function (authorID) {
        $scope.url3 = "supportingPages/editInfoAboutAthor.html";
        $rootScope.$broadcast("editAthorInfo",{mess:authorID});
    };
    $scope.$on("editAthorInfo",function (event,arg) {
        $scope.tempAuthor = {
            id: "",
            name: "",
            secname: "",
            lastname: "",
            bdate: ""
        };
        $scope.olderLastNameAutor = "";
        for(var i = 0, athorLength = $scope.dataAuthor.length;i<athorLength;i++){
            if($scope.dataAuthor[i].id==arg.mess){
                $scope.tempAuthor.id = arg.mess;
                $scope.tempAuthor.name = $scope.dataAuthor[i].name;
                $scope.tempAuthor.secname = $scope.dataAuthor[i].secname;
                $scope.tempAuthor.lastname = $scope.dataAuthor[i].lastname;
                $scope.tempAuthor.bdate = $scope.dataAuthor[i].bdate;
                $scope.olderLastNameAutor = $scope.dataAuthor[i].lastname;
                break;
            }
        }
    });

    //saving changes
    $scope.saveAuthorEdition = function () {
      for(var i=0, bookLength = $scope.dataBook.length;i<bookLength;i++){
          if($scope.dataBook[i].author == $scope.olderLastNameAutor){
             $rootScope.$broadcast("editBook",{mess:$scope.dataBook[i].id});
             $scope.tempBook.author = $scope.tempAuthor.lastname;
             $scope.saveBookChanges();
          }
      }
        saver_reader_author.updateAuthor($scope.tempAuthor.id,$scope.tempAuthor);
        saver_reader_author.saveAuthor();
        $rootScope.$broadcast("updateAuthorlist");
        $rootScope.$broadcast("updateGeneralList");
    };





    //book part
    $scope.authorPicker = "";
    $scope.$on("updateAutorOfBoock",function (event) {
        $scope.autorOfBookChoose = [];
        for (var i = 0, autorLength = $scope.dataAuthor.length; i<autorLength;i++){
            $scope.autorOfBookChoose[i] = $scope.dataAuthor[i].lastname;
        };
    });
    //open form for for adding book
    $scope.addBook = function () {
      $rootScope.$broadcast("updateAutorOfBoock");
      $scope.url1 = "supportingPages/addBook.html";
    };

    //all info about book (author,title,genre, number of page)
    $scope.dataBook = saver_reader_book.readBook();

    $scope.bookTitle = "";
    $scope.bookGenre = "";
    $scope.bookNumPage = "";

    $scope.$on("updateBooklist",function (event) {
        $scope.dataBook = saver_reader_book.readBook();
    });

    //saving book in storage
    $scope.addBookToStorage = function () {
        if($scope.bookTitle !== "" &&
            $scope.bookGenre !== "" &&
            $scope.bookNumPage !== "" &&
            $scope.authorPicker !== "") {
            saver_reader_book.addBook($scope.authorPicker, $scope.bookTitle, $scope.bookGenre, $scope.bookNumPage);
            saver_reader_book.saveBook();

            $rootScope.$broadcast("updateBooklist");
            $rootScope.$broadcast("updateGeneralList");

            $scope.bookTitle = "";
            $scope.bookGenre = "";
            $scope.bookNumPage = "";
        }else{alert("Enter all value");};
    };

    //remove book from storage
    $scope.removeBook = function (bookID) {
        saver_reader_book.removeBook(bookID);
        saver_reader_book.saveBook();
        $rootScope.$broadcast("updateBooklist");
        $rootScope.$broadcast("updateGeneralList");
    };


    //edit book
    $scope.$on("editBook",function (event,arg) {
        $scope.tempBook = {
            id: "",
            title: "",
            genre: "",
            numOfPage: "",
            author: ""
        };
        for (var i=0, bookLength = $scope.dataBook.length;i<bookLength;i++){
            if(arg.mess==$scope.dataBook[i].id){
                $scope.tempBook.id = arg.mess;
                $scope.tempBook.title = $scope.dataBook[i].title;
                $scope.tempBook.genre = $scope.dataBook[i].genre;
                $scope.tempBook.numOfPage = $scope.dataBook[i].numOfPage;
                $scope.tempBook.author = $scope.dataBook[i].author;
                break;
            };
        }
    });
    //form for edition book
    $scope.editBook = function (bookID) {
        $scope.url2 = "supportingPages/editBookForm.html";
        $rootScope.$broadcast("editBook",{mess:bookID});
    };
    //save changes
    $scope.saveBookChanges = function () {
        saver_reader_book.updateBook($scope.tempBook.id,$scope.tempBook);
        saver_reader_book.saveBook();
        $rootScope.$broadcast("updateBooklist");
        $rootScope.$broadcast("updateGeneralList");
    }



    /// book and author together for view
    $scope.bookWhitAuthor = bookAndAuthorCombiner();

    function bookAndAuthorCombiner() {
        var tempArray = [];
      for(var i = 0, elemLength = $scope.dataBook.length; i<elemLength; i++){
          var tempObj = {bookTitle:"",bookNumPage:"",bookGenre:"",authorName:"",authorLastName:"",authorSecName:"",autorBDate:""};
          tempObj.bookTitle = $scope.dataBook[i].title;
          tempObj.bookNumPage = $scope.dataBook[i].numOfPage;
          tempObj.bookGenre = $scope.dataBook[i].genre;
          for(var t = 0, authorLength = $scope.dataAuthor.length;t<authorLength;t++){
              if($scope.dataBook[i].author == $scope.dataAuthor[t].lastname){
                  tempObj.authorName = $scope.dataAuthor[t].name;
                  tempObj.authorLastName = $scope.dataAuthor[t].lastname;
                  tempObj.authorSecName = $scope.dataAuthor[t].secname;
                  tempObj.autorBDate = $scope.dataAuthor[t].bdate;
              };
          };
          tempArray.push(tempObj);
      };
      return tempArray;
    };

    $scope.$on("updateGeneralList",function (event) {
        $scope.bookWhitAuthor = bookAndAuthorCombiner();
    });

    


    //form of additions author
    $scope.addAuthor = function () {
        $scope.url1 = "supportingPages/addAuthor.html";
    };
    //main form for edition book
    $scope.EditOrRemoveBook = function () {
      $scope.url1 = "supportingPages/editOrRemoveBook.html"
    };
    //main form to edition author
    $scope.EditOrRemoveAuthor = function () {
        $scope.url1 = "supportingPages/EditOrRemoveAuthorForm.html"
    }
    //form for finding book
    $scope.findBookByTitle = function () {
        $scope.url1 = "supportingPages/findBookByTitle.html"
    }
    //close any form
    $scope.$on("closeAnyForm",function (event) {
        $scope.url1 = "";
    });
    $scope.closeForm = function () {
        $rootScope.$broadcast("closeAnyForm");

    };
});