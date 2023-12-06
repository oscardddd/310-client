import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";
import { Button, Input } from "antd";
import { useRouter } from "next/router";
import Header from "../layout/layout";

export default function Login() {
  // const auth = getAuth()
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Functions
  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
    } else {
      let res = await fetch(
        "https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "/*/",
            "User-Agent": "PostmanRuntime/7.35.0",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      let data = await res.json();
      console.log(data);
      if (data.status == "success") {
        const userid = data.userid;
        router.push({
          pathname: "/sell",
          query: { userid: userid },
        });
      } else {
        console.log("error");
      }
    }
  };

  return (
    <div>
      <Header className={styles.header} />
      <div className={styles.body}>
        <h1 className={styles.loginTitle}>Login</h1>
        <Input
          className={styles.input}
          type="email"
          placeholder="School Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" onClick={login}>
          LOGIN
        </Button>
        <p>
          Need Signup?
          <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
