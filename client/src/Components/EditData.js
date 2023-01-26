
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const API = 'http://localhost:4200';


const initialState = {
  name: "",
  email: "",
  contact: "",
  image: "",
}

const EditData = () => {
  const { id } = useParams();
  const [state, setState] = useState(initialState);
  const [img, setImg] = useState('');
  const { name, email, contact, image } = state;
  const history = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value })
  }
  const imgStatus = (e) => {
    setImg(e.target.files[0])
  }

  const getData = async (e) => {
    const allData = await Axios.get(`${API}/getData/${id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (allData !== undefined) {
      setState(allData.data.data[0])
    } else {
      console.log('Data Get');
    }
  }


  const updateData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', contact);
    formData.append('image', img);

    if (!name || !email || !contact || !img) {
      console.log('Please fill the data');

    } else {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const updateQry = await Axios.put(`${API}/editData/${id}`, formData, config);
      if (updateQry.data.status === 201) {
        history('/');
        alert("Data Updated");
      } else {
        alert('No data Added');
      }

    }
  }
  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className='addData'>
      <Link to='/AddData'>Add Data</Link>
      <Link to='/'>View Data</Link>
      <div className='form'>
        <div className='form_row'><input type={`text`} name={`name`} value={name || ""} onChange={handleInput} /></div>
        <div className='form_row'><input type={`email`} name={`email`} value={email || ''} onChange={handleInput} /></div>
        <div className='form_row'><input type={`text`} name={`phone`} value={contact || ''} onChange={handleInput} /></div>
        <div className='form_row'><input type={`text`} name={`image`} placeholder={image || ''} onChange ={handleInput} readOnly/></div>
        <div className='form_row'><input type={`file`} defaultValue={image || ''} name="image" onChange={imgStatus} /></div>

        <img src={`/images/${image}`} alt="" />
        <div className='form_row'><input type={`submit`} value={`Insert`} onClick={updateData} /></div>
      </div>
    </div>
  )
}
export default EditData;