import { useState } from 'react';

const AddSpotForm = ({ onSubmit }) => {
  const [spotData, setSpotData] = useState({
    name: '',
    address: '',
    description: '',
    rating: '',
    image: null,
    visitedDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setSpotData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(spotData);
    setSpotData({
        name: '',
        address: '',
        description: '',
        rating: '',
        image: null,
        visitedDate: '',
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={spotData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={spotData.address}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={spotData.description}
        onChange={handleChange}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        name="rating"
        value={spotData.rating}
        onChange={handleChange}
        min="1"
        max="5"
      />

      <label htmlFor="image">Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        onChange={handleChange}
      />

      <label htmlFor="visitedDate">Visited Date:</label>
      <input
        type="date"
        id="visitedDate"
        name="visitedDate"
        value={spotData.visitedDate}
        onChange={handleChange}
      />

      <button type="submit">Add Spot</button>
    </form>
  );
};

export default AddSpotForm;