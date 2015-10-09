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
        //prevent select page while db click
        clearSelection();

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

        // var addTaskDiv = document.getElementById('initial-input');
        var addedTask = document.getElementById('input-task');


        // var newTask = document.createElement('div');
        // newTask.innerHTML = addedTask.value;
        // newTask.className = 'temp-task';
        // addedTask.value = '';

        // addTaskDiv.appendChild(newTask)
        var startId = allTasks.length;
        var date = new Date();
        var addedTaskName = addedTask.value;
        addedTask.value = ''


        addedTask = new Task((startId), addedTaskName, date);

        // addedTask.value = ''
        //why if set after will not work;
        allTasks[startId] = addedTask;

        localStorageService.set('allTasks', allTasks);

    }

    function updateFinishState (event) {
        var checbox = event.target;

        var targetParentNode = findParent(checbox, 'data-task');

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

        updateStorage(allTasks)

    }
    

    function outputData () {
        var downloadLink = document.getElementById('output-data-link');
        downloadLink.href = saveData();
       function saveData () {
            var textFile = null;
            var text = JSON.stringify(localStorageService.get('allTasks'));

            var data = new Blob([text], {type: 'text/plain'});
            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
              window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);
            
            return textFile;
        }
    }


    function uploadData () {
        var file = document.getElementById("input-data").files[0];
        var r = new FileReader;

        r.onloadend = function (e) {

            var _allTasks = JSON.parse(e.target.result);
            angular.copy(_allTasks, allTasks);
            $scope.$apply();
            updateStorage(allTasks)
        }

        r.readAsBinaryString(file)
    }

    function editTask (event) {

        var target = event.target;
        var taskTd = findParent(target, 'data-task');

        var taskNameShow = taskTd.querySelector('.taskName');

        var editWrapper = taskTd.querySelector('.edit-wrapper');
        var taskInput = taskTd.querySelector('.edit-taskName-input');

        editWrapper.style.display = 'block';
        taskNameShow.style.display = 'none';

    }

    function deleteTask (event) {
        var taskTd = findParent(event.target, 'data-task');

        var task = JSON.parse(taskTd.getAttribute('data-task'))

        var id = task.id;

        allTasks[id] = {};

        updateStorage(allTasks)
    }

    function finishEdit (event) {
        var taskTd = findParent(event.target, 'data-task');
        var task = JSON.parse(taskTd.getAttribute('data-task'));

        var id = task.id;

        allTasks[id].taskName = taskTd.querySelector('.edit-taskName-input').value;

        var editWrapper = taskTd.querySelector('.edit-wrapper');
        var taskNameShow = taskTd.querySelector('.taskName');

        editWrapper.style.display = 'none';
        taskNameShow.style.display = 'block';

        updateStorage(allTasks)
    }

    function cancelEdit ($event) {
        var taskTd = findParent(event.target, 'data-task');

        var editWrapper = taskTd.querySelector('.edit-wrapper');
        var taskNameShow = taskTd.querySelector('.taskName');

        editWrapper.style.display = 'none';
        taskNameShow.style.display = 'block';
    }

    function showCtrlPanel () {
        document.getElementById('ctrl-panel').style.right = '0px'
    }

    function findParent (child, dataProp) {
        var parentNode = child;

        while (!parentNode.getAttribute(dataProp)) {
            parentNode = parentNode.parentNode;
        }

        return parentNode
    }

    function updateStorage (allTasks) {
        localStorageService.set('allTasks', allTasks)
    }

    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }

    function filterEmpty (item) {
        return !(item.id === undefined)
    }

    $scope.allTasks = allTasks;

    $scope.enterTask = enterTask;
    $scope.updateFinishState = updateFinishState;

    //about io data
    $scope.outputData = outputData;
    $scope.uploadData = uploadData;

    //about edit task
    $scope.editTask = editTask;
    $scope.finishEdit = finishEdit;
    $scope.deleteTask = deleteTask;
    $scope.cancelEdit = cancelEdit;

    //filter
    $scope.filterEmpty = filterEmpty;

    $scope.showCtrlPanel = showCtrlPanel;

})