import { ROOT_NODE_ID } from "../../statics/refer";
export default {
  namespaced: true,
  state: {
    mindmap: {
      id: ROOT_NODE_ID,
      text: "主題",
      showChildren: true,
      children: [
        {
          id: "Sub1",
          text: "分支1",
          showChildren: true,
          children: []
        },
        {
          id: "Sub2",
          text: "分支2",
          showChildren: true,
          children: []
        },
        {
          id: "Sub3",
          text: "分支3",
          showChildren: true,
          children: []
        }
      ]
    }
  },
  getters: {
    getMindmap: state => state.mindmap
  },
  actions: {
    useMindmap({ dispatch, commit, getters, rootGetters }) {}
  }
};
