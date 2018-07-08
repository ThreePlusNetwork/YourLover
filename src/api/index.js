// 模拟api异步请求
function getCharacterList() {
  return new Promise((resolve, reject) => {
    const data = require('mock/character').default;
    resolve(data);
  });
}

function getChasingInfo() {
  return new Promise((resolve, reject) => {
    const data = require('mock/chasingInfo').default;
    resolve(data);
  });
}

export { getCharacterList, getChasingInfo };
