const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = require('./users')

//RELATIONSHIPS

//(One) User  -- (many) datingProfiles

                //(One) datingProfile -- (many) dateEvents

//(One) user         -----                (many) dateEvents 

//QUESTIONS
//import user schema correct? 
//Do I need to connect dateEvents to user as well?


const datingProfileSchema = Schema({
  name: String,
  nickname: String,
  howMet: String,
  age: Number,
  height: Number,
  location: String,
  personality: String,
  appearance: String,
  interestsHobbies: String,
  media: String,
  beliefs: String,
  work: String,
  family: String,
  friends: String,
  pets: String,
  foodPreferences: String,
  whatLookingFor: String,
  other: String,
  imageURL: { type: String, default: 'https://loremflickr.com/600/600/human' },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'},
  dates: [
    {type: Schema.Types.ObjectId, ref: 'DateEvent'}
  ]
})


const dateEventSchema = Schema ({
  date: { type: Date, default: Date.now},
  location: String,
  vibe: String,
  areWeCompatible: String,
  greenflags: String,
  redflags: String,
  reflections: String,
  amIStillInterested: Boolean,
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'DatingProfile'}
})

const DatingProfile = mongoose.model('DatingProfile', datingProfileSchema)
const DateEvent = mongoose.model('DateEvent', dateEventSchema)

module.exports = DatingProfile
module.exports = DateEvent