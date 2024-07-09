import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileImporter from '../Components/Import';

const Transactions = () => {
  const [slide, setSlide] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [groceryStores, setGroceryStore] = useState([]);
  const [selectedGroceryStores, setSelectedGroceryStores] = useState([]);
  const [gasStations, setGasStations] = useState([]);
  const [selectedGasStations, setSelectedGasStations] = useState([]);
  const [phoneService, setPhoneService] = useState('');
  const [wifiService, setWifiService] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [clientID, setClientID] = useState();
  useEffect(() => {
    axios.get('http://localhost:3001/grocery-stores')
      .then(response => {
        console.log('Returned data:', response.data);
        const filteredStores = response.data.filter(store => store.store_name && store.store_logo);
        console.log("Testing filtered stores:", filteredStores);
        setGroceryStore(filteredStores);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    axios.get('http://localhost:3001/gas')
      .then(response => {
        console.log('Returned data:', response.data);
        const filteredStores = response.data.filter(store => store.store_name && store.store_logo);
        console.log("Testing filtered stores:", filteredStores);
        setGasStations(filteredStores);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNext = () => {
    setSlide(slide + 1);
  };

  const handlePrevious = () => {
    setSlide(slide - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCategoryData({ firstName, lastName, email, selectedGroceryStores, selectedGasStations, phoneService, wifiService });
    if (slide === 1) {
      axios.post('http://localhost:3001/clients', { first_name:firstName, last_name:lastName, email })
          .then(response => {
              
             setClientID(response.data.id);
          })
          .catch(error => {
              console.error('There was an error posting the data:', error);
          });
  }
  
    setSlide(slide + 1)
    
    // Perform API calls or other logic based on collected data
  };

  const handleStoreToggle = (storeName, category) => {
    if (category === 'grocery') {
      setSelectedGroceryStores(prevSelected => {
        if (prevSelected.includes(storeName)) {
          return prevSelected.filter(store => store !== storeName);
        } else {
          return [...prevSelected, storeName];
        }
      });
    } else if (category === 'gas') {
      setSelectedGasStations(prevSelected => {
        if (prevSelected.includes(storeName)) {
          return prevSelected.filter(store => store !== storeName);
        } else {
          return [...prevSelected, storeName];
        }
      });
    }
  };

  return (
    <div className='card drop-shadow-xl p-5'>
      {slide === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <h2 className="text-2xl font-bold">Client Info</h2>
          <span class="label-text-alt">Enter Client Information on this page in order to correctly track client specific reports</span>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name:</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name:</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </form>
      )}

      {slide === 2 && (
        <div>
          <h2 className="text-2xl font-bold">Groceries Category</h2>
          <span class="label-text-alt ">with the hopes of making categorization sorting both more convienient and more effective please select the appropriate places in which a client is most typically going to purchase their groceries</span>
          <div className="grid grid-cols-5 gap-2 justify-items-center mt-5">
            {groceryStores.map((store) => (
              <div
                className={`card bg-base-100 w-60 shadow-xl flex flex-col justify-between ${
                  selectedGroceryStores.includes(store.store_name) ? 'border-2 border-primary' : ''
                }`}
                key={store.id}
                onClick={() => handleStoreToggle(store.store_name, 'grocery')}
              >
                <figure className="h-full">
                  <img
                    src={store.store_logo}
                    alt={store.store_name}
                    className="rounded-xl w-32 p-2 object-fit"
                  />
                </figure>
                <div className="card-body items-center text-center pt-2 pb-4">
                  <h3 className="card-title text-black">{store.store_name}</h3>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary mt-4" onClick={handlePrevious}>
            Previous
          </button>
          <button type="button" className="btn btn-primary mt-4" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {slide === 3 && (
        <div>
          <h2 className="text-2xl font-bold">Gas</h2>
          <span class="label-text-alt ">with the hopes of making categorization sorting both more convienient and more effective please select the appropriate places in which a client is most typically going to purchase gasoline to fill up their vehicle</span>

          <div className="grid grid-cols-5 gap-2 justify-items-center mt-5">
            {gasStations.map((store) => (
              <div
                className={`card bg-base-100 w-60 shadow-xl flex flex-col justify-between ${
                  selectedGasStations.includes(store.store_name) ? 'border-2 border-primary' : ''
                }`}
                key={store.id}
                onClick={() => handleStoreToggle(store.store_name, 'gas')}
              >
                <figure className="h-full">
                  <img
                    src={store.store_logo}
                    alt={store.store_name}
                    className="rounded-xl w-32 p-2 object-fit"
                  />
                </figure>
                <div className="card-body items-center text-center pt-2 pb-4">
                  <h3 className="card-title text-black">{store.store_name}</h3>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary mt-4" onClick={handlePrevious}>
            Previous
          </button>
          <button type="button" className="btn btn-primary mt-4" onClick={handleNext}>
            Next
          </button>
        </div>
      )}

      {slide === 4 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Slide 4: Phone Service</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Which phone service do you currently use?</span>
            </label>
            <select
              name="phoneService"
              value={phoneService}
              onChange={(e) => setPhoneService(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="">Select a phone service</option>
              <option value="Verizon Wireless">Verizon Wireless</option>
              <option value="AT&T">AT&T</option>
              <option value="T-Mobile">T-Mobile</option>
              <option value="US Cellular">US Cellular</option>
              <option value="Cricket Wireless">Cricket Wireless</option>
              <option value="Boost Mobile">Boost Mobile</option>
              <option value="Straight Talk">Straight Talk</option>
              <option value="Metro by T-Mobile">Metro by T-Mobile</option>
              <option value="Google Fi">Google Fi</option>
            </select>
          </div>
          <button type="button" className="btn btn-secondary mt-4" onClick={handlePrevious}>
            Previous
          </button>
          <button type="button" className="btn btn-primary mt-4" onClick={handleNext}>
            Next
          </button>
        </form>
      )}

      {slide === 5 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Slide 5: WiFi Service</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Which WiFi service do you currently use?</span>
            </label>
            <select
              name="wifiService"
              value={wifiService}
              onChange={(e) => setWifiService(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="">Select a WiFi service</option>
              <option value="Xfinity">Xfinity</option>
              <option value="AT&T Internet">AT&T Internet</option>
              <option value="Verizon Fios">Verizon Fios</option>
              <option value="Spectrum">Spectrum</option>
              <option value="Cox Communications">Cox Communications</option>
              <option value="Google Fiber">Google Fiber</option>
              <option value="Frontier Communications">Frontier Communications</option>
              <option value="CenturyLink">CenturyLink</option>
              <option value="Mediacom">Mediacom</option>
              <option value="Windstream">Windstream</option>
            </select>
          </div>
          <button type="button" className="btn btn-secondary mt-4" onClick={handlePrevious}>
            Previous
          </button>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      )}
        {slide === 6 && (
          <FileImporter formData = {categoryData} clientId= {clientID} />
      )}
    </div>
  );
};

export default Transactions;
