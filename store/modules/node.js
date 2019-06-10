export default {
  namespaced: true,
  state: {
    nodeStatus: {
      curSelect: "",
      selectByClick: false,
      curEdit: "",
      curNodeInfo: {}
    }
  },

  getters: {
    getNodeStatus: state => state.nodeStatus
  },

  actions: {
    setSelect({ state, commit }, param) {
      if (state.nodeStatus.curSelect === param.curSelect) {
        delete param.curNodeInfo;
      }
      commit("setSelect", { ...state.nodeStatus, ...param });
    },

    setEdit({ state, commit }, param) {
      commit("setEdit", { ...state.nodeStatus, ...param });
    },

    clearAll({ state, commit }, param) {
      commit("clearAll", { ...state.nodeStatus, ...param });
    },

    getNodeInfo({ state, commit }, param) {
      commit("getNodeInfo", {
        ...state.nodeStatus,
        ...{
          curNodeInfo: {
            ...param.node,
            onLeft: param.onLeft,
            parent: param.parent
          }
        }
      });
    }
  },

  mutations: {
    setSelect(state, data) {
      state.nodeStatus = data;
    },

    setEdit(state, data) {
      state.nodeStatus = data;
    },

    clearAll(state, data) {
      state.nodeStatus = data;
    },

    getNodeInfo(state, data) {
      state.nodeStatus = data;
    }
  }
};
