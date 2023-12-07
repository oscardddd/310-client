import React, { useState, useEffect} from "react";
import { useRouter } from "next/router";
// import styles from "./profile.module.css";
import {Input, Button } from "antd";

export default function Profile() {

  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [itemsData, setItemsData] = useState(null)
  const [balance, setBalance] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(true);


  useEffect(() => {
    if (router.query.userid) {
      setUserId(router.query.userid);
      console.log(userId);
      fetch(
        `https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/userinfo/${router.query.userid}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((responses) => responses.json())
      .then((jsonData) => {
        console.log(jsonData)
        setUserData(jsonData);
      })

      fetch(
        // `https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/own/${router.query.userid}`,
        "https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/own/a370c063-c910-4afd-941f-45b5ab59fc7f",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((responses) => responses.json())
      .then((jsonData) => {
        console.log(jsonData)
        setItemsData(jsonData)
      })
    }
    else{
      console.log("aha")
    }
  }, [router.query.userid]);


  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (itemsData) {
      setItemsLoading(false);
    } else {
      setItemsLoading(true);
    }
  }, [userData, itemsData])


  const addBalance = async () => {
    if (balance) {
      console.log(`Adding balance ${balance} to user ${userId}`);
      let res = await fetch(`https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/balance/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "PostmanRuntime/7.35.0",
        },
        body: JSON.stringify({
          userid: userId,
          balance: balance,
        }),
      })
      const data = await res.json();
      if(data.msg == 'balance updated!'){
        alert("Added balance successfully")
      }
    } else {
      console.error("No balance entered");
      alert("No balance")
    }
  };


  const ItemsList = ({data, type}) => {
    return (
      <>
        {data.map((item, index) => (
          <div key={index}>
            <h3>{item.item_name}</h3>
            <img 
              src={`data:image/jpg;base64,/${item.picture}`}
              alt={item.item_name}
              width= "500"
              height="500"
            />
            {type == "bought" && <p>Final Price: {item.bought_price}</p>}
            {type == "selling" && <p>Current Price: {item.price}</p>}
            <p>Description: {item.description}</p>
          </div>
        ))}
      </>
    )
  }


  return (
    <>
      {loading ? (
        <h1> Loading......</h1>
      ) : (
        <>
          <h1>My Profile Page</h1>

          <div>
            <p>UserName: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Account balance: {userData.account_balance}</p>
          </div>

          <div>
            <input
              type="number"
              value={balance || ""}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Enter amount"
            />
            <button onClick={() => addBalance()}>Add Balance</button>
          </div>
        </>
      )}

    {itemsLoading ? (
        <h1> Loading......</h1>
      ) : (
        <>
          <h1>Items I Bought</h1>
          <ItemsList data={itemsData.bought} type={"bought"}></ItemsList>

          <h1>My On-Sale Items</h1>
          <ItemsList data={itemsData.selling} type={"selling"}></ItemsList>

          <h1>My Unsuccessful Auction Items</h1>
          <ItemsList data={itemsData.no_bidder} type={"no_bidder"}></ItemsList>
        </>
      )}    
    </>
  )
}
