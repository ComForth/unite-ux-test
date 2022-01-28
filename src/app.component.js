import template from './app.component.html';

const component = function() {

    const controller = [ '$scope', function( $scope) {

        $scope.gridOptions = {
            dataSource: {
                data: [
                    { id: 1, name: 'John Doe', age: 13, },
                    { id: 2, name: 'Lee Foe', age: 10, },
                ],
                schema: {
                    model: {
                        id: 'id',
                        fields: {
                            id: { type: "number" },
                            name: { type: "string" },
                            age: { type: "string" },
                        }
                    }
                }
            },
            columns: [
                { command: ["edit"], title: "&nbsp;" },
                {
                field: "id",
            }, {
                field: "name",
            }, {
                field: "age",
            }]
        };


    }];

    return {
        template: template,
        controller: controller
    }
};

angular.module('app').component('appRoot',component());

