var taskList = angular.module('taskList', ['LocalStorageModule']); 

taskList.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('taskList')
    .setStorageType('localStorage')
    .setNotify(true, true)
});

taskList.controller('taskListCtrl', function ($scope, localStorageService) {
    init()
    var allTasks;

    function init (){
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var monthDayCount = new Date(currentYear, currentMonth + 1, 0).getDate();

        var monthDays = Array.apply(null, {length: monthDayCount}).map(Number.call, Number);

        $scope.currentMonth = currentMonth;
        $scope.monthDays = monthDays;
        $scope.currentYM = '' + currentYear + currentMonth;

        console.log(monthDays)

        //init local storage
        if (!localStorageService.get('allTasks')) {
            localStorageService.set('allTasks', []);
        }
        allTasks = localStorageService.get('allTasks');

    }


    function Task (id, name, date) {
        this.id = id;
        this.taskName = name;
        this.finishCon = {};

        startYear = date.getFullYear();
        startMonth = date.getMonth();

        this.startYM = '' + startYear + startMonth
        this.startDay = date.getDate() - 1;
        //init finishCon: {startMonth: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']}
        this.finishCon[this.startYM] = new Array(parseInt(this.startDay) + 1 ).join('-').split('');
    }

    function enterTask (event) {
console.log('d')
        var addTaskDiv = document.getElementById('initial-input');
        var addedTask = document.getElementById('input-task');

        var newTask = document.createElement('div');
        newTask.innerHTML = addedTask.value;
        newTask.className = 'temp-task';
        addedTask.value = '';

        addTaskDiv.appendChild(newTask)
    }

    function finishEnterTasks () {

        var allTasksInput = document.getElementsByClassName('temp-task');
        var startId = allTasks.length;
        var addedTask;
        var date = new Date();

        for (var i=0; i<allTasksInput.length; i++) {
            addedTask = new Task((startId + i), allTasksInput[i].innerHTML, date)

            allTasks[startId + i] = addedTask;
        }
        
        angular.element(allTasksInput).remove();

        localStorageService.set('allTasks', allTasks)
    }

    function updateFinishState (event) {
        var checbox = event.target;
        // var state = checbox.checked;

        var targetParentNode = checbox;

        while(!targetParentNode.getAttribute('data-task')) {
            targetParentNode = targetParentNode.parentNode;
        }

        var state = targetParentNode.getAttribute('ng-switch-when')
        var task = JSON.parse(targetParentNode.getAttribute('data-task'));
        var taskDay = targetParentNode.getAttribute('data-task-day');
        var YM = targetParentNode.getAttribute('data-task-YM');

        var id = task.id;

        switch (state) {

            case '_undefined_':
                allTasks[id].finishCon[YM][taskDay] = true;
                break;

            case 'true':
                allTasks[id].finishCon[YM][taskDay] = '_false';
                break;

            case '_false':
                allTasks[id].finishCon[YM][taskDay] = null;
                break;
            default:
                break;

        }

        localStorageService.set('allTasks', allTasks)


    }


    $scope.allTasks = allTasks;
    $scope.enterTask = enterTask;
    $scope.finishEnterTasks = finishEnterTasks;
    $scope.updateFinishState = updateFinishState;

})