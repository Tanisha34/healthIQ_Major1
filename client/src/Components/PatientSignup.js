import React from "react";
import "../CSS/PatientSignup.css";
//import healthif from "../Images/healthif.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import healthIQ from "../contracts/healthIQ.json";

export default function DoctorSignup() {
  const [state, setState] = useState({ web3: null, contract: null });
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState(0);
  const [patid, setPatid] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const connect = async () => {
    try {
      const { web3 } = state;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log("Connected metamask", accounts[0]);
      // toast.success("Connected to Metamask");
    } catch (e) {
      console.log(e);
      // toast.error("Error connecting to Metamask");
    }
  };
  async function Submitted() {
    //patientSignUp to blockchain
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(
      `Name: ${name}, Contact: ${contact}, Patid: ${patid}, Password: ${password}, Cpassword: ${cpassword}`
    );
    const { contract } = state;
    // try {
    //   await contract.methods
    //     .patientSignUp(name, contact, patid, password)
    //     .send({
    //       from: "0xf5f59DA65F790bC66FA3B4caB20ef3DD9c051dec",
    //       gas: 3000000,
    //     });
    //   console.log("Submitted to blockchain");
    //   alert("Account Created Successfully");
    //   navigate("/patientsignin");
    // } catch (e) {
    //   console.error(e);
    //   console.log("ID already exists");
    //   alert("ID already exists");
    // }
    try {
      const transaction = contract.methods.patientSignUp(
        name,
        contact,
        patid,
        password
      );
      const gasEstimate = await transaction.estimateGas({
        from: currentAccount,
      });
      const confirmed = await window.ethereum.send("eth_sendTransaction", [
        {
          to: contract.options.address, // The contract address
          data: transaction.encodeABI(), // Encoded transaction data
          gas: gasEstimate.toString(), // Hex value of the gas limit
          from: currentAccount, // The user's account
        },
      ]);
      if (confirmed) {
        console.log("Transaction confirmed by user.");
        alert("Account Created Successfully");
        navigate("/patientsignin");
      } else {
        console.log("User canceled the transaction.");
      }
    } catch (error) {
      console.error("Error during transaction:", error);
      console.log("ID already exists");
      alert("ID already exists");
    }
  }
  // async function Submitted2() {
  //   //view Patient from blockchain
  //   const { contract } = state;
  //   try {
  //     const data = await contract.methods.viewPatients("12").call();
  //     console.log(data);
  //   } catch (e) {
  //     console.error(e);
  //     console.log("ID does not exist");
  //     alert("ID does not exist");
  //   }
  // }
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      // console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = healthIQ.networks[networkId];
      // console.log(deployedNetwork.address);
      const contract = new web3.eth.Contract(
        healthIQ.abi,
        deployedNetwork.address
      );
      // console.log(contract);//instance of contract
      setState({ web3: web3, contract: contract });
    }
    provider && template();
    connect();
  }, []);
  return (
    <>
      <section className="h-100 gradient-form sec">
        <div className="container py-5 h-100 sec">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row formheight g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        {/* <img className="im" src={healthif} alt="logo" /> */}
                        <p className="ft-title">
                          Health <span className="ft-sign">IQ</span>
                        </p>
                      </div>
                      <form>
                        <p>Please setup your Donor account</p>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="text"
                            id="form2Example111"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Full Name
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="number"
                            id="form2Example221"
                            className="form-control"
                            onChange={(e) => setContact(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Contact Number
                          </label>
                        </div>
                        <div className="form-outline mb-4 mx-7">
                          <input
                            type="email"
                            id="form2Example112"
                            className="form-control"
                            onChange={(e) => setPatid(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Donor ID
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example222"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            onChange={(e) => setCpassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Confirm Password
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn  bt btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={Submitted}
                          >
                            Sign up
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already Registered?</p>
                          <Link to="/PatientSignin">
                            <button
                              type="button"
                              className="btn but btn-outline-danger"
                            >
                              Sign in
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Some Facts</h4>
                      <ul className="small txt mb-0">
                        <li>
                          India has a diverse patient population with varying
                          cultural, linguistic, and socioeconomic backgrounds.
                        </li>
                        <li>
                          Access to healthcare remains a challenge for many
                          patients in rural and underserved areas of India.
                        </li>
                        <li>
                          Traditional healing practices, such as Ayurveda and
                          yoga, are still popular among a significant portion of
                          the patient population in India.
                        </li>
                        <li>
                          Medical tourism in India attracts patients from around
                          the world seeking affordable and high-quality
                          treatments.
                        </li>
                        <li>
                          Digital healthcare solutions and telemedicine
                          platforms are increasingly being utilized to improve
                          access to healthcare for patients in India.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <button onClick={Submitted2}>View</button> */}
    </>
  );
}
