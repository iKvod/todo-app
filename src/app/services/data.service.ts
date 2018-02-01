import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Todo } from '../Models/Todo';

@Injectable()
export class DataService {

  private apiUrl:string;
  todos:Todo[];
 
  constructor(public http:Http) { 

    this.apiUrl  = '';
    this.todos = [
      {
        id: 'cde4f800-073b-11e8-88b0-074295ca071d', 
        body: 'ML', 
        isCompleted: false
      },
      {
        id: 'de6b02a0-073b-11e8-8bbc-ab3ef22b30da', 
        body: 'AI', 
        isCompleted: false
      },
      {
        id: 'e5bec5f0-073b-11e8-8bbc-ab3ef22b30da', 
        body: 'GoLang', 
        isCompleted: false
      }
    ];
  }

  
  getTodos(cb){
    if(this.apiUrl != '' && this.apiUrl != undefined){
       this.http.get(this.apiUrl)
        .map(res => res.json()).subscribe((todos) => {
          cb(todos);
          return;
        });
    }
       
    cb(this.todos);
  }


  addTodo(todo: Todo, callback) {
    this.todos.unshift(todo);
    let todosCount = this.todos.length;
    let todosIncomleteCount = 0;

    this.todos.map( (todo, i) => {
      if(i  < todosCount ){
        if(!todo.isCompleted){
          todosIncomleteCount++;
        }        
      }
    })
    callback(true, todosIncomleteCount);
  }

  completeTodo(completedTodo: Todo, callback){
    this.todos.map((todo, index) => {
      if(completedTodo.id == todo.id){
        todo.isCompleted = true;
      }
    });
    console.log(this.todos)
    
  }

  editTodo(todo: Todo) {

  }

}
 