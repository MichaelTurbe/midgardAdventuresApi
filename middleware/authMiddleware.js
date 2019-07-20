const authMiddleware = (req, res, next) => {
  const apiKey = process.env.apiKey
  if (req.headers.authorization) {
    let sentApiKey = req.headers.authorization.split(' ')[1]
    if(sentApiKey === apiKey) {
      next()
    } else {
      res.status(401).end()
    }
  } else {
    res.status(401).end()
  }
}
module.exports = authMiddleware