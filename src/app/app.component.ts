import { Component , OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs/operators";

export interface Todo{
  completed:boolean,
  title:string,
  id?:number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  todos:Todo[]=[]
  todoTitle='';
  loading=false
  ngOnInit(){
    this.fetchTodo()
  }

  addTodo() {
    if(!this.todoTitle.trim()){
        return
    }
    const newTodo:Todo={
      title:this.todoTitle,
      completed:false,

    }
    this.http.post('https://jsonplaceholder.typicode.com/todos',newTodo)
      .subscribe(response=>{
        // console.log(response)
        this.todos.push(newTodo)
      })

  }

  fetchTodo() {
    this.loading=true
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .pipe(delay(2))
      .subscribe(response=>{
        console.log('Resp',response)
        this.todos=response
        this.loading=false
      })
  }

  removeTodo(id?: number) {
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(()=>{
        this.todos=this.todos.filter(t => t.id  !== id)
      })
  }
}
