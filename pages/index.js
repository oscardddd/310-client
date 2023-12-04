
import { useState } from 'react'
import Link from 'next/link'
import styles from './login.module.css'
import {Button, Input} from 'antd'
import Header from '../layout/layout'

export default function Login() {

    // const auth = getAuth()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // Functions
    const login = (e, email, password) => {
        e.preventDefault()
        if (!email || !password) {
            setError("All fields are required");
            
        }
        
    }

    return (

      // <form className={styles.body} onSubmit = {(e)=> login(e,email,password)}>
      //    
          
      // </form>
      <div>
        <Header className = {styles.header}/>
        <div className={styles.body}>
          <h1 className= {styles.loginTitle}>Login</h1>
          <Input className={styles.input} type="email" placeholder="School Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="primary" onClick={login}>LOGIN</Button>
          <p>Need Signup?
            <Link href="/signup">Signup</Link>
            
          </p>

        </div>
      </div>
        
    )
}