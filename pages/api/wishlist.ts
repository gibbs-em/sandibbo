import type { NextApiRequest, NextApiResponse } from 'next';
import sql from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const items = await sql`
        SELECT id, name, address, suggester
        FROM wishlist
        ORDER BY id DESC
      `;
      return res.status(200).json(items);
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Error fetching wishlist' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, address, suggester } = req.body;
      const result = await sql`
        INSERT INTO wishlist (name, address, suggester)
        VALUES (${name}, ${address}, ${suggester})
        RETURNING id, name, address, suggester
      `;
      return res.status(201).json(result[0]);
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Error adding to wishlist' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 