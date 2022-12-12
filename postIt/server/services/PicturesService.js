import { dbContext } from "../db/DbContext.js"


class PicturesService {
  async getAll(query) {
    //..........................................find({albumId: '*id*'})
    const pictures = await dbContext.Pictures.find(query).populate('creator')
    return pictures
  }
  async create(body) {
    const picture = await dbContext.Pictures.create(body)
    // NOTE important to await the populate
    await picture.populate('creator')
    return picture
  }

}

export const picturesService = new PicturesService()
