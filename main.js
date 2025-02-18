//유저가 값을 입력한다
//+버튼을 클릭하면 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 취소줄이 생긴다
//(1)check 버튼을 클릭하는 순간 true false
//(2) true이면 끝난 것으로 간주하고 취소줄 생기기
//(3) false이면 안끝난걸로 간주하고 그대로 두기
//On going, Done 탭을 누르면 언더바가 이동한다
//Done 탭은 끝난 아이템만, On going 탭은 진행중인 아이템만 보여준다
//All 탭을 누르면 다시 전체 아이템을 보여준다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") { 
    event.preventDefault();
      addTask();  }
});


for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);

function addTask() {
  let taskValue = taskInput.value.trim();
  if (taskValue === "") return alert("내가 해야할 게 뭐더라...");
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerate(),
  };

  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  //내가 선택한 탭에 따라서
  let list = (mode ==="all")? taskList : filterList;
  //리스트를 다르게 보여주기: all - taskList , ongoing이나 done은 filterList
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task-done" id="${list[i].id}">
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].content}</div>
            <div class="button-box">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    filterList = taskList; // 전체 리스트 표시
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}



function toggleComplete(id) {
  let task = taskList.find((task) => task.id === id);
  for(let i=0;i<taskList.length;i++){
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete; // true/false 토글
      console.log(`Check 상태 변경 -> ID: ${id}, isComplete: ${task.isComplete}`);
      render();
      break;
    
    }
    filter();
  }

}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 11);
}
