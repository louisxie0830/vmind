import { ROOT_NODE_ID } from "../../statics/refer";
import {
  deepCopy,
  findNode,
  setShowChildrenTrue
} from "../../methods/assistFunction";

export default {
  namespaced: true,
  state: {
    mindMap: {
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
    getMindMap: state => state.mindMap
  },

  actions: {
    toggleChildren({ state, commit }, param) {
      const newMindMap = deepCopy(state.mindMap);
      const nodeFound = findNode(newMindMap, param.nodeId);
      if (nodeFound.children.length > 0 && nodeFound !== newMindMap) {
        Object.assign(nodeFound, param.node);
      }
      commit("updateMinMapData", newMindMap);
    },

    addChild({ state, commit }, param) {
      const newMindMap = deepCopy(state.mindMap);
      const nodeFound = findNode(newMindMap, param.nodeId);
      nodeFound.children.push(param.node);
      commit("updateMinMapData", newMindMap);
    },

    addSibling({ state, commit }, param) {
      const newMindMap = deepCopy(state.mindMap);
      if (param.parentId) {
        const nodeFound = findNode(newMindMap, param.parentId);
        const insertIndex =
          nodeFound.children.findIndex(({ id }) => id === param.nodeId) + 1;
        nodeFound.children.splice(insertIndex, 0, param.node);
      }
      commit("updateMinMapData", newMindMap);
    },

    moveNode({ state, commit }, param) {
      const newMindMap = deepCopy(state.mindMap);
      const parent = findNode(newMindMap, param.parentId);
      const nodeIndex = parent.children.findIndex(
        ({ id }) => id === param.nodeId
      );
      const nodeCopy = parent.children[nodeIndex];
      parent.children.splice(nodeIndex, 1);
      if (param.isSibling) {
        const target_index =
          parent.children.findIndex(({ id }) => id === param.targetId) + 1 ||
          parent.children.length + 1;
        parent.children.splice(target_index - 1, 0, nodeCopy);
      } else {
        const targetNode = findNode(newMindMap, param.targetId);
        targetNode.children.push(nodeCopy);
      }
      commit("updateMinMapData", newMindMap);
    },

    changeText({ state, commit }, param) {
      const newMindMap = deepCopy(state.mindMap);
      const nodeFound = findNode(newMindMap, param.nodeId);
      Object.assign(nodeFound, param.node);
      commit("updateMinMapData", newMindMap);
    },

    deleteNode({ state, commit }, param) {
      const newMindMap = deepCopy(state.mindMap);
      if (param.parentId) {
        const nodeFound = findNode(newMindMap, param.parentId);
        const deleteIndex = nodeFound.findIndex(
          ({ id }) => id === param.nodeId
        );
        nodeFound.splice(deleteIndex, 1);
      }
      commit("updateMinMapData", newMindMap);
    },

    expandAll({ state, commit }, param) {
      const newMindMap = deepCopy(state.mindMap);
      const nodeFound = findNode(newMindMap, param.nodeId);
      setShowChildrenTrue(nodeFound);
      commit("updateMinMapData", newMindMap);
    },

    setMindMap({ commit }, param) {
      commit("updateMinMapData", param);
    }
  },

  mutations: {
    updateMinMapData(state, data) {
      state.mindMap = { ...state.mindMap, ...data };
    }
  }
};
