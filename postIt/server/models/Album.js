import { Schema } from "mongoose";


export const AlbumSchema = new Schema({
  title: { type: String, required: true },
  coverImg: { type: String, required: true, maxLength: 255 },
  category: { type: String, default: 'misc', enum: ['animals', 'games', 'crocs', 'pugs', 'misc'], lowercase: true },
  archived: { type: Boolean, required: true, default: false },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  memberCount: { type: Number, required: true, default: 0 }
}, { timestamps: true, toJSON: { virtuals: true } })


AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
