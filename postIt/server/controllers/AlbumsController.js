import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import { collabsService } from "../services/CollabsService.js";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";


export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/pictures', this.getPicturesInAlbum)
      .get('/:id/collaborators', this.getCollaborators)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.archive)
  }

  async getAll(req, res, next) {
    try {
      const albums = await albumsService.getAll(req.query.page)
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const album = await albumsService.getOne(req.params.id)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getPicturesInAlbum(req, res, next) {
    try {
      // NOTE uses the get all pictures but formats a query object for it to only find pictures with it's id
      const pictures = await picturesService.getAll({ albumId: req.params.id })
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async getCollaborators(req, res, next) {
    try {
      let collabs = await collabsService.getMembersByAlbumId(req.params.id)
      return res.send(collabs)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const album = await albumsService.create(req.body)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archive(req, res, next) {
    try {
      const message = await albumsService.archive(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
