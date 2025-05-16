// pages/api/documents/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs-extra';
import path from 'path';
import { prisma } from '../../../lib/prisma';

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPLOAD_DIR    = path.join(process.cwd(), 'public', 'uploads');
const THUMB_DIR     = path.join(process.cwd(), 'public', 'thumbnails');

async function ensureDirs() {
  await fs.ensureDir(UPLOAD_DIR);
  await fs.ensureDir(THUMB_DIR);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await ensureDirs();

  if (req.method === 'GET') {
    try {
      const docs = await prisma.document.findMany({ orderBy: { date: 'desc' } });
      return res.status(200).json(docs);
    } catch (err) {
      console.error('GET error:', err);
      return res.status(500).json({ error: 'Server error (GET)' });
    }
  }

if (req.method === 'POST') {
  let fields: any, files: any;
  try {
    ({ fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      new IncomingForm({
        uploadDir: UPLOAD_DIR,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024,
      }).parse(req, (err, flds, fls) => err ? reject(err) : resolve({ fields: flds, files: fls }));
    }));
  } catch (err) {
    console.error('Parse error:', err);
    return res.status(500).json({ error: 'Upload parsing error' });
  }

  try {
    // 📄 Plik PDF
    const fEntry = files.file as FormidableFile | FormidableFile[];
    const f = Array.isArray(fEntry) ? fEntry[0] : fEntry;
    if (!f?.filepath) return res.status(400).json({ error: 'No PDF uploaded' });
    const pdfName = path.basename(f.filepath);
    const fileUrl = `/uploads/${pdfName}`;

    // 🖼️ Miniatura — przenieś z uploads/ do thumbnails/
    const tEntry = files.thumbnail as FormidableFile | FormidableFile[];
    const t = Array.isArray(tEntry) ? tEntry[0] : tEntry;
    if (!t?.filepath) return res.status(400).json({ error: 'No thumbnail uploaded' });

    const thumbExt = path.extname(t.originalFilename || '.png');
    const thumbName = `${path.basename(t.newFilename, thumbExt)}${thumbExt}`;
    const newThumbPath = path.join(THUMB_DIR, thumbName);

    await fs.move(t.filepath, newThumbPath, { overwrite: true });

    const thumbnailUrl = `/thumbnails/${thumbName}`;

    // 📝 Zapis do bazy
    const doc = await prisma.document.create({
      data: {
        title:    String(fields.title || pdfName),
        author:   String(fields.author || ''),
        date:     fields.date ? new Date(String(fields.date)) : new Date(),
        language: String(fields.language || ''),
        tags:     fields.tags ? JSON.parse(String(fields.tags)) : [],
        keywords: fields.keywords ? JSON.parse(String(fields.keywords)) : [],
        content:  String(fields.content || ''),
        fileUrl,
        thumbnailUrl,
      },
    });

    return res.status(201).json(doc);
  } catch (err) {
    console.error('POST error:', err);
    return res.status(500).json({ error: 'Server error (POST)' });
  }
}

  res.setHeader('Allow', ['GET','POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
