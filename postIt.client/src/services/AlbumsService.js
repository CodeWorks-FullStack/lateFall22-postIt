import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class AlbumsService {
  async getAll() {
    const res = await api.get('api/albums')
    logger.log('[albums getAll]', res.data)
    AppState.albums = res.data
  }
  async getAlbumById(albumId) {
    const res = await api.get('api/albums/' + albumId)
    logger.log('[get album by id]', res.data)
  }
}

export const albumsService = new AlbumsService()
