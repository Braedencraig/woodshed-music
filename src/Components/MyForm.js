
import React from "react";

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }
  
  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }

  render() {
    const { status } = this.state;
    return (
      <form
        onSubmit={(ev) => this.submitForm(ev)}
        action="https://formspree.io/f/mleoodgr"
        method="POST"
      >
        <label>Full Name:</label>
        <input type="text" name="name" required />
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" required/>
        <label>Email:</label>
        <input type="email" name="email" required />
        <label for="message">Message:</label>
        <textarea type="text" name="message" rows="4" cols="50">
        </textarea>
        {status === "SUCCESS" ? <p>Thanks!</p> : <button>Submit</button>}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    );
  }

}