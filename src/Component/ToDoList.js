import { useState,useEffect } from "react"
import './ToDoList.css'
function ToDoList() {
  const [state , setState] = useState("");
  const [list , setList] = useState(()=>{
    const savedList = localStorage.getItem("myTodoList");
   return savedList ? JSON.parse(savedList): [];
  });
  const [edit , setEdit] = useState(null);
  useEffect(()=>{
    localStorage.setItem("myTodoList",JSON.stringify(list));
  },[list]);
  const ToDo =()=>{
    if(state !== ""){
      if(edit !== null){
        const newList = [...list];
        newList[edit] = {...newList[edit], text: state};
        setList(newList);
        setEdit(null);
        setState("")

      }else{
        setList([...list,{text:state , completed: false} ])
        setState("")
    }
  }
}
  const UpdatList =(index)=>{
    setState(list[index].text)
    setEdit(index)
  }
  const DeleteList =(index)=>{
    const newList = list.filter((_, i )=>i !==index);
    setList(newList)
  }
  const DeleteAll =()=>{
    setList([])
  }
  const  handleCheck =(index)=>{
    const newlist = [...list];
    newlist[index].completed = !newlist[index].completed
    setList(newlist)
  }

return (
    <div className="container">
      <h1 className="title">Todo List App</h1>

     <input className="input" type="text" placeholder="ENTER TODO" value={state} onChange={(e)=> setState(e.target.value)} />
      <button className="Add" onClick={ToDo}>{edit !==null ? "Update": "+"}</button>
      <ul className="Ul-line">
      {list.map((item,index)=>(
        <li className="Ul-List" key = {index}>
        <input className="checkbox" type="checkbox" checked={item.completed} onChange={()=>handleCheck(index)} />
        <span style={{textDecoration: item.completed ? "line-through": "none",margin: "0 10px "}}>

          {item.text}
        </span>
        <div className="buttonLine">

        <button onClick={()=> UpdatList(index)}>update</button>
        <button className="delete"  onClick={()=> DeleteList(index)}>delete</button>
        </div>

      </li>
            ))}
      </ul>

      {list.length>0 &&(
<button className="delete" onClick={()=>DeleteAll()}>Delete All</button>

      )}
    </div>
  )
}

export default ToDoList
