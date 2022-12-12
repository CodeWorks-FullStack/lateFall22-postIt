import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class AlbumsService {
  async getAll(page = 1) {
    // const albums = await dbContext.Albums.find({ archived: false }).populate('creator')
    // const albums = await dbContext.Albums.find().populate('creator').limit(10).skip(page * 10)
    const albums = await dbContext.Albums.find().populate('creator')
    return albums
  }
  async getOne(id) {
    const album = await dbContext.Albums.findById(id).populate('creator')
    if (!album) throw new BadRequest(`no album by id: ${id}`)
    return album

  }
  async create(body) {
    const album = await dbContext.Albums.create(body)
    await album.populate('creator')
    return album
  }

  async archive(albumId, userId) {
    const album = await this.getOne(albumId)
    if (album.creatorId != userId) throw new Forbidden('not your album to archive')

    // NOTE flip archived status.  we don't actually have to delete it just cause it's a delete route
    album.archived = !album.archived
    await album.save()

    // NOTE also maybe return the album again?
    return `archived ${album.title}`
  }

}

export const albumsService = new AlbumsService()
