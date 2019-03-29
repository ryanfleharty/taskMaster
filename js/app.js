console.log("hello");
let tasks = [];
// this holds all tasks
class Task{
    constructor(name){
        this.name = name;
        this.complete = false;
        tasks.push(this);
    }
}
const putTaskOnPage = (task, $taskDiv) => {
    if(task.complete){
        $('.done').append($taskDiv);
     }else{
         $('.pending').append($taskDiv);
     }
}

const setButtonText = (task, $taskButton) => {
    if(task.complete){
        $taskButton.text("Undo")
    }else{
        $taskButton.text("Complete");
    }
}

const toggleTask = (task)=>{
    // change the complete to the opposite of what it currently is
    task.complete = !task.complete;
    // re-render
    render();
}

const render = () => {
    // clear the existing stuff
    $('.task').remove();
    // put tasks from task array into the divs
    tasks.forEach(function(task, index){
        // create the div for the task, with a button
        const $taskDiv = $(`<div class="task"><p>${task.name}</p></div>`)
        const $taskButton = $('<button/>').click(()=>{
            toggleTask(task)
        })
        const $deleteButton = $('<button>DELETE</button>').click(()=>{
            tasks.splice(index, 1);
            render();
        })
        setButtonText(task, $taskButton)
        // put the button in the div
        $taskDiv.append($taskButton);
        $taskDiv.append($deleteButton);
        // put the div on the page
         // if a task is not complete, put it in the pending div
         putTaskOnPage(task, $taskDiv);
        // if a task is complete, put it in the done div
    })
}
const addTask = (e) => {
    e.preventDefault();
    // grab the text from the input
    const inputText = $('#new-task').val();
    // clear the text from the input
    $('#new-task').val("");
    // create a new Task from that
    new Task(inputText);
    // re-render the page
    render();
}
$('#add-task').on('click', addTask)

$('.clear-pending').click(()=>{
    for(let i = 0; i < tasks.length; i++){
        if(!tasks[i].complete){
            tasks.splice(i, 1);
            i--;
        }
    }
    // The advanced one is below
    // it is too much power for beginners to handle
    // tasks = tasks.filter(task => task.complete)
    render();
})
$('.clear-done').click(()=>{
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].complete){
            tasks.splice(i, 1);
            i--;
        }
    }
    // The advanced one is below
    // it is too much power for beginners to handle
    // tasks = tasks.filter(task => !task.complete)
    render();
})