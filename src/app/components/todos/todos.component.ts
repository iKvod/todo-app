import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Todo } from '../../Models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  name:string;
  neWtodo:Todo;
  todos: Todo[];
  new_todo:string;
  notComletedTodosNumber: number;

  // todos:string[];

  
  constructor(private dataService:DataService ) {
    //this.todos = dataService.getTodos();
  }

  
  ngOnInit() {
    this.name = 'JohnDoe';

    this.dataService.getTodos((todos)=>{
      this.todos = todos;
      this.notComletedTodosNumber = todos.length;
    });

  }


  addTodo(value){
    let uidv1 = require('uuid/v1');
    this.neWtodo = {
      id: uidv1(), 
      body: value,
      isCompleted: false
    }
    this.dataService.addTodo(this.neWtodo, (isAdded, todosLength) => {
      this.notComletedTodosNumber = todosLength;
      
      if(isAdded) {
        this.new_todo = '';
      }
      
      return false;
      
    });
    return false;
  }


  comleteTodo(todoId, isCompleted): void {
    for(let i = 0; i < this.todos.length; i++) {
      if(this.todos[i]['id'] == todoId){
        //this.todos[i].isCompleted = !isCompleted;
        this.dataService.completeTodo(this.todos[i], () =>{
          
          this.notComletedTodosNumber--;
        
        });
      }
    }
  }

  removeTodo(todoId): void {
    for(let i = 0; i < this.todos.length; i++) {
      if(this.todos[i]['id'] == todoId){
        this.todos.splice(i, 1);
      }
    }
  }

  



}

