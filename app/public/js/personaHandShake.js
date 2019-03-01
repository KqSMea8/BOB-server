socket.on('message', function (msg) {
  doSlideDown(msg, () => {
    var json = {
      data: msg
    };
    const params = (new URL(document.location)).searchParams;
    const custCoreNo = params.get('custCoreNo')
    if (json.data.text === "product1") {
      console.log(json.data.text);
      slideDown('products_detail.html', `custCoreNo=${custCoreNo}&product=0`);
      return;
    } else if (json.data.text === "product2") {
      console.log(json.data.text);
      slideDown('products_detail.html', `custCoreNo=${custCoreNo}&product=1`);
      return;
    } else if (json.data.text === "product3") {
      console.log(json.data.text);
      slideDown('products_detail.html', `custCoreNo=${custCoreNo}&product=2`);
      return;
    }
  })
})