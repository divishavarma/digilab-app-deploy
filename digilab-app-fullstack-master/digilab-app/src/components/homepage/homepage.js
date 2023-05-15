import React, { useState } from "react";
import "./homepage.css";
import axios from "axios";

const Homepage = ({ setLoginUser, admin, setFormButtonText }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("email", admin.email);
  formData.append("text", text);
  if (image) {
    formData.append("image", image);
  }

  axios
    .post("http://localhost:9002/update", formData)
    .then((res) => {
      console.log(res.data);
      // Display success alert
      alert("Update Successful");

      // Reset form fields
      setImage(null);
      setText("");
      setFormButtonText(text); // Update the form button text with the latest text
    })
    .catch((error) => {
      console.error(error);
      // Handle error or display an error message
    });
};

  return (
    <div className="homepage">
      <h1>Hello Homepage</h1>
      <div className="admin-panel">
        <h2>Admin Panel</h2>
        <div>
          <strong>Name:</strong> {admin.name}
        </div>
        <div>
          <strong>Email:</strong> {admin.email}
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Image Update:
              <input type="file" onChange={handleImageChange} />
            </label>
          </div>
          <div>
            <label>
              Text Update:
              <input type="text" value={text} onChange={handleTextChange} />
            </label>
          </div>
          <button type="submit">Submit</button> {/* Use formButtonText state for button text */}
        </form>
      </div>
      <div className="button" onClick={() => setLoginUser({})}>
        Logout
      </div>
    </div>
  );
};

export default Homepage;
