import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
    render() {
        return (
            <form>
                <h3>Log In</h3>
                <hr/>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"/>
                    </div>
                </div>
                <br/>
                <div class="form-group row">
                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputName" placeholder="Name"/>
                    </div>
                </div>
                <br/>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
                    </div>
                </div>
                <br />
                <div class="form-group">
                    <label for="formGroupExampleInput">Example label</label>
                    <br /><br />
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input"/>
                </div>
                <hr/>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <br/>

                <button type="submit" className="btn btn-primary">Submit</button>
                <br/>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}