import sql from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, address, description, rating } = req.body;

  try {
    const result = await sql`
      INSERT INTO sandwich_spots (name, address, description, rating)
      VALUES (${name}, ${address}, ${description}, ${rating})
      RETURNING id, name, address, description, rating
    `;
    
    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error adding sandwich spot' });
  }
} 