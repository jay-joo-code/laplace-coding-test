import generator from 'generate-password'
import { model, Schema } from 'mongoose'
import { IPlanDoc } from './../types/plan'
import Major from './Major'
import Requirement from './Requirement'
import User from './User'

const planSchema = new Schema({
  majorId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  semesters: {
    type: [[{
      type: Schema.Types.ObjectId,
      ref: Requirement,
    }]],
    default: [],
  },
  semesterSlugs: {
    // on init, 0th elt is slug for transfer credits
    // should be null on init
    // ex) [null, 'FA17', 'SP18', ... ]
    type: [{
      type: String,
    }],
    default: [],
  },
  shortId: {
    type: String,
    default: () => generator.generate({
      length: 8,
      numbers: true,
    }),
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
}
)

planSchema.virtual('major', {
  ref: Major,
  localField: 'majorId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

planSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

planSchema.plugin(require('mongoose-autopopulate'))

export default model<IPlanDoc>('Plan', planSchema)
