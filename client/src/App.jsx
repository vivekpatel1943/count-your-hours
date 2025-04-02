import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BarChart, Bar, Legend, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import dayjs from 'dayjs';
import GraphPage from './GraphPage';
import './App.css'
import FormPage from './FormPage';


function App() {

  const [tasks, setTasks] = useState([]); 
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [graphType,setGraphType] = useState("line-chart");
  const [formModalOpen,setFormModalOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`)
        console.log(response.data);
        setTasks(response.data);
        filterData(response.data, filter);
      } catch (err) {
        console.error("error fetching tasks", err, ".");
      }
    }
    fetchTasks();
  }, [filter,tasks])

  const filterData = (data, type) => {
    const now = dayjs(); //complete information of the present moment , the minute, the hour , the second , the week , the month, the year everthing
    console.log(now)
    // here we are trying to filter task based on when they were constructed , today , this week , this month , this year
    //if a task has been constructed today then they will be shown in the data for type "daily" and "weekly" and "monthly" and "yearly" , but if they have been added to the list 10-days ago they won't be shown in the data for type "daily" and "weekly" but they will be shown for the type "monthly" and "yearly",  
    // we will pass tasks as an argument to this function filter data, 

    let filteredTask = data.map((task) => {
      const filteredLogs = task.timeLogs.filter((log) => {

        const logDate = dayjs(log.date);
        // if the type is daily it checks if the day of logdate and today is same , if it is then it returns true;  
        if (type === "daily") return logDate.isSame(now, "day"); //true if the log date is today
        // if the type is weekly then it checks if the week of today and the logDate is same or not 
        if (type === "weekly") return logDate.isSame(now, "week"); //true if the log date in the same week
        // if the type is monthly then it checks if the month of today and that of logdate is same or not if it is it returns true,
        if (type === "monthly") return logDate.isSame(now, "month"); // true if the log date is in the same month
        // if the type is yearly then it checks if the year of today and the logdate is same or not if it is it returns true;
        if (type === "yearly") return logDate.isSame(now, "year"); // true if the log date is in the same year

        // if the type is not recognized , include all logs(no filtering)
        return true;
      })

      console.log("filtered logs", filteredLogs)

      // summing the filtered time logs
      const totalTime = filteredLogs.reduce((sum, log) => sum + log.timeSpent, 0);
      console.log(totalTime)

      return { id : task._id,task: task.task, time: totalTime } //ensure we return an object for mapping;
    })

    setFilteredTasks(filteredTask);
  }

  async function updateTask(taskId,newTaskText,addTime){
    try{  
      const response = axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${taskId}`,{taskText:newTaskText,addTime:addTime})

      console.log(response);

      // in response.data.task , response.data because the data from the backend to the frontend in the form of json with the key "data"
      setTasks(tasks.map((task) => task._id === taskId ? {...task,...response.data.task} : task))
    }catch(err){
      console.error("error updating task",err,".")
    }
  }

  async function deleteTask(taskId){
    try{
      const response = axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${taskId}`);
      console.log(response);

      tasks.filter((task) => task._id !== taskId);
    }catch(err){
      console.error("error deleting task",err,".");
    }
  }

  // here we will write the logic for allowing the user to select the type of the graph he wants to see his data represented in,
  function selectGraphType(type){
    if(type==="line-chart") {
      setGraphType("line-chart")
    }else if(type === "bar-chart"){
      setGraphType("bar-chart")
    }
  }

  async function addJournals(event) {

    // this will prevent the default submission when you press the add-task button
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const task = formData.get('title');
    const time = formData.get("time-spent")

    if (!time || !task) {
      console.log("task or time is not being sent in the request body..")
      alert("task or time or both are not being sent in the request body..")
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/add-task`, { taskText: task, timeSpent: time }, {
        body: {
          "Content-Type": "application/json"
        }
      })

      handleNewTaskButtonClick();
    } catch (err) {
      console.error("error adding tasks..", err)
    }
  }

  function handleNewTaskButtonClick(){
    setFormModalOpen((formModalOpen) => !formModalOpen)
  }

  return (
    <div>

     {/*  <button onClick={handleNewTaskButtonClick} className='border border-gray-500 rounded px-3 py-1'>{formModalOpen ? "Home" : "NewTask"}</button> */}

      {formModalOpen && <FormPage AddJournalsFn={addJournals} handleNewTaskButtonClickFn={handleNewTaskButtonClick} formModalOpen={formModalOpen}></FormPage>}
      
      <GraphPage filterDataFn={filterData} tasks={tasks} selectGraphTypeFn={selectGraphType} filteredTasks={filteredTasks} graphType={graphType} updateTaskFn={updateTask} deleteTaskFn={deleteTask} handleNewTaskButtonClickFn={handleNewTaskButtonClick}></GraphPage>

    </div>
  )
}

export default App;
