import mongoose from 'mongoose'
const Schema = mongoose.Schema

const namesSchema = new Schema(
{
  names: { type: String}
})

const colorsSchema = new Schema(
  {
    colors: { type: String, required: true }
  })

const colorIdSchema = new Schema(
  {
    colorIdentity: { type: String, required: true}
  })

const Card = new Schema(
  {
    name: { type: String, required: true },
    names: [ namesSchema ],
    manaCost: { type: String, required: true },
    colors: [ colorsSchema ],
    colorIdentity: [ colorIdSchema ],
    type: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Card.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Value
