import AddSpotForm from '../components/AddSpotForm';
import path from 'path';

export default function Add() {
  const handleSubmit = async (spotData) => {
    try {
      const filePath = path.join(process.cwd(), 'data/spots.json');
      const jsonData = await fs.readFile(filePath, 'utf8');
      const spots = JSON.parse(jsonData);

      // Add a new ID (simplest approach - in a real app, use a UUID or database ID)
      const newId = crypto.randomUUID();
      spotData.id = newId;
      spots.push(spotData);

      await fs.writeFile(filePath, JSON.stringify(spots, null, 2), 'utf8'); // Write back to file

      // Redirect or show success message
      console.log("Spot added!");
    } catch (error) {
      console.error("Error adding spot:", error);
    }
  };

  return <AddSpotForm onSubmit={handleSubmit} />;
}