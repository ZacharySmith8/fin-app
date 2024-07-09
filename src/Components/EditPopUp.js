import React, { useState } from 'react';
import formatDate from '../helpers/formatDate';
function EditPopUp({ rowData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    post_date: rowData.post_date,
    description: rowData.description,
    amount: rowData.amount,
    balance: rowData.balance,
    details: rowData.details,
    category: rowData.category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
        <div className="">
          <button onClick={onCancel} className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900">
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            <div className="text-center p-5 flex-auto justify-center">
              <label className="input input-bordered flex items-center gap-2">
                Post Date
                <input type="text" name="post_date" value={formatDate(formData.post_date)} className="grow" onChange={handleChange} />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Description
                <input type="text" name="description" value={formData.description.replace(/\s+/g, ' ').trim()} className="grow" onChange={handleChange} />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Category
                <input type="text" name="category" value={formData.category} className="grow" onChange={handleChange} />
              </label>
            </div>
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              <button type="button" onClick={onCancel} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Cancel</button>
              <button type="submit" className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPopUp;

