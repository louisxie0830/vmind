import { deepCopy } from "../../methods/assistFunction";
export default {
  namespaced: true,
  state: {
    history: {
      undo: [],
      redo: [],
      lastSnapshot: null
    }
  },

  getters: {
    getHistory: state => state.history
  },

  actions: {
    setHistory({ state, commit }, param) {
      const newHistory = deepCopy(state.history);
      if (newHistory.lastSnapshot) {
        if (
          newHistory.undo.length > 0 &&
          newHistory.undo[newHistory.undo.length - 1].mindMap === param.mindMap
        ) {
          newHistory.redo.unshift(newHistory.lastSnapshot);
          newHistory.undo.pop();
        } else if (
          newHistory.redo.length > 0 &&
          newHistory.redo[0].mindMap === param.mindMap
        ) {
          newHistory.undo.push(newHistory.lastSnapshot);
          newHistory.redo.shift();
        } else {
          newHistory.undo.push(newHistory.lastSnapshot);
          newHistory.redo = [];
        }
      }
      newHistory.lastSnapshot = param;
      commit("updateHistory", newHistory);
    },

    clearHistory({ commit }) {
      commit("updateHistory", {
        undo: [],
        redo: [],
        lastSnapshot: null
      });
    }
  },

  mutations: {
    updateHistory(state, data) {
      state.history = data;
    }
  }
};
