angular.module('book', [])
    .controller('MainCtrl', [
       '$scope',
       '$http',
        function($scope,$http) {
            $scope.books = [];


            $scope.addComment = function(book) {
                if($scope.userName === '' || $scope.commentText === '') {return;}

            };

            $scope.addBook = function() {
                bookQuery = $scope.searchQuery.split(' ').join('+');
                console.log(bookQuery);
                return $http.post('/books', bookQuery).success(function(data){
                   $scope.books.push(data);
                });
            };

            $scope.create = function(book) {
                return $http.post('/bookComment',comment).success(function(data){
                    book.comments.push(data);
                });
            };
        }
    ]);