import React from "react";
import "../CSS/DoctorAccessRecord.css";
import Web3, { net } from "web3";
import { useState, useEffect } from "react";
import healthIQ from "../contracts/healthIQ.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AccessRecord() {
  let ageArray = [];
  let weightArray = [];
  let heightArray = [];
  let bloodPressureArray = [];
  let heartRateArray = [];
  let temperatureArray = [];
  let dateArray = [];
  let prescriptionArray = [];
  let cidhashArray = [];
  let linkArray = [];
  const [state, setState] = useState({ web3: null, contract: null });
  const [patid, setPatid] = useState("");
  const [nrecords, setNrecords] = useState(1);

  const [llink, setLlink] = useState("https://");
  const [rlink, setRlink] = useState(".ipfs.w3s.link");
  const [link, setLink] = useState([]);
  const [ind, setInd] = useState(0);
  const [pid, setPid] = useState([]);
  const [age, setAge] = useState([]);
  const [weight, setWeight] = useState([]);
  const [height, setHeight] = useState([]);
  const [bloodPressure, setBloodPressure] = useState([]);
  const [heartRate, setHeartRate] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [date, setDate] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [cidhash, setCidhash] = useState([]);
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
  // const fetchParticularRecord = async () => {
  //   const { contract } = state;
  //   const record = await contract.methods
  //         .doctorViewDetails(patid)
  //         .call({ from: currentAccount });

  //       console.log("record", record);
  //       setNrecords(record.length);
  //       // console.log("nrec", nrecords);

  //       for (let i = 0; i < record.length; i++) {
  //         ageArray.push(record[i].age);
  //         weightArray.push(record[i].weight);
  //         heightArray.push(record[i].height);
  //         bloodPressureArray.push(record[i].bp);
  //         heartRateArray.push(record[i].heartrate);
  //         temperatureArray.push(record[i].temp);
  //         dateArray.push(record[i].date);
  //         prescriptionArray.push(record[i].prescription);
  //         cidhashArray.push(record[i].report);
  //         if (cidhashArray[i] === "") {
  //           linkArray.push("no_record");
  //         } else {
  //           linkArray.push(llink + cidhashArray[i] + rlink);
  //         }
  //       }
  //       setPid(patid);
  //       setBloodPressure(bloodPressureArray);
  //       setHeartRate(heartRateArray);
  //       setTemperature(temperatureArray);
  //       setDate(dateArray);
  //       setPrescription(prescriptionArray);
  //       setCidhash(cidhashArray);
  //       setLink(linkArray);
  //       const intWeightArray = weightArray.map((bigint) => Number(bigint));
  //       setWeight(intWeightArray);
  //       // console.log("wt arr",intWeightArray);

  //       const intAgeArray = ageArray.map((bigint) => Number(bigint));
  //       setAge(intAgeArray);
  //       // console.log("age arr",intAgeArray);

  //       const intHeightArray = heightArray.map((bigint) => Number(bigint));
  //       setHeight(intHeightArray);
  //       // console.log("height arr",intHeightArray);

  //       const intTempArray = temperatureArray.map((bigint) => Number(bigint));
  //       setTemperature(intTempArray);
  //       // console.log("temp arr",intTempArray);

  //       // console.log("age",age);
  //       // console.log("weight",weight);
  //       // console.log("height",height);
  //       // console.log("bloodPressure",bloodPressure);
  //       // console.log("heartRate",heartRate);
  //       // console.log("temperature",temperature);
  //       // console.log("date",date);
  //       // console.log("prescription",prescription);
  //       console.log("cidhash", cidhash);
  //       console.log("link", link);
  // }
  async function fetchRecords() {
    const { contract } = state;
    try {
      const { contract } = state;
      const record = await contract.methods
        .doctorViewDetails(patid)
        .call({ from: currentAccount });

      console.log("record", record);
      setNrecords(record.length);
      // console.log("nrec", nrecords);

      for (let i = 0; i < record.length; i++) {
        ageArray.push(record[i].age);
        weightArray.push(record[i].weight);
        heightArray.push(record[i].height);
        bloodPressureArray.push(record[i].bp);
        heartRateArray.push(record[i].heartrate);
        temperatureArray.push(record[i].temp);
        dateArray.push(record[i].date);
        prescriptionArray.push(record[i].prescription);
        cidhashArray.push(record[i].report);
        if (cidhashArray[i] === "") {
          linkArray.push("no_record");
        } else {
          linkArray.push(llink + cidhashArray[i] + rlink);
        }
      }
      setPid(patid);
      setBloodPressure(bloodPressureArray);
      setHeartRate(heartRateArray);
      setTemperature(temperatureArray);
      setDate(dateArray);
      setPrescription(prescriptionArray);
      setCidhash(cidhashArray);
      setLink(linkArray);
      const intWeightArray = weightArray.map((bigint) => Number(bigint));
      setWeight(intWeightArray);
      // console.log("wt arr",intWeightArray);

      const intAgeArray = ageArray.map((bigint) => Number(bigint));
      setAge(intAgeArray);
      // console.log("age arr",intAgeArray);

      const intHeightArray = heightArray.map((bigint) => Number(bigint));
      setHeight(intHeightArray);
      // console.log("height arr",intHeightArray);

      const intTempArray = temperatureArray.map((bigint) => Number(bigint));
      setTemperature(intTempArray);
      // console.log("temp arr",intTempArray);

      // console.log("age",age);
      // console.log("weight",weight);
      // console.log("height",height);
      // console.log("bloodPressure",bloodPressure);
      // console.log("heartRate",heartRate);
      // console.log("temperature",temperature);
      // console.log("date",date);
      // console.log("prescription",prescription);
      console.log("cidhash", cidhash);
      console.log("link", link);
    } catch (e) {
      console.error(e);
      // toast.error("Invalid Patient ID");
      alert("Inavlid Donor ID");
    }
  }

  // async function fetchRecords() {
  //   const { contract } = state;
  //   try {
  //     const transaction = contract.methods.doctorViewDetails(patid);
  //     const gasEstimate = await transaction.estimateGas({
  //       from: currentAccount,
  //     });

  //     const confirmed = await window.ethereum.send("eth_sendTransaction", [
  //       {
  //         to: contract.options.address, // The contract address
  //         data: transaction.encodeABI(), // Encoded transaction data
  //         gas: gasEstimate.toString(), // Gas limit as a string
  //         from: currentAccount, // The user's account
  //       },
  //     ]);
  //     if (confirmed) {
  //       // Transaction confirmed by user, call the method
  //       fetchParticularRecord();
  //     }
  //        else {
  //       console.log("User canceled the transaction.");
  //     }
  //     fetchParticularRecord();
  //   } catch (e) {
  //     console.error(e);
  //     // toast.error("Invalid Patient ID");
  //     alert("Inavlid Patient ID");
  //   }
  // }
  useEffect(() => {
    setInd(0);
  }, [patid]);
  function getPrevious() {
    if (ind > 0) {
      setInd(ind - 1);
    }
  }
  function getNext() {
    if (ind < nrecords - 1) {
      setInd(ind + 1);
    }
  }
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
      <div className="head1">
        <div className="askid">
          <div className="patid">
            <div className="askdetails">
              <label className="lab">Enter ID&nbsp;&nbsp;:</label>&nbsp;&nbsp;
              <input
                type="text"
                className="patidinp"
                placeholder="Donor ID"
                onChange={(e) => setPatid(e.target.value)}
              />
            </div>
            <div className="submitpatid">
              <button className="patidsubbtn" onClick={fetchRecords}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="Recordcard">
          <div className="title">
            <h2>Donor's Record</h2>
          </div>
          <div className="showRecords">
            <div className="clabel leftdetails">
              <div className="infodiv">
                <label className="hllabel">Donor ID</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{pid}</span>
              </div>
              <div className="infodiv">
                <label className="hllabel">Weight</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{weight[ind]}</span>
              </div>
              <div className="infodiv">
                <label className="hllabel">Blood Pressure</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{bloodPressure[ind]}</span>
              </div>
              <div className="infodiv">
                <label className="hllabel">Body Temperature</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{temperature[ind]}</span>
              </div>
              {/* <div>
                <label className="hllabel">
                  Prescription&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">{prescription[ind]}</span>
              </div> */}
            </div>
            <div className="clabel rightdetails">
              <div className="infodiv">
                <label className="hrlabel">Age</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{age[ind]}</span>
              </div>
              <div className="infodiv">
                <label className="hrlabel">Height</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{height[ind]}</span>
              </div>
              <div className="infodiv">
                <label className="hrlabel">Heart Rate</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{heartRate[ind]}</span>
              </div>
              <div className="infodiv">
                <label className="hrlabel">Date</label>
                <span className="separator-col">:</span>
                <span className="healthpara">{date[ind]}</span>
              </div>
              {/* <div>
                <label className="hrlabel">
                  Report&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <span className="healthpara">
                  <a className="hyplink" href={link[ind]}>
                    Find here
                  </a>
                </span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="bottomdiv">
          <div className="bottomRecord">
            <label className="blabel">Prescription</label>
            <span className="separator-col separator-col-pres">:</span>
            <span className="bspan1">{prescription[ind]}</span>
          </div>
          <div className="bottomRecord">
            <label className="blabel">Report</label>
            <span className="separator-col ">:</span>
            <span className="bspan2">
              <a className="hyplink" href={link[ind]} target="_blank">
                Find here
              </a>
            </span>
          </div>
        </div>
        <div className="next-prevctr">
          <div id="prevbtn" className="prevbtndiv npbtn">
            <button
              className="prevbtn npbtntext patidsubbtn"
              onClick={getPrevious}
            >
              Prev
            </button>
          </div>
          <div id="nextbtn" className="nextbtndiv npbtn">
            <button className="nextbtn npbtntext patidsubbtn" onClick={getNext}>
              Next
            </button>
          </div>
        </div>
        <div className="sequence">
          <label className="sequence-number">
            {ind + 1}/{nrecords}
          </label>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
