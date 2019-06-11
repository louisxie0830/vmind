import Vue from "vue";
import Vuex, { Store } from "vuex";
Vue.use(Vuex);

import node from "./modules/node";
import mindMap from "./modules/mindMap";
import history from "./modules/history";
import { NEW_NODE_TEXT } from "../statics/refer";
import md5 from "md5";

const state = {
  global: {
    title: localStorage.getItem("title") || "Not named",
    themeIndex: +localStorage.getItem("themeIndex") || 0,
    themeList: [
      {
        main: "#eda938",
        light: "#f4cc87",
        dark: "#e79021",
        ex: "#ce7529",
        assist: "#1980da"
      },
      {
        main: "#ff4c26",
        light: "#ffcabc",
        dark: "#e83f1d",
        ex: "#c12a0f",
        assist: "#0e95ac"
      },
      {
        main: "#50b843",
        light: "#c3e5bd",
        dark: "#28ab17",
        ex: "#038b00",
        assist: "#790595"
      },
      {
        main: "#2d99d7",
        light: "#e2f5ff",
        dark: "#2786c3",
        ex: "#2375af",
        assist: "#ca6c27"
      },
      {
        main: "#b347d2",
        light: "#e4c0ef",
        dark: "#a623c9",
        ex: "#9621c3",
        assist: "#009000"
      },
      {
        main: "#555555",
        light: "#e9e9e9",
        dark: "#434343",
        ex: "#262626",
        assist: "#860314"
      }
    ]
  }
};

const actions = {
  toggleChildren({ dispatch }, param) {
    dispatch("mindMap/toggleChildren", {
      nodeId: param.nodeId,
      node: {
        showChildren: param.bool
      }
    });
  },

  addChild({ dispatch }, param) {
    const newNodeId = md5("" + Date.now() + Math.random());
    dispatch("mindMap/toggleChildren", {
      nodeId: param.nodeId,
      node: {
        showChildren: true
      }
    });
    dispatch("mindMap/addChild", {
      nodeId: param.nodeId,
      node: {
        id: newNodeId,
        text: NEW_NODE_TEXT,
        showChildren: true,
        children: []
      }
    });
    dispatch("node/setEdit", {
      curSelect: "",
      curEdit: newNodeId,
      curNodeInfo: {}
    });
  },

  addSibling({ dispatch }, param) {
    const newNodeId = md5("" + Date.now() + Math.random());
    dispatch("mindMap/addSibling", {
      nodeId: param.nodeId,
      parentId: param.parentId,
      node: {
        id: newNodeId,
        text: NEW_NODE_TEXT,
        showChildren: true,
        children: []
      }
    });
    dispatch("node/setEdit", {
      curSelect: "",
      curEdit: newNodeId,
      curNodeInfo: {}
    });
  },

  moveNode({ dispatch }, param) {
    dispatch("mindMap/moveNode", {
      nodeId: param.nodeId,
      targetId: param.targetId,
      parentId: param.parentId,
      isSibling: param.isSibling
    });

    dispatch("node/setSelect", {
      curSelect: param.nodeId,
      selectByClick: param.selectByClick || false,
      curEdit: "",
      curNodeInfo: {}
    });
  },

  editNode({ dispatch }, param) {
    dispatch("node/setEdit", {
      curSelect: "",
      curEdit: param.nodeId,
      curNodeInfo: {}
    });
  },

  changeText({ dispatch }, param) {
    dispatch("mindMap/changeText", {
      nodeId: param.nodeId,
      node: {
        text: param.text
      }
    });
  },

  selectNode({ dispatch }, param) {
    dispatch("node/setSelect", {
      curSelect: param.nodeId,
      selectByClick: param.selectByClick || false,
      curEdit: "",
      curNodeInfo: {}
    });
  },

  deleteNode({ dispatch }, param) {
    dispatch("mindMap/deleteNode", {
      nodeId: param.nodeId,
      parentId: param.parentId
    });

    dispatch("node/setSelect", {
      curSelect: param.nodeId,
      selectByClick: param.selectByClick || false,
      curEdit: "",
      curNodeInfo: {}
    });
  },

  clearNodeStatus({ dispatch }, param) {
    dispatch("node/clearAll", param);
  },

  setMindMap({ dispatch }, param) {
    if (param.isNewMap) {
      dispatch("history/clearHistory");
      dispatch("node/setSelect", {
        curSelect: param.mindMap.id,
        selectByClick: param.selectByClick || false,
        curEdit: "",
        curNodeInfo: {}
      });
    }
    dispatch("mindMap/setMindMap", param.mindMap);
  },

  expandAll({ dispatch }, param) {
    dispatch("mindMap/expandAll", {
      nodeId: param.nodeId
    });
    dispatch("node/setSelect", {
      curSelect: param.nodeId,
      selectByClick: param.selectByClick || false,
      curEdit: "",
      curNodeInfo: {}
    });
  },

  undoHistory({ dispatch }, param) {},

  redoHistory({ dispatch }, param) {}
};

const mutations = {};

const getters = {
  getGlobal: state => state.global
};

export default new Store({
  strict: true,
  state,
  mutations,
  getters,
  actions,
  modules: {
    node,
    mindMap,
    history
  }
});
