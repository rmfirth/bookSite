angular.module('book', [])
    .controller('MainCtrl', [
       '$scope',
       '$http',
        function($scope,$http) {
            $scope.books = [];

            $scope.getBooks = function() {
              return $http.get('/books').success(function(data) {
                  angular.copy(data, $scope.books);
			console.log($scope.books);
              });
            }; $scope.getBooks();

            $scope.addComment = function(book, index) {
                if($scope.books[index].userName === '' || $scope.books[index].commentText === '') {return;}
		commentURL = '/books/' + book._id + '/addPost';
                var commentToAdd = {
                  text: $scope.books[index].commentText,
                  userID: $scope.books[index].userName
                };
                console.log(commentToAdd);
                $http({
                  url: commentURL,
                  method: "PUT",
                  data: commentToAdd,
                }).success(function() {
                  $scope.getBooks();
                });
            };

            $scope.addBook = function() {
                var bookURL = 'books';
                bookQuery = {
                    text: $scope.searchQuery.split(' ').join('+')
                };
                console.log(bookQuery);
                return $http({
                    url: bookURL,
                    method: "POST",
                    data: bookQuery
                }).success(function(data){
                   $scope.books.push(data);
                   $scope.searchQuery = '';
                });
            };

            $scope.create = function(book) {
                return $http.post('/bookComment',comment).success(function(data){
                    book.comments.push(data);
                });
            };
        }
    ]);
