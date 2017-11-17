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
                   $scope.books.push(data); $scope.searchQuery = '';
                });
            };

            $scope.create = function(book) {
                return $http.post('/bookComment',comment).success(function(data){
                    book.comments.push(data);
                });
            };
        }
    ]);
