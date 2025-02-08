import sql from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const spots = await sql`
      SELECT id, name, address, description, rating
      FROM sandwich_spots
      ORDER BY name ASC
    `;
    
    res.status(200).json(spots);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error fetching sandwich spots' });
  }
} 