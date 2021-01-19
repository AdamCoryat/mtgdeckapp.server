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

const subtypesSchema = new Schema({
  subtypes: { type: String, required: true }
})

const printingsSchema = new Schema({
  pritings: { type: String }
})

const legalitiesSchema = new Schema({
  format: { type: String },
  legality: { type: String}
})

const Card = new Schema(
  {
    name: { type: String, required: true },
    names: [ namesSchema ],
    secondaryName: { type: String },
    manaCost: { type: String, required: true },
    colors: [ colorsSchema ],
    colorIdentity: [ colorIdSchema ],
    types: { type: String, required: true },
    subtypes: [ subtypesSchema ],
    rarity: { type: String, required: true },
    set: { type: String },
    setName: { type: String },
    text: { type: String },
    artist: { type: String },
    number: { type: Number },
    power: { type: Number },
    toughness: { type: Number },
    layout: { type: String },
    imageUrl: { type: String },
    printings: { printingsSchema },
    legalities: { legalitiesSchema },
    id: { type: String },
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
