import { useState } from "react";
import { Modal, Input, Button } from "antd";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Signup() {
  const [itemName, setItemName] = useState("");
  const [startPrice, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState("");
  const [imageFilename, setImageFilename] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To store error message
  const [modalVisible, setModalVisible] = useState(false); // To show/hide modal

  const [userid, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.userid) {
      setUserId(router.query.userid);
      console.log(userid);
    }
  }, [router.query.userId]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFilename(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sell = async (e) => {
    e.preventDefault();
    if (!itemName || !startPrice || !description || !imageData) {
      console.log("All fields are required");
    } else if (!userid) {
      alert("Identification failed");
    } else {
      console.log(itemName, startPrice, description, imageFilename, imageData);
      let res = await fetch(
        "https://ug627f5dha.execute-api.us-east-2.amazonaws.com/test1/sell-item",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "PostmanRuntime/7.35.0",
          },
          body: JSON.stringify({
            userid: userid,
            item_name: itemName,
            start_price: startPrice,
            description: description,
            filename: imageFilename,
            data_str: imageData,
            ttl: 2,
          }),
        }
      );
      let data = await res.json();
      console.log(data);
      if (res.status === 200) {
        alert("Successfully submitted");
      } else {
        console.log(res);
        alert("Something went wrong, please try again.");
      }
    }
  };

  const handleOk = () => {
    setModalVisible(false); // Hide modal window when OK button clicks
    router.push("/signup");
  };

  return (
    <div className={styles.signup}>
      <h1>Please Fill In the Item Information</h1>
      <Input
        className={styles.input}
        type="text"
        placeholder="Enter Your Item Name"
        onChange={(e) => setItemName(e.target.value)}
      />
      <Input
        className={styles.input}
        type="number"
        placeholder="Enter Start Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        className={styles.input}
        type="text"
        placeholder="Enter Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <Button
        className={styles.input}
        type="primary"
        size="large"
        onClick={sell}
      >
        Submit
      </Button>
      {errorMessage && <p>{errorMessage}</p>} {/* Display error message */}
      <Modal title="Error" visible={modalVisible} onOk={handleOk}>
        <p>{errorMessage}</p>
      </Modal>
    </div>
  );
}
