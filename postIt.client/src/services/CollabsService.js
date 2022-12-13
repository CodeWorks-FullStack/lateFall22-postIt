import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class CollabsService {
  async getCollabsByAlbumId(albumId) {
    const res = await api.get('api/albums/' + albumId + '/collaborators')
    logger.log('[get collabs by album id]', res.data)
    AppState.collabs = res.data
  }

  async getMyCollabAlbums() {
    try {
      const res = await api.get('account/collaborators')
      logger.log('[get collab albums]', res.data)
      AppState.myCollabs = res.data
    } catch (error) {
      logger.error(error)
      Pop.error(error.message)
    }
  }
}

export const collabsService = new CollabsService()