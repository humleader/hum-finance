import im from 'immutable'
import axios from 'common/axios'
import moment from 'moment'

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 20,
    createTime: [moment(), moment()],
    pageIndex: 1
  },
  historyParams: undefined,
  editData: {}
})

export default {
  state: initialState,
  reducers: {
    listSource: (state, payload) => {
      return state.set('listSource', im.fromJS(payload))
    },
    setParams: (state, payload) => {
      return state.set('params', im.fromJS(payload))
    },
    setHistoryParams: (state, payload) => {
      return state.set('historyParams', im.fromJS(payload))
    },
    setEditData: (state, payload) => {
      return state.set('editData', im.fromJS(payload))
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/salary/list', { params })
      this.listSource(data)
      return data
    },
    check(data, rootState) {
      return axios.post('/salary/check', data)
    },
    delete(data, rootState) {
      return axios.post('/salary/delete', data)
    },
    send(data, rootState) {
      return axios.post('/salary/send', data)
    },
    sendall(data, rootState) {
      return axios.post('/salary/sendall', data)
    },
    async queryById(id, rootState) {
      const data = await axios.get('/salary/getone', { params: { id } })
      this.setEditData(data)
    },
    remove(id, rootState) {
      return axios.post(`/user/remove/${id}`)
    }
  }
}
