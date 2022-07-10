export class TodoListService{
    todoList = [
        'Ersalomo',
        'Sitorus',
        'Dori'
    ];
    #getJsonTodoList(){
        return JSON.stringify({
            code:200,
            status: 'success',
            data: this.todoList.map((ele,i)=>{
                return { 
                    id:i, 
                    todo:ele
                }
            })
        })
    }

    getTodoList(req,res){
        res.write(this.#getJsonTodoList())
        res.end()
    }
    createTodo(req,res){
        req.addListener('data',(data)=>{
            const body = JSON.parse(data.toString());
            this.todoList.push(body.todo)

            res.write(this.#getJsonTodoList())
            res.end()
        })

    }

    // update todo

    updateTodo(req,res){
        req.addListener('data',(data)=>{
            const body = JSON.parse(data.toString());
            if(this.todoList[body.id]){
                this.todoList[body.id] = body.todo
            }
            res.write(this.#getJsonTodoList())
            res.end()
        })
    }
    //delete
    deleteTodo(req, res) {
        req.addListener('data',(data)=>{
            const body = JSON.parse(data.toString());
            if(this.todoList[body.id]){
                this.todoList.splice(body.id, 1);
            }
            res.write(this.#getJsonTodoList())
            res.end()
        })
    }
}