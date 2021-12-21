const submitBtn = document.getElementById('submitBtn');
const taskList = document.getElementById('tasks');
const clearBtn = document.getElementById('clearBtn');
const addTask = document.getElementById('addTask');
const filter = document.getElementById('filter');
const icon = '<i class="fas fa-trash"></i> ';
const numberOfTasks = document.getElementById('taskCount');
let taskCount = 0;
const modalBg = document.querySelector('.modal-bg');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const closeBtn = document.querySelector('.close-btn');

const  getTasks =  () =>  {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = task + icon;
        li.classList.add('item');
        taskList.appendChild(li);

         
        taskCount=tasks.length;
        numberOfTasks.innerText = taskCount;
    })
}
document.addEventListener('DOMContentLoaded',getTasks)


const addNewTask = (e) => {
    e.preventDefault();
   
    if(addTask.value.trim() === '') {
        modalAlert('task input is empty')
        
    }else{
      
        const li = document.createElement('li');
        li.innerHTML = addTask.value + icon;
        li.classList.add('item');
        taskList.appendChild(li);

        taskCount++;
        numberOfTasks.innerText = taskCount;
        
       
        storeInLocalStorage(addTask.value)

        addTask.value = '';
     
       
    }
}

function storeInLocalStorage (task)  {

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
submitBtn.addEventListener('click', addNewTask);

//remove task from list

const removeTask = (e) => {
   if( e.target.classList.contains('fas')){
       if(confirm('Are you sure')){
        e.target.parentElement.remove();
        taskCount--
        numberOfTasks.innerText = taskCount

        removeTaskFromLocalStorage(e.target.parentElement.textContent)
       }
      
   }
}

const removeTaskFromLocalStorage = (taskItem) => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    
  

    for (let i = 0; i < tasks.length; i++) {
        let element = tasks[i];
        if(element.trim() === taskItem.trim()){
            tasks.splice(i,1);
            
            break
        }
        
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

taskList.addEventListener('click',removeTask)


//remove all tasks fromlist

const removeAllTasks = (e) => {
e.preventDefault()
while(taskList.firstChild){
    taskList.removeChild(tasks.firstChild);
    taskCount = 0;
    numberOfTasks.innerText = taskCount
}
    clearAllFromLocalStorage()
}

const clearAllFromLocalStorage = () => {
    localStorage.clear()
}

clearBtn.addEventListener('click', removeAllTasks)

//filter tasks

const filterTasks = (e) => {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLocaleLowerCase().indexOf(text) != -1 ){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    )
}

filter.addEventListener('keyup', filterTasks)

//modal
function modalAlert(text) {
    modalBg.classList.add('modal-active')
    modalText.innerText = text;
    closeBtn.addEventListener('click', modalClose)
 }
 
 function modalClose(){
     modalBg.classList.remove('modal-active')
     window.scrollTo(0,0);
 }

 modalBg.addEventListener('click', modalClose)