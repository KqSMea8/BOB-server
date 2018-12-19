dir=$(dirname "$0")
dataDir=$1
node $dir/main.js $dataDir/cust_info.txt
# node $dir/main.js $dataDir/cust_label_info.txt
node $dir/main.js $dataDir/g_customer_cust_assets_rating.txt
node $dir/main.js $dataDir/g_customer_debt_card_bill.txt
