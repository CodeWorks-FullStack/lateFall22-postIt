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
    AppState.activeAlbum = res.data
  }

  async createAlbum(body) {
    const slash = '/'
    const url = `api${slash}albums`
    const res = await api.post(url, body)
    logger.log('[create album]', res.data)
    // NOTE adds the created album to the end of the collection in the AppState
    // NOTE use unshift instead of push if you want it at the beginning of the array
    AppState.albums.push(res.data)
    return res.data
  }
}

export const albumsService = new AlbumsService()
