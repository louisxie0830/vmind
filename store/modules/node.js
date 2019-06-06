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
      commit("updateNodeStatus", { ...state.nodeStatus, ...param });
    },

    setEdit({ state, commit }, param) {
      commit("updateNodeStatus", { ...state.nodeStatus, ...param });
    },

    clearAll({ state, commit }, param) {
      commit("updateNodeStatus", { ...state.nodeStatus, ...param });
    },

    getNodeInfo({ state, commit }, param) {
      commit("updateNodeStatus", {
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
    updateNodeStatus(state, data) {
      console.log("data: ", data);

      state.nodeStatus = data;
    }
  }
};
