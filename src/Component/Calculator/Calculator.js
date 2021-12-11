
import React, { useState } from 'react'
import "./Calculator.css"
import axios from "axios"
import jwt from "jsonwebtoken"
function Calculator() {
    const [data, setData] = useState({});
    const [TaxInc, setTaxInc] = useState("");
    const calculation = async () => {
        let AppHRA;
        if (data.City == "Metro") {
            AppHRA = Math.min((data.Bas / 2), Math.min(data.Rent - (data.Bas / 100), data.HRA));
        }
        else {
            AppHRA = Math.min(((data.Bas * 2) / 5), Math.min(data.Rent - (data.Bas / 100), data.HRA));
        }

        let Tax = parseFloat((parseInt(data.Bas) + parseInt(data.LTA) + parseInt(data.HRA) + parseInt(data.FA)) - parseInt(AppHRA) - parseInt(data.Inv) - parseInt(data.Med));

        setTaxInc(Tax);
        // console.log(data);
        var res = await axios.post("http://localhost:5000/form", data);
        // console.log(res);
        if (res.data.msg == "success") {
            return;
        }
        else {
            alert("failed");
        }


    }
    const submit = async (e) => {
        e.preventDefault();
        var btn = document.getElementById("pop").click();
        calculation();
        return;
    }
    const Calculate = async (e) => {
        e.preventDefault();

        var auth = false;
        var token = localStorage.getItem("token");
        if (token) {
            jwt.verify(token, 'secret', (err, user) => {

                if (user) {
                    setData({ ...data, user: user.user.username });
                    console.log(user.user.username);
                    auth = true;
                }
                else {
                    console.log(err);
                }
            })
        }
        if (auth == false) {
            alert("You are not logged in!")
            return;
        }

        if (data.Bas == undefined || data.LTA == undefined || data.HRA == undefined || data.FA == undefined|| data.City == undefined || data.Inv == undefined || data.Rent == undefined || data.Med == undefined) {
            alert("fill all the fields first!");
            return;
        }
        if (data.Bas == "" || data.LTA == "" || data.HRA == "" || data.FA == "" || data.Inv == "" || data.Rent == "" || data.Med == "") {
            alert("fill all the fields first!");
            return;
        }
        var btn = document.getElementById("pop").click();
        return;

    }
    return (
        <>
            <div className="card" >
                <h2 className="heading" > <u> Tax-Calculator </u></h2>
                <form onSubmit={Calculate} >

                    <div className="grp" >
                        <div className="grp1" >
                            <div class="input-box">
                                <label for="Bas">Bas</label>
                                <input onChange={(e) => { setData({ ...data, Bas: e.target.value }) }} type="number" class="form-control" id="Bas" placeholder="Enter Bas"></input>
                            </div>
                            <div class="input-box">
                                <label for="LTA">LTA</label>
                                <input onChange={(e) => { setData({ ...data, LTA: e.target.value }) }} type="number" class="form-control" id="LTA" placeholder="Enter LTA"></input>
                            </div>
                            <div class="input-box">
                                <label for="HRA">HRA</label>
                                <input onChange={(e) => { setData({ ...data, HRA: e.target.value }) }} type="number" class="form-control" id="HRA" placeholder="Enter HRA"></input>
                            </div>
                            <div class="input-box">
                                <label for="FA">FA</label>
                                <input onChange={(e) => { setData({ ...data, FA: e.target.value }) }} type="number" class="form-control" id="FA" placeholder="Enter FA"></input>
                            </div>
                        </div>
                        <div className="grp2" >
                            <div class="input-box">
                                <label for="Inv">Inv</label>
                                <input onChange={(e) => { setData({ ...data, Inv: e.target.value }) }} type="number" class="form-control" id="Inv" placeholder="Enter Inv"></input>
                            </div>
                            <div className="input-box">
                                <label for="Rent">Rent</label>
                                <input onChange={(e) => { setData({ ...data, Rent: e.target.value }) }} type="number" class="form-control" id="Rent" placeholder="Enter Rent"></input>
                            </div>
                            <div className="input-box" >
                                <label for="city">City Type</label>
                                <select onChange={(e) => { setData({ ...data, City: e.target.value }) }} class="form-control" id="city">
                                    <option>Select</option>
                                    <option>Metro</option>
                                    <option>Non Metro</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <label for="Med">Med</label>
                                <input onChange={(e) => { setData({ ...data, Med: e.target.value }) }} type="number" class="form-control" id="Med" placeholder="Enter Med"></input>
                            </div>


                        </div>
                    </div>

                    <h1>{(TaxInc != "") ? "Your Tax Income : " + TaxInc : ""}</h1>
                    <button type="submit" className="btn btn-primary">Calculate</button>
                    <div>
                        <button style={{ display: "none" }} type="button" id="pop" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Calculate
                        </button>

                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 style={{ color: "black", marginLeft: "100px" }} className="modal-title" id="exampleModalLongTitle"><u>Details Confirmation Page</u></h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" style={{ color: "black" }} >
                                        <div style={{ display: "flex" }} >
                                            <div style={{ margin: "auto" }} >
                                                <h4>Bas:{" " + data.Bas}</h4>
                                                <h4>LTA:{" " + data.LTA}</h4>
                                                <h4>HRA:{" " + data.HRA}</h4>
                                                <h4>FA:{" " + data.FA}</h4>
                                            </div>
                                            <div style={{ margin: "auto" }}>
                                                <h4>Inv:{" " + data.Inv}</h4>
                                                <h4>Rent:{" " + data.Rent}</h4>
                                                <h4>City:{" " + data.City}</h4>
                                                <h4>Med:{" " + data.Med}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button onClick={submit} type="button" class="btn btn-primary">Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <small className="form-text text-muted">We'll never share your data with anyone else.</small>
                </form>
            </div>
        </>
    );
}
export default Calculator;