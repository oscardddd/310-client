import { useState } from "react";
import Link from 'next/link'
import { Input, Button} from "antd";
import styles from "./login.module.css"

export default function Signup(){
    const [cname, setCName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const signup = async(e)=>{
        e.preventDefault()
        if(!username|| !email || !password){
            console.log("All fields are required")
        }
        
        else{
            console.log(username,email,password);
            let res = await fetch('https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/signup', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '/*/',
                    'User-Agent': 'PostmanRuntime/7.35.0'
                },
            body: JSON.stringify({
                // replace these keys with the actual keys of your API
                'username': username,
                'email': email,
                'password': password,
            })
            });
            
            let data = await res.json();
            console.log(data);
        }
    }

    return(
    <div className={styles.signup}>
        <h1>Signup</h1>
        <Input className={styles.input} type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}></Input>
        <Input className={styles.input} type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></Input>
        <Input className={styles.input} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}></Input>
        <Button className={styles.input} type="primary" size="large" onClick={signup}>Submit</Button>
    </div>

    )
}