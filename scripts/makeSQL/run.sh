host=$1
user=$2
password=$3
dir=$(dirname "$0")
node $dir/main.js $dir/data/cust_info.txt
node $dir/main.js $dir/data/cust_label_info.txt
node $dir/main.js $dir/data/g_customer_cust_assets_rating.txt
node $dir/main.js $dir/data/g_customer_debt_card_bill.txt

mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/sql/cust_info.sql
mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/sql/cust_label_info.sql
mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/sql/g_customer_cust_assets_rating.sql
mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/sql/g_customer_debt_card_bill.sql
