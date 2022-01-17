window.addEventListener("load", load());  //页面加载完毕调用load函数

document.getElementById('add-list').addEventListener('click', function() {
  document.addEventListener('keydown', function (keyEvent) {
    if(keyEvent.key == "Enter"){
      console.log('hi');
        addTodolist();
    }
  });
})


function addTodolist() {
  var obj_list = {
      todo: "",   //存储用户输入的数据
      done: false     //初始化用户输入的数据位于进行中
  };

  var tempDone = document.getElementById("add-list").value.trim(); //String切两边空格
  if (tempDone.length === 0){ //判断添加的内容是否为空
      return;
  }

  obj_list.todo = tempDone;

  todolist.push(obj_list); //将 obj_list 用 push 方式放入 todolist

  saveData(todolist); // 将 todolist 存储进本地

  document.getElementById("add-list").value = "";     //初始化输入框
  load();     //将用户输入的数据添加至dom节点
  document.getElementById("add-list").focus();
}


function load(){
  
  var todo = document.getElementById("todolist");
  var done = document.getElementById("donelist");

  var todoString = "";
  var doneString = "";

  // document.getElementById("add-list").focus();// 将光标指向输入框

  todolist = loadData();//调用loadData函数将本地存储数据调用进网页

  //若本地有相应存储数据，则将其添加至dom节点，反之初始化页面。
  if (todolist != null){
      for (var i=0; i<todolist.length; i ++){
          if(!todolist[i].done){
              todoString += "<li  class='dlist todolist'>"

                  + "<input type='checkbox' " 
                  + "onchange='update("+i+", \"done\", true)' class='choose-box'>" //通过onchange事件，当复选框值有改变，调用update函数，并改变输入数据“done”属性的布尔值
                  + "<span id='sp-"+i+"' onclick='edit("+i+")'>" + todolist[i].todo + "</span>" //点击事项调用edit函数
                  + "<input type='text' id='input-"+i+"' value=' ' style='display:none'>"
                  + "<a onclick='remove("+i+")'>-</a>"//点击“-”，调用remove函数
                  + "</li>";
          }
          else{
              doneString += "<li class='dlist donelist'>"
                  + "<input type='checkbox' "
                  + "onchange='update("+i+", \"done\", false)' class='choose-box' checked>"
                  + "<span id='sp-"+i+"'>" + todolist[i].todo + "</span>"
                  + "<a onclick='remove("+i+")'>-</a>"
                  + "</li>";
          }
      }
      todo.innerHTML = todoString;
      done.innerHTML = doneString;
  }

  else {
      todo.innerHTML = "";
      done.innerHTML = "";
  }

}

function edit(i) { // 这个函数用于直接修改list里的数据
  var sp = document.getElementById('sp-' + i);
  var inputId = document.getElementById('input-'+i);

  var spContent = sp.innerHTML; // 保存原值

  sp.style.display = 'none';
  inputId.style.display = 'block';
  inputId.value = spContent;
  console.log(inputId);
  inputId.setSelectionRange(0, inputId.value.length); // 选中文本框内的字符串
  
  inputId.focus();
  inputId.addEventListener('blur', confirm);
  inputId.addEventListener('keydown', function(keyEvent) {
    console.log('lioi');
    if (keyEvent.key == 'Enter'){
        confirm();
    }
  });

  function confirm() {
    if (inputId.value.length === 0) { // 如果用户更改后发现被清空
        sp.innerHTML = spContent; //将原来未修改的数据回推给sp
        alert("内容不能为空， 需要清除请点击右侧'-'号。");
    }

    else {
        update(i, "todo", inputId.value); //通过upadate函数对todolist数组相应项进行更新，将用户输入的内容写入到todolist数组相应项的todo属性中
    }

  }

}

function update(i, field, value) {
  todolist[i][field] = value; // 将第 i 个元素中的 field 属性 改为 value 值
  saveData(todolist); // 覆盖原本地缓存
  load(); // 重新加载一次
}

function remove(i) {
  todolist.splice(i, 1); // 删除位于 i 的 1 个元素
  saveData(todolist); // 覆盖原本地缓存
  load(); // 重新加载一次
}

function saveData(data) {
  console.log('opop');
  localStorage.setItem("West2TodoList", JSON.stringify(data)); // JS数组转换成JSON对象存进本地
  console.log('popod');
}


function loadData() {
  console.log('uuuuu');
  var hisTory = localStorage.getItem("West2TodoList");
  if(hisTory !=null){
    console.log('get');
      return JSON.parse(hisTory); // JSON对象转换为JS数组
  }
  else {
    console.log('no');
    return []
  }
}

function clear() {
  console.log('ji');
  localStorage.clear(); // 清除本地缓存
  load(); // 重新加载一次
}

document.getElementById('clear-btn').addEventListener('click', clear); // 添加按钮清除

