import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import fs from 'fs-extra'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    const doc = await prisma.document.findUnique({ where: { id: String(id) } })
    return doc ? res.status(200).json(doc) : res.status(404).json({ error: 'Not found' })
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body
      if (data.date) data.date = new Date(data.date)
      const updated = await prisma.document.update({ where: { id: String(id) }, data })
      return res.status(200).json(updated)
    } catch (e) {
      console.error('PUT /api/documents/[id] error', e)
      return res.status(500).json({ error: 'Update failed' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      // 1. Pobierz dokument z bazy
      const doc = await prisma.document.findUnique({ where: { id: String(id) } })
      if (!doc) return res.status(404).json({ error: 'Document not found' })

      // 2. Usuń pliki z dysku
      const filePath = path.join(process.cwd(), 'public', doc.fileUrl)
      const thumbPath = path.join(process.cwd(), 'public', doc.thumbnailUrl)

      await Promise.allSettled([
        fs.remove(filePath),
        fs.remove(thumbPath)
      ])

      // 3. Usuń dokument z bazy
      await prisma.document.delete({ where: { id: String(id) } })

      return res.status(204).end()
    } catch (e) {
      console.error('DELETE /api/documents/[id] error', e)
      return res.status(500).json({ error: 'Delete failed' })
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
