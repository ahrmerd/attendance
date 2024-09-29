import axios from 'axios';
import env from '#start/env';
class SMSService {
    apiToken;
    apiUrl;
    defaultSenderId;
    constructor() {
        this.apiToken = env.get('BULKSMS_API_TOKEN');
        this.apiUrl = 'https://www.bulksmsnigeria.com/api/v1/sms/create';
        this.defaultSenderId = env.get('BULKSMS_SENDER_ID', 'YourSchool');
    }
    async sendSMS(to, body, from) {
        try {
            const response = await axios.post(this.apiUrl, null, {
                params: {
                    api_token: this.apiToken,
                    from,
                    to,
                    body,
                    dnd: 2,
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    }
    async sendToStudent(student, message) {
        await student.load('school');
        if (!student.primaryContact) {
            throw new Error('Student does not have a primary contact number');
        }
        return true;
    }
}
export default new SMSService();
//# sourceMappingURL=sms_services0.js.map