import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PicturesService {
  async getPicturesByAlbumId(albumId) {
    const res = await api.get('api/albums/' + `${albumId}/pictures`)
    logger.log('[get pictures by album id]', res.data)
    AppState.pictures = res.data
  }
}

export const picturesService = new PicturesService()
