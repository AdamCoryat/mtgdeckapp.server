import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'

class DbContext {
  Cards = mongoose.model('Card', CardSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
