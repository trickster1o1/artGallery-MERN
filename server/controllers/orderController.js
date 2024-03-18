const { createHash } = require('crypto');

const submitOrder = async (req, res) => {
  const { price, id } = req.body;
  const ssh = createHash('sha256').update(id).digest('base64');
//   var path = "https://uat.esewa.com.np/epay/main";
//   var params = {
//     amount: price,
//     product_service_charge: 0,
//     product_delivery_charge: 0,
//     tax_amount: 0,
//     total_amount: price,
//     pid: id+'-'+Date.now(),
//     transaction_uuid: id+'-'+Date.now(),
//     product_code: "EPAYTEST",
//     success_url: process.env.WEB+"/orders",
//     failure_url: process.env.WEB+"/orders?status=failed",
//     signature: 
//   };

//   var form = document.createElement("form");
//   form.setAttribute("method", "POST");
//   form.setAttribute("action", path);

//   for (var key in params) {
//     var hiddenField = document.createElement("input");
//     hiddenField.setAttribute("type", "hidden");
//     hiddenField.setAttribute("name", key);
//     hiddenField.setAttribute("id", key);
//     hiddenField.setAttribute("value", params[key]);
//     form.appendChild(hiddenField);
//   }

//   document.body.appendChild(form);
//   form.submit();

  return res.status(200).json({ msg: "success", id, price, ssh });
};

const recordOrder = async (req, res) => {
  res.status(200).json({ msg: "success" });
};

module.exports = { submitOrder, recordOrder };
