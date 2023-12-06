import React, { useState } from "react";
import styles from "./login.module.css";

export default function Component() {
  const [data, setData] = useState([]); // Initialize as an array
  const [bids, setBids] = useState({});

  const test = async () => {
    Promise.all([
      fetch(
        "https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/all-items",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      ),
    ])
      .then((responses) => responses[0].json())
      .then((jsonData) => {
        setData(jsonData.items);
      });
  };

  const handleBidChange = (itemid, value) => {
    setBids({ ...bids, [itemid]: value });
  };

  const placeBid = (itemid) => {
    const bidAmount = bids[itemid];
    if (bidAmount) {
      console.log(`Placing bid on item ${itemid} with amount ${bidAmount}`);

      // fetch('/api/place-bid', { ... })
    } else {
      console.error("No bid amount entered");
    }
  };

  return (
    <>
      <button onClick={test}>Load Items</button>
      <div className={styles.marketplace}>
        {data.length === 0 ? (
          <div className={styles.wait}>Please wait or load items!</div>
        ) : (
          data.map((item, index) => (
            <div key={index} className={styles.item}>
              <h3>{item.item_name}</h3>
              <img
                src={`data:image/jpg;base64,${item.picture}`}
                alt={item.item_name}
                className={styles.itemImage}
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
          ))
        )}
      </div>
    </>
  );
}
