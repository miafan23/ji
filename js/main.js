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
    var currentDate;

    function init (){
        //prevent select page while db click
        clearSelection();

        currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth();
        var monthDayCount = new Date(currentYear, currentMonth + 1, 0).getDate();

        var monthDays = Array.apply(null, {length: monthDayCount}).map(Number.call, Number);

        $scope.currentMonth = currentMonth;
        $scope.monthDays = monthDays;
        $scope.currentYM = '' + currentYear + currentMonth;
        $scope.showWelcome = true;

        //init local storage
        if (!localStorageService.get('allTasks')) {
            localStorageService.set('allTasks', []);
            
        }

        allTasks = localStorageService.get('allTasks');
        if (allTasks.length) {
            $scope.showWelcome = false;
        };

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
        if (allTasks.length === 1) {
            $scope.showWelcome = false;
        };

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
            downloadLink.style.display = 'inline-block'

        if (navigator.appVersion.toString().indexOf('.NET') > 0) {
            var text = JSON.stringify(localStorageService.get('allTasks'));
            var blob = new Blob([text]);
            // console.log('bl')
            downloadLink.addEventListener('click',function () {
                window.navigator.msSaveBlob(blob, 'data.txt');
            })
        }
        else {
            downloadLink.href = saveData();
        }
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

            try {
                var _allTasks = JSON.parse(e.target.result);
            } catch (e) {
                alert('好像你上传的文件不对哦，请上传网站导出的文件，如果还是不行，请联系我');
                return false
            }
            
            angular.copy(_allTasks, allTasks);
            $scope.$apply();
            updateStorage(allTasks)
        }

        r.readAsText(file);

        // function checkInput (input) {
        //     // if (!input instanceof Array) {
        //     //     return true
        //     // }
        //     console.log(input[0].id)
        //     if (input[0].id && input[0].taskName && input[0].finishCon || input[0] == []) {
        //         return false
        //     }

        //     return true;
        // }
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

        updateStorage(allTasks);
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
        var cp = document.getElementById('ctrl-panel');
        var cpState = cp.getAttribute('data-state');
        var btn = document.getElementsByClassName('hamburger-cen')[0];


        if (cpState == 'hide') {
            cp.setAttribute('data-state', 'show');
            cp.style.right = '0px';
            angular.element(btn).addClass('active')
        } else if (cpState == 'show') {
            cp.setAttribute('data-state', 'hide');
            cp.style.right = '-350px'
            angular.element(btn).removeClass('active')
        }
    }


    function nextMonth (currentShowMonth) {
        // var nextMonth = $scope.currentMonth + 1;        
        // var nextDate = new ($)
        currentDate.setMonth(currentDate.getMonth() + 1);
        $scope.currentMonth = currentDate.getMonth();
        $scope.currentYM = currentDate.getFullYear() + '' + $scope.currentMonth;
    }

    function preMonth (currentMonth) {
        currentDate.setMonth(currentDate.getMonth() - 1);
        $scope.currentMonth = currentDate.getMonth();
        $scope.currentYM = currentDate.getFullYear() + '' + $scope.currentMonth;
    }

    function findParent (child, dataProp) {
        var parentNode = child;

        while (!parentNode.getAttribute(dataProp)) {
            parentNode = parentNode.parentNode;
        }

        return parentNode
    }

    function updateStorage (allTasks) {
        localStorageService.set('allTasks', allTasks);
        $scope.showWelcome = false;
    }

    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }

    function filterEmptyAndPre (item) {
        var startYM = parseInt(item.startYM);
        var currentYM = parseInt($scope.currentYM)
        return !(item.id === undefined || startYM > currentYM)
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
    $scope.filterEmptyAndPre = filterEmptyAndPre;

    $scope.showCtrlPanel = showCtrlPanel;

    //change month
    $scope.nextMonth = nextMonth;
    $scope.preMonth = preMonth;

})