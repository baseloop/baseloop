import express from 'express'

const staticOptions = {
  index: false,
  setHeaders: (res: express.Response) => {
    res.setHeader('Cache-Control', 'public, max-age=31557600')
  }
}

export const staticFileRoute = express.static('dist/client', staticOptions)
