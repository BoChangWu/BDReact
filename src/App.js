import logo from './logo.svg';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2"

import React, {useState,useEffect} from 'react'
import { csv } from 'd3'
import { parse } from 'papaparse'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function App() {

  const [chartData,setChartData]= useState({
    datasets:[],
  })
  const [contacts,setContact] = useState([])
  const [chartOptions,setChartOptions] = useState()
  const [selectLists,setSelectLists] = useState([])
  const [highlight,setHighlight]= useState(0)
  const [yearNum,setYearNum] = useState('')
  useEffect(()=>{
    setSelectLists([])//{index:'0',name:'Noa'},{index:'1',name:'Json'}
    setChartOptions({
      responsive: true,
      plugins:{
        lengend:{
          position: "top",
        },
        title:{
          display: true,
          text: "戶數、人口數按戶別及性別"
        }
      }
    })
  },[])

  return (
    <div className="App"> 
      <h1>{yearNum}年度</h1>
      <div 
        onDragOver={(e)=>{
          e.preventDefault();
        }} 
        onDrop={(e)=>{
          e.preventDefault();
          // console.log(e.dataTransfer.files)
          Array.from(e.dataTransfer.files).filter(
            (file) => file.type===('application/vnd.ms-excel'||'text/csv'))
            .forEach(async file => {
              const text = await file.text()
              const results = parse(text,{header:true})
              console.log(results)
              var i = 0
              results.data.forEach(result => {
                contacts.push(result)
                
                selectLists.push({index:i,village:result.village})
              
                i=i+1
              });

              // setYearNum(results[0].statistic_yyy)
              
          console.log(selectLists)
          // console.log(contacts[0].statistic_yyy)
          setYearNum(contacts[0].statistic_yyy)

          setChartData({
            labels:["共同生活戶_戶數","共同事業戶_戶數","單獨生活戶_戶數","共同生活戶_男","共同事業戶_男","單獨生活戶_男","共同生活戶_女","共同事業戶_女","單獨生活戶_女"],
            datasets:[
              {
                label: '戶數', //共同生活戶_戶數,共同事業戶_戶數,單獨生活戶_戶數,共同生活戶_男,共同事業戶_男,單獨生活戶_男,共同生活戶_女,共同事業戶_女,單獨生活戶_女
                data: [contacts[0].household_ordinary_total,contacts[0].household_business_total,contacts[0].household_single_total,
                contacts[0].household_ordinary_m,contacts[0].household_business_m,contacts[0].household_single_m,
                contacts[0].household_ordinary_f,contacts[0].household_business_f,contacts[0].household_single_f],
                borderColor: "rgb(53,162,235)",
                backgroundColor: "rgba(53,162,235,0.4)"
              }
            ]
          })    
            })
        }} className='drop-panel'>請將csv檔案拖曳到這</div>
      <select onChange={(e)=>{
        console.log(e.target.value)
        setHighlight(e.target.value)
        const obj = contacts[highlight]
        setChartData({
          labels:["共同生活戶_戶數","共同事業戶_戶數","單獨生活戶_戶數","共同生活戶_男","共同事業戶_男","單獨生活戶_男","共同生活戶_女","共同事業戶_女","單獨生活戶_女"],
            datasets:[
              {
                label: '戶數', //共同生活戶_戶數,共同事業戶_戶數,單獨生活戶_戶數,共同生活戶_男,共同事業戶_男,單獨生活戶_男,共同生活戶_女,共同事業戶_女,單獨生活戶_女
                data: [obj.household_ordinary_total,obj.household_business_total,obj.household_single_total,
                  obj.household_ordinary_m,obj.household_business_m,obj.household_single_m,
                  obj.household_ordinary_f,obj.household_business_f,obj.household_single_f],
                borderColor: "rgb(53,162,235)",
                backgroundColor: "rgba(53,162,235,0.4)"
              }
            ]
        })
      }}>
        {selectLists.map((select)=>(
          <option value={select.index}>{select.village}</option>
        ))}
      </select>
      <Bar options={chartOptions} data={chartData}/>
    </div>
  );
}

export default App;
