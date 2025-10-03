import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';
import { Button, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faUser,
  faMapMarkerAlt,
  faCity,
  faGlobe,
  faEnvelope,
  faPhone,
  faLock,
  faUpload,
  faPercent,
  faArrowLeft,
  faUserPlus,
  faHandshake,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "../components/Loading";
import { BACKEND_URL } from "../../Globle";

const UserAndExpoersEnterPopUp = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const user = useRecoilValue(authAtom);
  const [showRegister, setShowRegister] = useState(false);
  const [showExporter, setShowExporter] = useState(false);

  const handleGoback = () => {
    setShowRegister(false);
    setShowExporter(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '12px',
          overflow: 'hidden'
        }
      }}
    >
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          {showRegister || showExporter ? (
            <button 
              onClick={handleGoback} 
              className="mr-3 hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          ) : null}
          {showRegister ? "Create New User" : showExporter ? "Register Client" : "Create New"}
        </h2>
        <button 
          onClick={handleClose} 
          className="hover:bg-white/10 p-2 rounded-full transition-colors"
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      </div>
      
      <DialogContent className="p-0">
       
          <Register handleGoback={handleGoback} />
      
      </DialogContent>
    </Dialog>
  );
};

// Register Component
const Register = ({ handleGoback }: { handleGoback: () => void }) => {
  const [contactPersonName, setContactPersonName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [webpage, setWebpage] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [companyLogo, setCompanyLogo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);

  const validation = () => {
    if (
      contactPersonName === "" ||
      companyName === "" ||
      city === "" ||
      country === "" ||
      phoneNumber === "" ||
      gstNo === "" ||
      email === "" ||
      state === "" ||
      pin === ""
    ) {
      alert("Please fill all the required fields");
      return false;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/add/user`,
        {
          email: email,
          password: password,
          contactPersonName: contactPersonName,
          companyName: companyName,
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: city,
          state: state,
          country: country,
          pin: pin,
          webpage: webpage,
          phoneNumber: phoneNumber,
          gstNo: gstNo,
          companyLogo: companyLogo,
        },
        {
          headers: {
            Authorization: cookies.token,
          },
        }
      );

      alert(res.data.message);
      handleGoback();
    } catch (error) {
      alert("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 max-h-[70vh] overflow-y-auto">
      {loading && <Loading />}

      <div className="w-full">
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <FontAwesomeIcon
                icon={faBuilding}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="Company Name *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="Contact Person Name *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={contactPersonName}
                onChange={(e) => setContactPersonName(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="Address Line 1 *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faCity}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="City *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faBuilding}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="State *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faGlobe}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="Country *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="PIN Code *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faPhone}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="Phone Number *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faGlobe}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="Website (optional)"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={webpage}
                onChange={(e) => setWebpage(e.target.value)}
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faPercent}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="text"
                placeholder="GST Number *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={gstNo}
                onChange={(e) => setGstNo(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="password"
                placeholder="Password *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-3 text-green-500 group-focus-within:text-green-600"
              />
              <input
                type="password"
                placeholder="Confirm Password *"
                className="pl-10 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="relative bg-white p-4 border border-dashed border-green-400 rounded-lg hover:bg-green-50 transition-colors text-center">
            <FontAwesomeIcon icon={faUpload} className="text-green-500 text-xl mb-2" />
            <p className="text-sm text-gray-600 mb-1">Upload Company Logo</p>
            <p className="text-xs text-gray-500">(JPEG, JPG, PNG formats accepted)</p>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                setCompanyLogo(e.target!.files![0]);
              }}
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleGoback}
              className="flex-1 py-3 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              Register User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Exporter Component


export default UserAndExpoersEnterPopUp;