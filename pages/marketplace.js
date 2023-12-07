import React, { useState, useEffect} from "react";
import { useRouter } from "next/router";
import styles from "./market.module.css";
import {Input, Button } from "antd";

export default function Component() {
  const [data, setData] = useState([]); // Initialize as an array
  const [bids, setBids] = useState({});
  const [userid, setUserId] = useState("");
  const [load, setloading] = useState(false);

  const router = useRouter();
  
  useEffect(() => {
    if (router.query.userid) {
      setUserId(router.query.userid);
      console.log(userid);
      setloading(true);
      fetch(
        "https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/all-items",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((responses) => responses.json())
      .then((jsonData) => {
          setData(jsonData.items);
      })
      .finally(()=>{
          setloading(false);
      })
    }
    else{
        console.log("aha")
    }
  }, [router.query.userid]);

  const sellitem = (e)=>{
    e.preventDefault();
    router.push({
      pathname: "/sell",
      query: { userid: userid },
    });
  }

  const myProfile = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/profile",
      query: { userid: userid },
    });
  }

  const handleBidChange = (itemid, value) => {
    setBids({ ...bids, [itemid]: value });
  };

  const placeBid = async (itemid) => {
    const bidAmount = bids[itemid];
    if (bidAmount) {
      console.log(`${userid}, Placing bid on item ${itemid} with amount ${bidAmount}`);

      let res = await fetch("https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/bid", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
            userid: userid,
            itemid: itemid, 
            price: bidAmount,
        }),
      })
      const data = await res.json();
      if(data.status == 'success'){
        alert("Place bid successfully")
      }
      
    } else {
      console.error("No bid amount entered");
      alert("No bid amount")

    }
  };

  return (
    <> 
      {/* <button onClick={test}>Load Items</button> */}
      {load ? (
        <h1> Loading......</h1>) : (
        <div className={styles.marketplace}>
          <Button onClick={sellitem}> Sell Item </Button>
          <Button onClick={myProfile}> My Profile </Button>
          {data.map((item, index) => (
            <div key={index} className={styles.item}>
              <h3>{item.item_name}</h3>
              <img 
                src={`data:image/jpg;base64,${item.picture}`}
                alt={item.item_name}
                className={styles.itemImage}
                width= "500"
                height="500"
              />
              <p>Owner: {item.owner}</p>
              <p>Starting Price: ${item.start_price}</p>
              <p>Expires on: {item.expiration_time}</p>
              <div>
                <input
                  type="number"
                  value={bids[item.itemid] || ""}
                  onChange={(e) => handleBidChange(item.itemid, e.target.value)}
                  placeholder="Enter bid amount"
                />
                <button onClick={() => placeBid(item.itemid)}>Place Bid</button>
              </div>
            </div>
          ))}
        </div>
        )}
     
    </>
  );
}
