export const handlePropagation = event => {
  event.stopPropagation();
};

export const deepCopy = data => JSON.parse(JSON.stringify(data));

export const findNode = (node, searchId) => {
  if (node.id === searchId) return node;
  return node.children
    .map(child => findNode(child, searchId))
    .find(item => item);
};

export const setShowChildrenTrue = node => {
  node.showChildren = true;
  node.children.forEach(setShowChildrenTrue);
};

export const downloadFile = (url, filename) => {
  const link = document.createElement("a");
  link.setAttribute("type", "hidden");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
