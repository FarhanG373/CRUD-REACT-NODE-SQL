import React, { useEffect, useState } from 'react';

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

  return (<>
    <table border={'1'} style={{ width: '900px', margin: "auto" }}>
      <tr>
        <td> <Link to="/AddData">Add Data</Link></td>
      </tr>
      <tr>
        <th>Number</th>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
      {
        data.length > 0 ?
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img src={`/images/${item.image}`} alt={item.name} width="100%" height="150" /></td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td><Link to={`/EditData/${item.id}`}>Edit</Link><button onClick={() => dltData(item.id)}>Delete</button><button>View</button></td>
              </tr>


            )
          })
          :
          <tr><td colSpan={6} style={{textAlign:'center',fontWeight:'Bold'}}>No data available</td></tr>
      }
    </table>
  </>
  )
}

export default ViewData