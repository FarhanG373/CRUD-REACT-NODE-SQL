import React, { useEffect, useState } from 'react';
import './component.scss';
import Axios from 'axios';
import { Link } from 'react-router-dom';
const API = 'http://localhost:4200';

const ViewData = () => {
  const [data, setData] = useState([]);
  const getData = async (e) => {
    const allData = await Axios.get(`${API}/getData`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (allData.data.status === 201) {
      setData(allData.data.data)
    } else {
      alert('No data Available')
    }
  }

  const dltData = async (id) => {
    const dlt = await Axios.delete(`${API}/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (dlt.data.status === 201) {
      getData();
      alert('data Deleted')
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (<div className='viewData'>


    <div className='addDataBut'><Link to="/AddData">Add New Data</Link></div>
    <div className='cardWrap'>
    {data.length > 0 ?
   
      data.map((item, index) => {
        return (
          <div className='card' key={index}>
            <div className='number'>{index + 1}</div>
            <div className='image'><img src={`/images/${item.image}`} alt={item.name} width="100%"/></div>
            <div className='body'>
              <h2>{item.name}</h2>
              <p><b>Email : </b>{item.email}</p>
              <p><b>Phone : </b>{item.contact}</p>
            </div>
            <div className='footer'>
              <Link to={`/EditData/${item.id}`}>Edit</Link>
              <button onClick={() => dltData(item.id)}>Delete</button>
              {/* <button>View</button> */}
            </div>
          </div>
        )
      })
     
      :
      <div className='noData'><h2>No data Available</h2></div>
      
    }
    </div>
  </div>
  )
}

export default ViewData