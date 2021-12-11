var important = false;
var formVisible = true;
var icon;

function togglePriority(){
    console.log("Clicked");

    if(important == true) {
        //set as non-important
    icon.removeClass("fas").addClass("far");
    important = false;
    }
    else{
        //set as important
        icon.removeClass("far").addClass("fas");
        important = true;
    }
}

function toggleForm(){
    if(formVisible){
        $(".section-form").hide();
        formVisible = false
    }
    else{
        $(".section-form").show();
        formVisible = true;
    }
}

function fetchTasksFromServer(){
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks",
        type:"GET",
        success: function(dataString){

            let allTask = JSON.parse(dataString);
            let numOfTasks = 0;
            for(let i=0;i< allTask.length; i++){
                let task = allTask[i];

                if(task.name=="Miguel"){
                displayTask(task);
                numOfTasks += 1;
                }
            }
            let text= "Total: " + numOfTasks + " Tasks";
            $("#lblCount").text(text);

        },
        error: function(err){
            console.log("Error getting data",err);
            
        }
    });
}

function saveTask(){
    console.log("Saving Task....");

    let title = $("#txtTitle").val();
    let desc = $("#txtDescription").val();
    let dueDate = $("#dpDueDate").val();
    let status = $("#selStatus").val();
    let category = $("#selCategory").val();
    let color = $("#selColor").val();

    //console.log(title, desc, dueDate, status, category, color);

    let theTask = new Task(important, title, desc,  dueDate, status, category, color);
    let stringData = JSON.stringify(theTask);

    console.log(theTask);
    console.log(stringData);


    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        type: "POST",
        data: stringData,
        contentType: "application/json",

        success: function(res){
            console.log("Server says:",res);

            displayTask(theTask);
            clearForm();
        },
        error: function(err){
            console.log("Error saving task", err);
        }
    })
    
    
    
}

function clearForm(){
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#dpDueDate").val("");
    $("#selStatus").val("");
    $("#selCategory").val("");
    $("#selColor").val("");
}

function displayTask(task){

    let syntax = `<div class="task">
    <i class="far fa-star"></i>

    <div class="info">    
        <h5>${task.title}</h5>
        <p>${task.description}</p>
    </div>

    <div class="details">
        <label class="status">${task.status}</label>
        <label class="category">${task.category}</label>
    </div>`;

    $(".task-list").append(syntax);
}

function testHttpRequest(){
    $.ajax({
        url: 
        "https://restclass.azurewebsites.net/api/test",
        type: "Get",
        success: function(response){
            console.log("Server says: ", response);
        },
        error: function(err){
            console.log("Error on request", err);
        }
    });
}

function init(){
    console.log("Task Manager");
    icon = $("#iPriority");
    //hook events
    icon.click(togglePriority);
    $("#btnShowDetails").click(toggleForm);
    $("#btnSave").click(saveTask);
    
    //load data
    fetchTasksFromServer();
}



window.onload = init;