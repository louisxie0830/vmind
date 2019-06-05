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
  }
};
