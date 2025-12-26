import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Enquire = () => {
  const [country, setCountry] = useState([]);
  const [ports, setPorts] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [L, setL] = useState("");
  const [B, setB] = useState("");
  const [H, setH] = useState("");

  const [enquiry, setEnquiry] = useState({
    co: "",
    port: "",
    commodity: "",
    cargoUnit: "",
    packages: "",
    dimensions: "",
    transport: "",
    shipment: "",
    contact: "",
    email: "",
    organization: "",
  });
  
  const [countryInput, setCountryInput] = useState("");
  const [portInput, setPortInput] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showPortDropdown, setShowPortDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPorts, setFilteredPorts] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const updatedEnquiry = {
      ...enquiry,
      dimensions: `${L} × ${B} × ${H}`
    };
    console.log('Sending enquiry:', updatedEnquiry); // For debugging
    setEnquiry(updatedEnquiry);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendmail`, updatedEnquiry);
    console.log('Response:', response.data); // For debugging
    setPopUp(true);
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    // Handle error (e.g., show error message to user)
  }
};


  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name")
      .then((res) => {
        const names = res.data.map((c) => c.name.common).sort();
        setCountry(names);
        setFilteredCountries(names);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCountryInputChange = (e) => {
    const input = e.target.value;
    setCountryInput(input);
    
    if (input.length > 0) {
      const filtered = country.filter(c => 
        c.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowCountryDropdown(true);
    } else {
      setFilteredCountries(country);
      setShowCountryDropdown(false);
    }
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountryInput(selectedCountry);
    setEnquiry({ ...enquiry, co: selectedCountry });
    setShowCountryDropdown(false);
  };

  const handlePortInputChange = (e) => {
    const input = e.target.value;
    setPortInput(input);
    
    if (input.length > 0) {
      const filtered = ports.filter(port => 
        port.CITY.toLowerCase().includes(input.toLowerCase()) ||
        port.COUNTRY.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredPorts(filtered);
      setShowPortDropdown(true);
    } else {
      setFilteredPorts(ports);
      setShowPortDropdown(false);
    }
  };

  const handlePortSelect = (selectedPort) => {
    const portDisplay = `${selectedPort.CITY} Port, ${selectedPort.COUNTRY}`;
    setPortInput(portDisplay);
    setEnquiry({ ...enquiry, port: selectedPort.CITY });
    setShowPortDropdown(false);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ports`)
      .then((res) => {
        setPorts(res.data.data);
        setFilteredPorts(res.data.data);
      })
      .catch((err) => console.log("Port fetch error", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500 px-4 font-serif py-10">
      <h1 className="text-4xl text-center text-white">
        Shipment Enquiry
      </h1>
      <h2 className='text-[10.5px] text-gray-300 font-thin text-center tracking-wider mb-8'>- Fast response from our logistics team.</h2> 

      <div className="w-full max-w-6xl border-2 border-black bg-white shadow-xl rounded-2xl p-5 sm:p-10"> 

        {/* 2 Column layout */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT COLUMN */}
            <div className="space-y-8">

              {/* Origin Details */}
              <div className="bg-gray-50 border-gray-400 border-2 p-6 rounded-xl space-y-4">
                <h3 className="text-2xl text-gray-800 underline">
                  Origin Details
                </h3> <hr />

                <div className="relative">
                  <label className="font-medium">Country of Origin <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={countryInput}
                    onChange={handleCountryInputChange}
                    onFocus={() => countryInput.length > 0 && setShowCountryDropdown(true)}
                    onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                    className="w-full border p-3 rounded-lg mt-1"
                    placeholder="Type to search country..."
                  />
                  {showCountryDropdown && filteredCountries.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredCountries.map((name) => (
                        <div
                          key={name}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() => handleCountrySelect(name)}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    type="hidden"
                    name="co"
                    value={enquiry.co}
                    required
                  />
                </div>

                <div className="relative">
                  <label className="font-medium">Port of Discharge <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={portInput}
                    onChange={handlePortInputChange}
                    onFocus={() => portInput.length > 0 && setShowPortDropdown(true)}
                    onBlur={() => setTimeout(() => setShowPortDropdown(false), 200)}
                    className="w-full border p-3 rounded-lg mt-1"
                    placeholder="Type to search port..."
                  />
                  {showPortDropdown && filteredPorts.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredPorts.map((port) => (
                        <div
                          key={port._id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() => handlePortSelect(port)}
                        >
                          {port.CITY} Port, {port.COUNTRY}
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    type="hidden"
                    name="port"
                    value={enquiry.port}
                    required
                  />
                </div>
              </div>

              {/* Cargo Details */}
              <div className="bg-gray-50 p-6 rounded-xl border-gray-400 border-2 space-y-4">
                <h3 className="text-2xl text-gray-800 underline">
                  Cargo Details
                </h3> <hr className="text-black" />

                <input
                  type="text"
                  placeholder="Commodity"
                  required
                  className="w-full border-gray-300 border-2 p-3 rounded-lg"
                  onChange={(e) =>
                    setEnquiry({ ...enquiry, commodity: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Cargo Unit"
                  required
                  className="w-full border-gray-300 border-2  p-3 rounded-lg"
                  onChange={(e) =>
                    setEnquiry({ ...enquiry, cargoUnit: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="No. of Packages"
                  required
                  className="w-full border-gray-300 border-2  p-3 rounded-lg"
                  onChange={(e) =>
                    setEnquiry({ ...enquiry, packages: e.target.value })
                  }
                />
                <hr />

                <div>
                    <label className="font-medium block mb-1">Dimensions (L × B × H) <span className="text-red-500">*</span></label>

                    <div className="grid grid-cols-3 gap-3">
                        <input
                        type="number"
                        placeholder="L"
                        required
                        className="border-gray-300 border-2  p-3 rounded-lg"
                        onChange={(e) => setL(e.target.value)}
                        />

                        <input
                        type="number"
                        placeholder="B"
                        required
                        className="border-gray-300 border-2  p-3 rounded-lg"
                        onChange={(e) => setB(e.target.value)}
                        />

                        <input
                        type="number"
                        placeholder="H"
                        required
                        className="border-gray-300 border-2  p-3 rounded-lg"
                        onChange={(e) => setH(e.target.value)}
                        />
                    </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">

              {/* Transport Details */}
              <div className="bg-gray-50 p-6 rounded-xl border-gray-400 border-2 space-y-4">
                <h3 className="text-2xl underline text-gray-800">
                  Transport Details
                </h3><hr />

                <div>
                  <label className="font-medium">Mode of Transport <span className="text-red-500">*</span></label>
                  <div className="mt-2 space-y-2 font-medium">
                    {["air", "sea", "land"].map((type) => (
                      <label key={type} className="flex gap-2 items-center">
                        <input
                          type="radio"
                          name="transport"
                          required
                          value={type}
                          onChange={(e) =>
                            setEnquiry({
                              ...enquiry,
                              transport: e.target.value,
                            })
                          }
                        />
                        {type.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div><hr />

                <div>
                  <label className="font-medium">Shipment Type <span className="text-red-500">*</span></label>
                  <div className="mt-2 space-y-2 font-medium">
                    {["import", "export"].map((type) => (
                      <label key={type} className="flex gap-2 items-center">
                        <input
                          type="radio"
                          name="shipment"
                          value={type}
                          required
                          onChange={(e) =>
                            setEnquiry({
                              ...enquiry,
                              shipment: e.target.value,
                            })
                          }
                        />
                        {type.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="bg-gray-50 p-6 rounded-xl border-gray-400 border-2 space-y-4">
                <h3 className="text-2xl underline text-gray-800">
                  Company Details
                </h3><hr />

                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full border-gray-300 border-2  p-3 rounded-lg"
                  onChange={(e) =>
                    setEnquiry({ ...enquiry, email: e.target.value })
                  }
                />

                <input
                  type="text"
                  required
                  placeholder="Contact Number"
                  className="w-full border-gray-300 border-2  p-3 rounded-lg"
                  onChange={(e) =>
                    setEnquiry({ ...enquiry, contact: e.target.value })
                  }
                />

                <input
                  type="text"
                  required
                  placeholder="Organization Name"
                  className="w-full border-gray-300 border-2  p-3 rounded-lg"
                  onChange={(e) =>
                    setEnquiry({ ...enquiry, organization: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 text-center">
            <button className="bg-blue-500 hover:bg-blue-600 transform duration-200 text-white text-lg px-10 py-3 rounded-xl shadow-lg">
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
      {popUp && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 
                  transition-all duration-500">

    <div className="bg-white p-9 rounded-2xl shadow-2xl text-center max-w-xl
                    animate-[fadeIn_0.3s_ease]">

      <h2 className="text-3xl font-semibold text-blue-500 mb-4">
        Thank You!
      </h2>

      <p className="text-gray-700 mb-6 ">
        Your enquiry has been submitted.<br />
        We will get back to you shortly through mail.
      </p>

    <div className="flex flex-row gap-2 justify-center items-center">

      <Link className="transform duration-20 rounded-lg px-6 py-2 transition-all border border-black" to="/">Back to home</Link>
      <button
        onClick={() => setPopUp(false)}
        className="bg-blue-500 hover:bg-blue-600 transform duration-200 text-white rounded-lg px-6 py-2 transition-all"
        >
        Close
      </button>
          </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Enquire;
