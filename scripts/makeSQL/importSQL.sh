host=$1
user=$2
password=$3
dir=$4
mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/cust_info.sql
mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/cust_label_info.sql
mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/g_customer_cust_assets_rating.sql
mysql --host $host -u$user -p$password --default-character-set=utf8 <$dir/g_customer_debt_card_bill.sql
