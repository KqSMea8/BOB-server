set dataDir=%1
node ./main.js %dataDir%/cust_info.txt
node ./main.js %dataDir%/cust_label_info.txt
node ./main.js %dataDir%/g_customer_cust_assets_rating.txt
node ./main.js %dataDir%/g_customer_debt_card_bill.txt