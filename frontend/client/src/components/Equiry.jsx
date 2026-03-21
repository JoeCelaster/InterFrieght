import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from './Home';

const Enquire = () => {
  const [country, setCountry] = useState([]);
  const [ports, setPorts] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [L, setL] = useState("");
  const [B, setB] = useState("");
  const [H, setH] = useState("");
  const [dropped, setDropped] = useState(false);

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

  const handleDropDown = () => {
    setDropped(!dropped);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const updatedEnquiry = {
      ...enquiry,
      dimensions: `${L} × ${B} × ${H}`
    };
    console.log('Sending enquiry:', updatedEnquiry);
    setEnquiry(updatedEnquiry);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendmail`, updatedEnquiry);
    console.log('Response:', response.data);
    setPopUp(true);
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    // You might want to show an error message to the user here
  } finally {
    setIsLoading(false);
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
    <>
      {/* Navigation Bar */}
      <nav className="hidden sm:block fixed top-0 left-0 w-full z-20 shadow-md transition-all duration-500 bg-blue-500 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-start font-sans font-light tracking-wide">
          <Link to="/" className="text-xl text-white hover:text-gray-200 transition-colors">
            <h2>Inter Freight Forwarders</h2>
          </Link>
          <ul className="list-none flex gap-8 text-white font-medium ml-auto">
            <Link to='/' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
            <a href="#footer" onClick={e => { e.preventDefault(); document.getElementById('footer').scrollIntoView({ behavior: 'smooth' }); }} className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Contact us</a>
            <Link to='/login' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Login</Link>
            <Link to='/adminlogin' className="relative inline-block cursor-pointer after:content-[''] after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full">Admin</Link>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`sm:hidden fixed top-0 left-0 w-full shadow-md transition-all duration-500 z-20 ${dropped ? "flex flex-col gap-6" : "none"} bg-blue-500 p-4`}>
        <div className='flex flex-row items-center justify-between'>
          <Link to="/" className="font-sans font-thin text-xl text-white hover:text-gray-200 transition-colors">
            <h2>Inter Freight Forwarders</h2>
          </Link>
          <div>
            <button className='text-white text-4xl tracking-wide' onClick={handleDropDown}>≣</button>
          </div>
        </div> 
        
        <div>
          <ul className={`font-sans list-none flex flex-col justify-start transition-all duration-200 ease-in-out gap-3 text-white font-medium text-lg ml-auto ${dropped ? "opacity-100 max-h-96" : "gap-6 opacity-0 max-h-0 overflow-hidden" }`}>
                <Link to='/' className="hover:text-gray-200 cursor-pointer">Home</Link><hr className='border-none bg-neutral-400 opacity-45 h-[0.5px]'/>
                <a href="#footer" onClick={e => { e.preventDefault(); document.getElementById('footer').scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-gray-200 cursor-pointer">Contact us</a><hr className='border-none bg-neutral-400 opacity-45 h-[0.5px]'/>
                <Link to='/login' className="hover:text-gray-200 cursor-pointer">Login</Link><hr className='border-none bg-neutral-400 opacity-45 h-[0.5px]'/>
                <Link to='/signup' className="hover:text-gray-200 cursor-pointer">Signup</Link><hr className='border-none bg-neutral-400 opacity-45 h-[0.5px]'/>
                <Link to='/adminlogin' className="hover:text-gray-200 cursor-pointer">Admin</Link>
          </ul>
        </div>
      </nav>

      {/* Main Content with margin for fixed navbar */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200 px-4 font-sans py-10 pt-20"
      style={{
        backgroundImage: `
linear-gradient(rgba(128, 128, 128, 0.2) 1px, transparent 0.5px),
                linear-gradient(90deg, rgba(128, 128, 128, 0.2) 1px, transparent 0.4px)
                
        `,
        backgroundSize: '30px 30px'
      }}>
      <div className="backdrop-blur-sm bg-white/40 bg-opacity-70 rounded-3xl p-8 shadow-2xl mb-8">
      <h1 className="text-4xl text-center text-gray-800">
        Shipment Enquiry
      </h1>
      <h2 className='text-[10.5px] text-gray-600 font-normal text-center tracking-wider mb-0'>- Fast response from our logistics team.</h2> 
      </div>

      <div className="w-full max-w-6xl border-2 border-gray-200 bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-5 sm:p-10"> 

        {/* 2 Column layout */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT COLUMN */}
            <div className="space-y-8">

              {/* Origin Details */}
              <div className="bg-white/70 backdrop-blur-sm border-gray-200 border-2 p-6 rounded-xl space-y-4 shadow-lg">
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
              <div className="bg-white/70 backdrop-blur-sm border-gray-200 border-2 p-6 rounded-xl space-y-4 shadow-lg">
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
              <div className="bg-white/70 backdrop-blur-sm border-gray-200 border-2 p-6 rounded-xl space-y-4 shadow-lg">
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
              <div className="bg-white/70 backdrop-blur-sm border-gray-200 border-2 p-6 rounded-xl space-y-4 shadow-lg">
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
            <button 
              type="submit"
              disabled={isLoading}
              className={`bg-blue-500 hover:bg-blue-600 transform duration-200 text-white text-lg px-10 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 mx-auto min-w-[180px] ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Submit Enquiry'
              )}
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
    </>
  );
};

export default Enquire;
