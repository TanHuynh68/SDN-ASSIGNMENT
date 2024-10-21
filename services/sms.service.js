const https = require('follow-redirects').https;
function convertToInternationalFormat(phoneNumber) {
    // Xóa các ký tự không phải số
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Kiểm tra độ dài và định dạng số điện thoại
    if (cleanedNumber.length === 10 && cleanedNumber.startsWith('0')) {
        // Chuyển đổi số điện thoại thành định dạng 84xxxx
        const convertedNumber = '84' + cleanedNumber.slice(1);
        return convertedNumber;
    } else {
        throw new Error('Số điện thoại không hợp lệ. Đảm bảo nó có 10 chữ số và bắt đầu bằng 0.');
    }
}

const sendSMS = (phoneNumber) => {
    const otp = generateOTP(6)
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
    const result = convertToInternationalFormat(phoneNumber);
    if (result) {
        var postData = JSON.stringify({
            "messages": [
                {
                    "destinations": [{ "to": `${result}` }], // Số điện thoại nhận tin nhắn
                    "from": "447491163443", // ID người gửi
                    "text": `Your otp is ${otp}`
                }
            ]
        });
    }

    req.write(postData);
    req.end();
}

function generateOTP(length = 6) {
    // Kiểm tra độ dài có hợp lệ không
    if (length < 1) {
        throw new Error("Độ dài OTP phải lớn hơn 0.");
    }

    let otp = '';
    const digits = '0123456789'; // Chỉ sử dụng chữ số

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}
// Gọi hàm sendSMS khi cần
module.exports = { sendSMS, generateOTP };
