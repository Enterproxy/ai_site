import { prisma } from '../lib/prisma'

async function main() {
  await prisma.document.createMany({
    data: [
      {
        title: 'Prezentacja Ewolucja Różnicowa',
        author: 'Bartek R',
        date: new Date('2023-05-01'),
        language: 'polski',
        tags: ['ewolucja różnicowa', 'algorytm genetyczny'],
        keywords: ['ai', 'prezentacja'],
        content: '',
        fileUrl: '/uploads/ts426kk7pm8dwg68gnlhc0klm.pdf',
        thumbnailUrl: '/thumbnails/cjfgyy30hcv580fczfvq84xl4.png',
      },
      {
        title: 'Broszura Fiat Tipo',
        author: 'Fiat',
        date: new Date('2022-11-15'),
        language: 'angielski',
        tags: ['fiat', 'samochód'],
        keywords: ['broszura'],
        content: '',
        fileUrl: '/uploads/drgu12wy7lwclya0ano8c5tgly.pdf',
        thumbnailUrl: '/thumbnails/kenidayr2tjik17ivpcojp63x.png',
      },
      {
        title: 'Broszura Hyundai i30',
        author: 'Hyundai',
        date: new Date('2024-02-10'),
        language: 'angielski',
        tags: ['samochód', 'hyundai', 'i30'],
        keywords: ['broszura'],
        content: '',
        fileUrl: '/uploads/o0ffhapl3f06x2h5b4k0hg51b.pdf',
        thumbnailUrl: '/thumbnails/fe5n1mb17k8t31r3apiw1vw0t.png',
      },
	  {
        title: 'Dokument urzędowy',
        author: 'Urząd skarbowy',
        date: new Date('2024-02-10'),
        language: 'polski',
        tags: ['dokument'],
        keywords: ['podatki', 'opłaty'],
        content: '',
        fileUrl: '/uploads/qongt15vnxl8con0qhrkbqlob.pdf',
        thumbnailUrl: '/thumbnails/cukuk497ajdntty91thqxkdn5.png',
      },
      {
        title: 'Instrukcja Radio Blaupunkt',
        author: 'Balupunkt',
        date: new Date('2024-02-10'),
        language: 'wielojęzyczny',
        tags: ['instrukcja', 'blaupunkt'],
        keywords: ['radio'],
        content: '',
        fileUrl: '/uploads/y1bjhspbabmv85yxsgzwa8819.pdf',
        thumbnailUrl: '/thumbnails/oay2t86j2hw15eiff5xeqhkos.png',
      }
    ]
  })
}

main()
  .then(() => console.log('Seed complete!'))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())