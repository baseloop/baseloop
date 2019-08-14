import express from 'express'

const sampleNames = [
  'Luke',
  'Oliver',
  'Jake',
  'Noah',
  'James',
  'Jack',
  'Connor',
  'Liam',
  'John',
  'Harry',
  'Callum',
  'Mason',
  'Robert',
  'Jacob',
  'Jacob',
  'Jacob',
  'Michael',
  'Charlie',
  'Kyle',
  'William',
  'William',
  'Thomas',
  'Joe',
  'Ethan',
  'David',
  'George',
  'Reece',
  'Michael',
  'Richard',
  'Oscar',
  'Rhys',
  'Alexander',
  'Joseph',
  'James',
  'Charlie',
  'James',
  'Charles',
  'William',
  'Damian',
  'Daniel',
  'Thomas'
]

export const searchRoute = (req: express.Request, res: express.Response) => {
  const results = sampleNames
    .filter(n => n.toLowerCase().includes(req.query.keyword.toLowerCase()))
    .map(name => ({
      name,
      age: (Math.random() * 100).toFixed(0)
    }))
    .slice(0, 10)

  res.send(results)
  res.end()
}
