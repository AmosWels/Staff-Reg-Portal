import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const RetrieveSingleStaff = () => {
  const navigate = useNavigate();
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [staff, setStaff] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      employee_number: employeeNumber,
      unique_code: uniqueCode,
    };

    axios
      .post("http://localhost:8000/api/staff/retrieve/", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (
          typeof response.data !== "object" ||
          response.data === null ||
          Array.isArray(response.data)
        ) {
          alert("Warning: Please provide a valid employee ID.");
        } else {
          setStaff(response.data);
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.error || "Error Retrieving Staff";
        alert(errorMessage);
      });
  };

  const isValidBase64 = (str) => {
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(str);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`data:image/png;base64,${staff.id_photo}`);
    alert("Image URL copied to clipboard!");
  };

  return (
    <div className="container">
      <h2 className="my-4">Retrieve Staff by Employee Number</h2>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back Home
      </button>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Number</label>
          <input
            type="text"
            className="form-control"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Unique Code</label>
          <input
            type="text"
            className="form-control"
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Retrieve
        </button>
      </form>
      {staff && (
        <div className="card mt-4">
          <div className="card-body">
            <h3 className="card-title">Staff Details</h3>
            <p className="card-text">
              <strong>Surname:</strong> {staff.surname}
            </p>
            <p className="card-text">
              <strong>Other Name:</strong> {staff.other_names}
            </p>
            <p className="card-text">
              <strong>Date Of Birth:</strong> {staff.date_of_birth}
            </p>
            <p className="card-text">
              <strong>Unique Code:</strong> {staff.unique_code}
            </p>
            <p className="card-text">
              <strong>ID Photo:</strong>{" "}
              {staff.id_photo && isValidBase64(staff.id_photo) ? (
                <>
                  <img
                    src={`data:image/jpeg;base64,${staff.id_photo}`}
                    alt="ID Photo"
                  />
                  <br></br><br></br>
                  <button
                    onClick={copyToClipboard}
                    className="copy-button btn btn-primary"
                  >
                    <i className="fas fa-copy"></i> Copy ID Photo URL
                  </button>
                </>
              ) : (
                <p>{staff.id_photo}</p>
              )}
              <br></br>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetrieveSingleStaff;
