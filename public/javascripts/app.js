angular.module('book', [])
    .controller('MainCtrl', [
       '$scope',
       '$http',
        function($scope,$http) {
            $scope.addComment = function(book) {
                if($scope.userName === '' || $scope.commentText === '') {return;}

            };

            $scope.addBook = function() {

            }

            $scope.create = function(book) {
                return $http.post('/bookComment',comment).success(function(data){
                    book.comments.push(data);
                });
            };
        }
    ]);