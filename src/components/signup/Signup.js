import React, { Component } from "react";
import "./Signup.css";
//import Signin from "../signin/Signin";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout";
// import { Redirect } from 'react-router'
//import { useNavigate } from 'react-router-dom';
import { TextField} from "@mui/material";
import { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';



export default function Signup() {
    document.title = "stack4u/SignUp";
    
    var [name, setName] = useState("");

    const handleChange = e => (
        console.log(e.target.value),
        setName(e.target.value)
    )

    return (
        <div>
            <label>Name</label>
            <input value={name} onChange={handleChange}/>
        </div>    
    )
}