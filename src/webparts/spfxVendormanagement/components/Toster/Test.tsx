// import React from 'react';
//  import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// const TodoForm = () => {
// 	const [inputs, setInputs] = React.useState("");
//     const [items, setItems] = React.useState([]);
//     const [inputitems, setInputItems] = React.useState("");

// 	const arrayItems = [
// 		{ task: "do this", iscomplete: false },
// 		{ task: "did this", iscomplete: false },
// 		{ task: "done this", iscomplete: false },
// 		{ task: "don't do this", iscomplete: false }]

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		setInputs("");
// 		console.log(`data is here, ${inputs} ,${inputitems}`);
// 		addItems(inputs);
// 		validation();

// 	}

// 	const addItems = (task) => {
// 		const newItems = [...items, {task}];
// 		setItems(newItems);
// 		console.log("new entry",newItems)

// 	}
// 	const completeToDo = (index) =>{
// 		const newItems = [...items];
// 		newItems[index].iscomplete = true;
// 		setItems(newItems);
// 	}

// 	const deleteItem = (index) =>{
// 		const newItems = [...items];
// 		newItems.splice(index,1);
// 		setItems(newItems);
// 		console.log("remove  entry",newItems)
// 	}

// 	const validation = () =>{ 
// 		toast.success ("Submitted...!");
// 	}

// 	return (
// 		<div>
// 			<input
// 				name="inputs"
// 				value={inputs}
// 				onChange={(e) => setInputs(e.target.value)}
// 			/>
// 			<button onClick={handleSubmit}>submit</button>
// 			<div style={{marginTop:"60px"}}>
// 			<h1>ToDO</h1>
// 			<div>
// 				{items.map((data,index)=>{
// 					<div key={index}>{data.task}</div>
					
// 				})}
// 				{/* <button onClick={(index)=>deleteItem(index)}>delete</button> */}
// 				{/* <button onClick={validation}>Notify!</button> */}
//                 <ToastContainer />
//                 <input
//                     name={inputitems}
//                     value ={inputitems}
//                     onChange ={(e)=>setInputItems(e.target.value)}
//                 />
// 				</div>
// 			</div>

// 		</div>
// 	)
// };

// export default TodoForm;