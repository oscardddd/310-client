import { useState } from "react";
import { Modal, Input, Button } from "antd";
import styles from "./login.module.css";
import { useRouter } from 'next/router';

export default function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To store error message
    const [modalVisible, setModalVisible] = useState(false); // To show/hide modal

    const router = useRouter();

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
                'username': username,
                'email': email,
                'password': password,
            })
            });
            
            let data = await res.json();
            console.log(data);
            if (data == 'success') {
                router.push('/');
            }
            else{
                setErrorMessage('Username has been taken'); // Set error message
                setModalVisible(true); // Show modal window
            }
        }
    }

    const handleOk = () => {
        setModalVisible(false); // Hide modal window when OK button clicks
        router.push('/signup');
    };

    return(
        <div className={styles.signup}>
            <h1>Signup</h1>
            <Input className={styles.input} type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
            <Input className={styles.input} type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <Input className={styles.input} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            <Button className={styles.input} type="primary" size="large" onClick={signup}>Submit</Button>
            {errorMessage && <p>{errorMessage}</p>} {/* Display error message */}
            <Modal
                title="Error"
                visible={modalVisible}
                onOk={handleOk}
            >
                <p>{errorMessage}</p>
            </Modal>
        </div>
    );
}