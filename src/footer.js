 import React from 'react'
import classes from './Footer.module.css'
 const footer =(props)=>{

    return (
        <div className ={classes.footer}>
            <label>{props.activeTaskCount} task left!!</label>
            <ul className={classes.filters}>
            <li>ALL</li>
            <li>ACTIVE</li>
            <li>COMPLETED</li>
            </ul>
            
        </div>
    )

 }

 export default footer;