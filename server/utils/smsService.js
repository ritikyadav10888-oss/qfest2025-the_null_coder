// Mock SMS Service
// In a real app, you would use Twilio, AWS SNS, or similar here.

const sendSMS = (to, message) => {
    console.log('=============================================');
    console.log(`📱 SMS SENT TO: ${to}`);
    console.log(`💬 MESSAGE: ${message}`);
    console.log('=============================================');
};

module.exports = sendSMS;
