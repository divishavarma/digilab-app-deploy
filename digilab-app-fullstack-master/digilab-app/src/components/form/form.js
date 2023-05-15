import React, { useState, useEffect } from "react";
import axios from "axios";


const Form = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [nextButtonText, setNextButtonText] = useState(props.formButtonText || "Next");
  const [formData, setFormData] = useState({});
  const [latestImageURL, setLatestImageURL] = useState("");


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission

  // Update the next button text using the setNextButtonText prop function
  props.setFormButtonText(formData.text);
};


useEffect(() => {
    // Fetch the latest text from the backend
    axios
      .get("https://digilab-app-fullstack-1.divishavarma.repl.co/latest-text")
      .then((res) => {
        const latestText = res.data.text;
        setNextButtonText(latestText);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
  axios
    .get("https://digilab-app-fullstack-1.divishavarma.repl.co/latest-image-url")
    .then((res) => {
      const latestImageURL = res.data.image;
      setLatestImageURL(latestImageURL);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);





  return (
    <div className={`page-content ${darkMode ? "dark-theme" : ""}`}>
      <div
        className="step-icon"
        style={{ float: "right", marginTop: "30px" }}
        onClick={toggleDarkMode}
      >
        <i className="zmdi zmdi-brightness-6" style={{ color: "#437EF7" }}></i>
      </div>
      <div className="wizard-v1-content">
        <div className="wizard-form">
          <form
            className="form-register"
            id="form-register"
            onSubmit={handleSubmit}
          >
          <div className="logo-container">
          <img src={latestImageURL} alt="Your logo" />

          </div>

            <div id="form-total">
              <h2>
                <span class="step-icon">
                  <i class="zmdi zmdi-lock"></i>
                </span>
                <span class="step-number">Step 1</span>
                <span class="step-text">Account</span>
              </h2>
              <section>
                  <div class="inner">
                    <div class="form-row">
                      <div class="form-holder form-holder-2">
                        <label for="name">Name</label>
                        <input type="text" placeholder="Divisha Varma" class="form-control" id="name" name="name" required/>
                        <small id="emailHelp" class="form-text text-muted">Please enter your name.</small>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-holder form-holder-2">
                        <label for="email">Email Address*</label>
                        <input type="email" placeholder="Email Address" class="form-control" id="email" name="email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                        <small id="emailHelp" class="form-text text-muted">Please input a real email address.</small>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-holder">
                        <label for="password">Password*</label>
                        <input type="password" placeholder="Password" class="form-control" id="password" name="password" required/>
                        <small id="emailHelp" class="form-text text-muted">Please enter your password.</small>
                      </div>
                      <div class="form-holder">
                        <label for="confirm_password">Confirm Password*</label>
                        <input type="password" placeholder="Confirm Password" class="form-control" id="confirm_password" name="confirm_password" required/>
                        <small id="emailHelp" class="form-text text-muted">Passwords need to match.</small>
                      </div>
                    </div>
                    <br/>
                    <div class="form-group form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                      <label class="form-check-label" for="exampleCheck1"> I accept the Terms and Privacy Policy</label>
                    </div>
                  </div>
                </section>

              <h2>
                          <span class="step-icon"><i class="zmdi zmdi-account"></i></span>
                          <span class="step-number">Step 2</span>
                          <span class="step-text">Personal</span>
                      </h2>
                      <section>
                          <div class="inner">
                              <div class="form-row">
                                  <div class="form-holder form-holder-2">
                                      <label for="location">Location</label>
                                      <input type="text" placeholder="Location" class="form-control" id="location" name="location"/>
                                  </div>
                              </div>
                              <div class="form-row">
                                  <div class="form-holder form-holder-2">
                                      <label for="address">Address</label>
                                      <input type="address" placeholder="Address" class="form-control" id="address" name="address"/>
                                  </div>
                              </div>
                              <div class="form-row">
                                  <div class="form-holder">
                                      <label for="age">Age</label>
                                      <input type="age" placeholder="Age" class="form-control" id="age" name="age"/>
                                  </div>
                                  <div class="form-holder">
                                      <label for="gender">Gender</label>
                                      <input type="gender" placeholder="Gender" class="form-control" id="gender" name="gender"/>
                                  </div>
                              </div>
                          </div>
                      </section>
                      <h2>
                          <span class="step-icon"><i class="zmdi zmdi-money"></i></span>
                          <span class="step-number">Step 3</span>
                          <span class="step-text">Billing</span>
                      </h2>
                      <section>
                          <div class="inner">
                              <div class="form-row">
                                  <div class="form-holder form-holder-2">
                                      <label for="card-type">Card Type</label>
                                      <select name="card-type" id="card-type" class="form-control">
                    <option value="" disabled selected>Select Credit Card Type</option>
                    <option value="Business Credit Cards">Business Credit Cards</option>
                    <option value="Limited Purpose Cards">Limited Purpose Cards</option>
                    <option value="Prepaid Cards">Prepaid Cards</option>
                    <option value="Charge Cards">Charge Cards</option>
                    <option value="Student Credit Cards">Student Credit Cards</option>
                  </select>
                                  </div>
                              </div>
                              <div class="form-row">
                                  <div class="form-holder form-holder-3">
                                      <label for="card-number">Card Number</label>
                                      <input type="text" name="card-number" class="card-number" id="card-number" placeholder="ex: 489050625008xxxx"/>
                                  </div>
                                  <div class="form-holder">
                                      <label for="cvc">CVC</label>
                                      <input type="text" name="cvc" class="cvc" id="cvc" placeholder="xxx"/>
                                  </div>
                              </div>
                              <div class="form-row form-row-2">
                                  <div class="form-holder">
                                      <label for="month">Expiry Month</label>
                                      <select name="month" id="month" class="form-control">
                    <option value="" disabled selected>Expiry Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="February">February</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                  </select>
                                  </div>
                                  <div class="form-holder">
                                      <label for="year">Expiry Year</label>
                                      <select name="year" id="year" class="form-control">
                    <option value="" disabled selected>Expiry Year</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                  </select>
                                  </div>
                              </div>
                          </div>
                      </section>
                      <h2>
                          <span class="step-icon"><i class="zmdi zmdi-thumb-up"></i></span>
                          <span class="step-number">Step 4</span>
                          <span class="step-text">Done</span>
                      </h2>
                      <section>
                          <div class="inner">
                              <h3>Comfirm Details</h3>
                              <div class="form-row table-responsive">
                                  <table class="table">
                                      <tbody>
                                          <tr class="space-row">
                                              <th>Username:</th>
                                              <td id="username-val"></td>
                                          </tr>
                                          <tr class="space-row">
                                              <th>Email Address:</th>
                                              <td id="email-val"></td>
                                          </tr>
                                          <tr class="space-row">
                                              <th>Card Type:</th>
                                              <td id="card-type-val"></td>
                                          </tr>
                                          <tr class="space-row">
                                              <th>Card Number:</th>
                                              <td id="card-number-val"></td>
                                          </tr>
                                          <tr class="space-row">
                                              <th>CVC:</th>
                                              <td id="cvc-val"></td>
                                          </tr>
                                          <tr class="space-row">
                                              <th>Expiry Month:</th>
                                              <td id="month-val"></td>
                                          </tr>
                                          <tr class="space-row">
                                              <th>Expiry Year:</th>
                                              <td id="year-val"></td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </section>
                  </div>

              </form>
          </div>
      </div>
  </div>
  );
};

export default Form;
