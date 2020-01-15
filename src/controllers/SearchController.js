const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(req, res) {
    // Fetch all users in the 10 km radius
    // Filter per tecnologies
    const { latitude, longitude, techs } = req.query

    const techsArray = parseStringAsArray(techs)

    const devs = await Dev.find({
      techs: {
        // Matches any of the values specifie in an array.
        $in: techsArray,
       },
       location: {
         $near: {
           $geometry: {
             type: 'Point',
             coordinates: [longitude, latitude]
           },
           // 10km
           $maxDistance: 10000,
         }
       }
    })

    return res.json({ devs })
  }
}