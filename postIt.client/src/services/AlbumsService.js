import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class AlbumsService {
  async getAll() {
    const res = await api.get('api/albums')
    logger.log('[albums getAll]', res.data)
  }

}

export const albumsService = new AlbumsService()
