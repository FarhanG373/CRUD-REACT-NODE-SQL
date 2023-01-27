import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './component.scss';
import Axios from 'axios';
import { toast } from "react-toastify";
const API = 'http://localhost:4200';

const initialState = {
  name: '',
  email: '',
  phone: '',
}

const AddData = () => {
  const [state, setState] = useState(initialState);
  const [img, setImg] = useState('');
  const { name, email, phone } = state;
  const history = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value })
  }

  const imgStatus = (e) => {
    setImg(e.target.files[0])
  }
  const addData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('image', img);
    if (!name || !email || !phone || !img) {
      toast.error('Please fill the data');
    } else {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }

      const AddGet = await Axios.post(`${API}/AddData`, formData, config);
      if (AddGet.data.status === 201) {
        history('/');
        alert("Data Adde");
      } else {
        alert('No data Added')
      }
    }
  }

  return (
    <div className='addData'>
      <div className='form'>
        <h2>Add new Data</h2>
        <div className='form_row'><input type={`text`} placeholder='Name' name={`name`} onChange={handleInput} /></div>
        <div className='form_row'><input type={`email`} placeholder='Email' name={`email`} onChange={handleInput} /></div>
        <div className='form_row'><input type={`text`} placeholder='Phone' name={`phone`} onChange={handleInput} /></div>
        <div className='form_row'><input type={`file`} name='image' onChange={imgStatus} /></div>
        <div className='form_row'><input type={`submit`} value={`Insert`} onClick={addData} /></div>
      </div>
    </div>
  )
}

export default AddData