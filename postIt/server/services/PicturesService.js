import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"


class PicturesService {
  async getAll(query) {
    //..........................................find({albumId: '*id*'})
    const pictures = await dbContext.Pictures.find(query).populate('creator')
    return pictures
  }
  async create(body) {
    // NOTE check to keep pictures from being posted to archived albums
    const album = await albumsService.getOne(body.albumId)
    if (album.archived) throw new Forbidden("Can't modify an archived album")

    const picture = await dbContext.Pictures.create(body)
    // NOTE important to await the populate
    await picture.populate('creator')
    return picture
  }

}

export const picturesService = new PicturesService()
