import React,{Component} from 'react'
import ReactDom from 'react-dom'

import Auxi from './Auxillary'
import classes from './TodoBuilder.module.css'
import TodoList from './todoList'
import Footer from './footer'

class TodoBuilder extends Component{
state ={
    items:[],
    editField :false,
    showActive:false,
    showComplete:false,
    showAll:false,
    taskActiveCount :0

}
     addTaskHandler = (e) =>{
         if(e.keyCode ==13 && this._inputValue.value != ""){
            
                
                let item ={
                    id: Date.now(),
                    text: this._inputValue.value.trim(),
                    active:1,
                    edit:0
                }
                let updItems =[
                    ...this.state.items
            ]
           var activeCount = this.state.taskActiveCount
           
                updItems.push(item)
            this.setState({
                items:updItems,
                taskActiveCount:activeCount+1
            })
            this._inputValue.value =""
            //console.log(this.state.items) 
         }
        
    }
    taskCompleteHandler =(id)=>{
        let updItems =[
            ...this.state.items
                ]
        let oldCount = this.state.taskActiveCount
                updItems= updItems.map((item)=>{
                    if(item.id === id) { item.active = !item.active
                      
                                           return item}

                    return item
                })
           
              this.setState({
                items:updItems,
                taskActiveCount:oldCount-1
            })

    }
    editFlagHandler =(id) => {
        let updItems =[
            ...this.state.items
                ]
       updItems= updItems.map((item)=>{
                    if(item.id === id) { item.edit = !item.edit
                                           return item}

                    return item
                })    
                this.setState({
                    items:updItems,
                    editField :true
                })   
    }
    editHandler = (event,id,text) =>{
        if(event.keyCode ==13 && text != "") {
        let updItems =[
            ...this.state.items
                ]
                updItems= updItems.map((item)=>{
                    if(item.id === id) { item.text = text
                                        item.edit = !item.edit
                                           return item}

                    return item
                })  
                this.setState({
                    items:updItems,
                    editField :false
                }) 
            }        
    }
    deleteHandler =(id) => {
        let updItems =[
            ...this.state.items
                ]
        let pos = updItems.findIndex(x=> x.id ==id)
     var removedobj = updItems.splice(pos,1)
    var isactive= removedobj.find(x => x.active ==1) !== undefined
    let oldCount = this.state.taskActiveCount
    oldCount = isactive? oldCount -1: oldCount
                this.setState({
                    items:updItems,
                    taskActiveCount: oldCount
                })    
    }
    render(){
       
        return(
            <Auxi>
            <header className ={classes.todobuilder}>
                <h1>Todo List</h1>
                <input className ={classes.newtodo}
                 type="text" 
                onKeyDown={this.addTaskHandler}
                 placeholder="enter task" 
                 ref={(a)=> this._inputValue=a} 
                 autoFocus={true}/>
                </header>
                <section className="main">
                <TodoList items ={this.state.items} 
                taskCompleteHandler ={this.taskCompleteHandler} 
                editFlagHandler={this.editFlagHandler}
                deleteHandler ={this.deleteHandler}
                editHandler ={this.editHandler}
                editField= {this.state.editField}/>
               </section>
                <Footer activeTaskCount= {this.state.taskActiveCount}/>
               </Auxi>
            
    )
    }

}

export default TodoBuilder;