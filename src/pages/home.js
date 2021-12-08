import React from 'react'
import './home.css';
import Card from './Card'
import axios from "axios"
import { useState} from "react"

const Home = () => {

  const [filter,setfilter] = useState()
  const [selection,setselection] = useState()
  const [propertydetail,setpropertydetail] = useState([])

  const handleSubmit = () => {
    fetchData()
  };

  const fetchData = async() => {
    const querystring="?filter="+filter+"&selection="+selection
    const results =  axios.get(`http://localhost:8888/.netlify/functions/getPropertyData${querystring}`)
    const json = Object.values((await results).data.data) //convert to an array 

    // sorting function
    
    if (filter==="price") 
    {const newJson = json.sort(function(a, b){
      return b.price - a.price 
    })
      setpropertydetail(newJson)
    }else if (filter==="bedroom") 
    {const newJson = json.sort(function(a, b){
        return b.bedroom - a.bedroom 
    })
    setpropertydetail(newJson)
    } else if (filter==="bathroom"){
      const newJson = json.sort(function(a, b){
      return b.bathroom - a.bathroom 
    })
    setpropertydetail(newJson)
   }
  }
  /*useEffect(() => {
    fetchData()
  }, [])*/
  
  return (
    <div>
    <div className="boxItem">
      <h1>Real Estate App - Document API Sorting Example</h1>
      <h2>Properties can be searched by filter type and sorted from highest to smallest</h2>
        <label>Filter :
          <select value={filter} onChange={e=> setfilter(e.target.value)}>
            <option>Select</option>
            <option>bedroom</option>
            <option>bathroom</option>
            <option>price</option>
          </select>
        </label>
        <label>Selection :
          <select value={selection} onChange={e=> setselection(e.target.value)}>
           <option>Select</option>
           <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>200000</option>
            <option>300000</option>
            <option>400000</option>
            <option>500000</option>
          </select>
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
          <div>
          {propertydetail.map((property,index) => (<Card key={index} property={property} />))}
          </div>
      </div>
  )
  }
  
  export default Home;
  