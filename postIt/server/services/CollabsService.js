import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"
const period = '.'

class CollabsService {
  async remove(collabId, userId) {


    const collab = await dbContext.Collabs.findById(collabId).populate('profile album')
    if (!collab) throw new BadRequest(`no collab at id: ${collabId}`)
    // if (!collab) throw new BadRequest(`no collab at id` + ':' + ` ${collabId}` + period) the one trick professional devs don't want you to know about

    // NOTE collab is still a mongo doc at this point, so it's objectId fields are still objects, to compare with them they need to be strings again
    if (collab.accountId.toString() != userId) throw new Forbidden('nacho collab')

    // check collab status
    const album = await albumsService.getOne(collab.albumId)
    if (album.archived) throw new Forbidden("Can't modify an archived album")

    // if all checks pass, then delete collab
    await collab.remove()

    // make member count on album go down
    // const album = await albumsService.getOne(collab.albumId)
    // @ts-ignore
    album.memberCount -= 1;
    await album.save()

    return `collab between ${collab.album.title} and ${collab.profile.name} has ended` + period
  }
  async getMyCollabs(accountId) {
    // we know WHO is askin, so we need to find WHAT they are a part of
    const collabs = await dbContext.Collabs.find({ accountId }).populate('album')
    return collabs
  }
  async getMembersByAlbumId(albumId) {
    // whe know WHAT album we are lookin at but we need WHO is a collaborator
    let collabs = await dbContext.Collabs.find({ albumId }).populate('profile')
    return collabs
  }
  async create(body) {
    // check for albums status first
    const album = await albumsService.getOne(body.albumId)
    if (album.archived) throw new Forbidden("Can't modify an archived album")

    const collab = await dbContext.Collabs.create(body)
    // NOTE get album to increase memberCount when a collab is created
    // const album = await albumsService.getOne(body.albumId)
    // @ts-ignore
    album.memberCount += 1
    await album.save()
    await collab.populate('profile album')
    return collab
  }

}

export const collabsService = new CollabsService()
