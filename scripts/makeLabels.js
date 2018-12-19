const fs = require('fs');
const nodePath = require('path')
const _ = require('lodash')

const labelHeader = `label_code
label_name
label_type_code
label_type_name
label_state`.split('\n')

const label = _.keyBy(`01001	土豪	01	资产标签	1
01002	白富美	01	资产标签	1
01003	高富帅	01	资产标签	1
01004	潜力股	01	资产标签	1
01005	月光族	01	资产标签	1
01999	纯医保	01	资产标签	1
02001	理财达人	02	持有产品标签	1
02002	存款达人	02	持有产品标签	1
02003	交易达人	02	持有产品标签	1
02004	产品达人	02	持有产品标签	1
02005	诚信达人	02	持有产品标签	1
02006	手机达人	02	持有产品标签	1
02007	网银达人	02	持有产品标签	1
02008	担保达人	02	持有产品标签	1
03001	激进型	03	风险等级标签	1
03002	平衡型	03	风险等级标签	1
03003	保守型	03	风险等级标签	1
04001	忠诚客户	04	忠诚度标签	1
04001	高收入	05	收入标签	1
06001	羊毛党	06	交易情况标签	1
06002	剁手党	06	交易情况标签	1
07001 企业主 07 企业主标签 1 `.split('\n').map(o => {
  const res = {}
  const splitO = o.split(/\t|\s/)
  labelHeader.forEach((key, index) => {
    res[key] = splitO[index]
  })
  return res
}), 'label_code')

console.log(label)

fs.writeFileSync(nodePath.resolve(__dirname, '../app/data/labels.json'), JSON.stringify(label, undefined, ' '))