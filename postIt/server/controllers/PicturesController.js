import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";


export class PicturesController extends BaseController {
  constructor() {
    super('api/pictures')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }


  async getAll(req, res, next) {
    try {
      const pictures = await picturesService.getAll(req.query)
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const picture = await picturesService.create(req.body)
      return res.send(picture)
    } catch (error) {
      next(error)
    }
  }
}
