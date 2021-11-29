import request from '@/helpers/request'

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET).then(res => {
        res.data = res.data.sort((notebook1, notebook2) => { return notebook2.id - notebook1.id})
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateNotebook(notebookId, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', {title})
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },
  addNotebook({title = ''} = {title: ''}) {
    return request(URL.ADD, 'POST', {title})
  }
}
