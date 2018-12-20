## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### 接口

#### POST /api/customer/exist

body 参数
|参数 | 类型 | 说明|
| ------ | ------ | ------ |
|chName | string | 中文名|
|certNo | string | 身份证号|
返回值

```javascript
{
    "status": 0,
    "data": {
        "id": 1,
        "data_date": "2018-xx-xx",
        "cust_core_no": "00000000xxxx764",
        "ch_name": "xxx",
        "sex": "2",
        "age": "x7",
        "birth_date": "19xxxx01",
        "constellation": "天x座",
        "mobile_phone": "1350xxxx720",
        "cert_type": "01",
        "cert_no": "110105xxxxxxxx2128",
        "fin_risk_rating": "3"
    }
}
```

#### GET /api/customer/getInfo?custCoreNo=xxx

```javascript
{
  "status": 0,
  "data": {
    "id": 1,
    "data_date": "2018-xx-xx",
    "cust_core_no": "00000000xxxx764",
    "ch_name": "xxx",
    "sex": "2",
    "age": "x7",
    "birth_date": "19xxxx01",
    "constellation": "天x座",
    "mobile_phone": "1350xxxx720",
    "cert_type": "01",
    "cert_no": "110105xxxxxxxx2128",
    "fin_risk_rating": "3"
    "assetsRatings": [{
      "id": 1,
      "data_date": "2018-12-03",
      "cust_core_no": "00000000xxxx764",
      "cust_name": "xxx",
      "cert_type": "01",
      "cert_no": "110105xxxxxxxx2128",
      "branch_code": "00102",
      "90d_balance_RMB": "1886697.17",
      "90d_fund_RMB": "41630.85",
      "90d_sg_RMB": "0.0",
      "90d_saving_RMB": "243805.74",
      "90d_Tbond_RMB": "0.0",
      "90d_bbfin_RMB": "123274.54",
      "90d_fbbfin_RMB": "1479452.83",
      "90d_sx_RMB": "0.0",
      "90d_assets_RMB": "1888163.96",
      "assets_rating": "10",
      "balance_RMB": "1996376.35",
      "gbcard_90d": "1888163.96",
      "gbcard_type": "3",
      "gbcard_level": "10",
      "mscard_90d": "0.0",
      "mscard_type": "",
      "mscard_level": "",
      "yjxcard_90d": "1888163.96",
      "yjxcard_type": "5",
      "yjxcard_level": "30",
      "srcard_90d": "0.0",
      "srcard_type": "",
      "srcard_level": "",
      "max_card_level": "10",
      "addr": "北京xxxxx大厦",
      "tele_phone": "86xxxxxx22",
      "mobile_phone": "135xxxx4720"
    }],
    "debtCardBills": [{
      "id": 5,
      "trade_date": "201811",
      "cust_core_no": "00000000xxxx764",
      "monthly_in_balance": "204049.60000038147",
      "n_monthly_in_balance": "14",
      "monthly_out_balance": "196540.50872802734",
      "n_monthly_out_balance": "3",
      "monthly_cjwy_transfer": "0",
      "n_monthly_cjwy_transfer": "0",
      "monthly_edzf_transfer": "150000.0",
      "n_monthly_edzf_transfer": "1",
      "monthly_bb_fp": "20000.0",
      "n_monthly_bb_fp": "2",
      "monthly_fbb_fp": "300000.0",
      "n_monthly_fbb_fp": "2",
      "monthly_fund": "40000.0",
      "n_monthly_fund": "1",
      "monthly_hn_transfer": "343.0",
      "n_monthly_hn_transfer": "1",
      "monthly_pos": "0",
      "n_monthly_pos": "0",
      "monthly_debt": "0",
      "n_monthly_debt": "0"
    }],
    "labelInfos": [{
        "id": 1,
        "cust_core_no": "00000000xxxx764",
        "label_code": "03004",
        "label_name": "进取型"
      },
      {
        "id": 30,
        "cust_core_no": "00000000xxxx764",
        "label_code": "01002",
        "label_name": "白富美"
      },
      {
        "id": 43,
        "cust_core_no": "00000000xxxx764",
        "label_code": "02006",
        "label_name": "手机达人"
      },
      {
        "id": 67,
        "cust_core_no": "00000000xxxx764",
        "label_code": "04001",
        "label_name": "忠诚客户"
      },
      {
        "id": 82,
        "cust_core_no": "00000000xxxx764",
        "label_code": "02005",
        "label_name": "诚信达人"
      },
      {
        "id": 93,
        "cust_core_no": "00000000xxxx764",
        "label_code": "02007",
        "label_name": "网银达人"
      },
      {
        "id": 114,
        "cust_core_no": "00000000xxxx764",
        "label_code": "02002",
        "label_name": "存款达人"
      },
      {
        "id": 134,
        "cust_core_no": "00000000xxxx764",
        "label_code": "02001",
        "label_name": "理财达人"
      },
      {
        "id": 148,
        "cust_core_no": "00000000xxxx764",
        "label_code": "06002",
        "label_name": "剁手党"
      },
      {
        "id": 164,
        "cust_core_no": "00000000xxxx764",
        "label_code": "05001",
        "label_name": "高收入"
      },
      {
        "id": 211,
        "cust_core_no": "00000000xxxx764",
        "label_code": "02004",
        "label_name": "产品达人"
      }
    ]
  }
}
```
