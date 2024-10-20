const https = require('follow-redirects').https;

const sendSMS = ()=> {
    var options = {
        'method': 'POST',
        'hostname': 'api.infobip.com',
        'path': '/sms/2/text/advanced',
        'headers': {
            'Authorization': 'App 44f5aa2a7eac2f902600eeb82e563883-fe642a6d-5eff-4c26-80d3-f8966f09f26b', // Thay bằng API Key của bạn
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function (error) {
            console.error(error);
        });
    });

    var postData = JSON.stringify({
        "messages": [
            {
                "destinations": [{"to":"84342555702"}], // Số điện thoại nhận tin nhắn
                "from": "84918414764", // ID người gửi
                "text": "KangMin is chicken"
            }
        ]
    });

    req.write(postData);
    req.end();
}

// Gọi hàm sendSMS khi cần
module.exports = {sendSMS};
