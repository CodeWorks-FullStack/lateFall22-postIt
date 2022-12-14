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

  async createCollab(body) {
    const res = await api.post('api/collaborators', body)
    logger.log('[create collab]', res.data)
    // NOTE store collab in collection that renders on the album page
    AppState.collabs.push(res.data)
    // NOTE store collab in collection that renders on home page
    AppState.myCollabs.push(res.data)
    // NOTE update one property on the active album
    AppState.activeAlbum.memberCount++
  }

  async removeCollab(collabId) {
    const res = await api.delete('api/collaborators/' + collabId)
    logger.log(res.data)
    AppState.collabs = AppState.collabs.filter(c => c.id !== collabId)
    AppState.myCollabs = AppState.myCollabs.filter(c => c.id !== collabId)

    AppState.activeAlbum.memberCount--
  }
}

export const collabsService = new CollabsService()