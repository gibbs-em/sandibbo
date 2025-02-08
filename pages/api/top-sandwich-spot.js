import sql from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const topSpot = await sql`
      SELECT id, name, address, description, rating
      FROM sandwich_spots
      ORDER BY rating DESC
      LIMIT 1
    `;
    
    if (topSpot.length === 0) {
      return res.status(404).json({ message: 'No sandwich spots found' });
    }
    
    res.status(200).json(topSpot[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error fetching top sandwich spot' });
  }
} 