import { Schema } from "mongoose";


export const CollaboratorSchema = new Schema({
  albumId: { type: Schema.Types.ObjectId, required: true, ref: 'Album' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })


CollaboratorSchema.virtual('album', {
  localField: 'albumId',
  ref: 'Album',
  foreignField: '_id',
  justOne: true
})

CollaboratorSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
