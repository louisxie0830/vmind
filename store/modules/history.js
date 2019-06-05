export default {
  namespaced: true,
  state: {
    history: {
      undo: [],
      redo: [],
      last_snapshot: null
    }
  },
  getters: {
    getHistory: state => state.history
  }
};
