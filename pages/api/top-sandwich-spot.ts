import type { NextApiRequest, NextApiResponse } from 'next';
import sql from '../../lib/db';

type SandwichSpot = {
  id: number;
  name: string;
  address: string;
  description?: string;
  rating: number;
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SandwichSpot | ErrorResponse>
) {
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
    
    const result = topSpot[0] as SandwichSpot;
    res.status(200).json(result);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error fetching top sandwich spot' });
  }
} 