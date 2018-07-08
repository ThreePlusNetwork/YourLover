// 动作配置文件，此处修改即可

/*
    @params 动作类型  女神好感度升值/降值比
*/
const decimalMap = new Map([
  ['gift', 0.1],
  ['flower', -0.15],
  ['movie', 0.3],
  ['dinner', 0.35],
  ['travel', 0.5],
  ['bar', -0.2],
  ['onlineGame', -0.3]
]);
const textMap = new Map([
  ['gift', '小礼物'],
  ['flower', '红玫瑰'],
  ['movie', '请妹子看电影'],
  ['dinner', '烛光晚餐'],
  ['travel', '一起去旅行'],
  ['bar', '请妹子泡吧'],
  ['onlineGame', '带妹子上分玩游戏']
]);

const moneyMap = new Map([
  ['gift', 10],
  ['flower', 35],
  ['movie', 60],
  ['dinner', 200],
  ['travel', 300],
  ['bar', 99],
  ['onlineGame', 15]
]);
export { decimalMap, textMap, moneyMap };
