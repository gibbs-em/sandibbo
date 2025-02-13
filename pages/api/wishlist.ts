import type { NextApiRequest, NextApiResponse } from 'next';
import sql from '../../lib/db';

type WishlistItem = {
  id: number;
  name: string;
  address: string;
  suggester: string;
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WishlistItem | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, address, suggester } = req.body;

    const result = await sql`
      INSERT INTO wishlist (name, address, suggester)
      VALUES (${name}, ${address}, ${suggester})
      RETURNING *
    `;
    
    res.status(201).json(result[0] as WishlistItem);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
} 