import axios from 'axios';
import env from '#start/env';
class SMSService {
    constructor() {
    }
    async sendSMSFromBulkSMSNigeriaV1(to, body, from) {
        const apiUrl = 'https://www.bulksmsnigeria.com/api/v1/sms/create';
        const apiToken = env.get('BULKSMS_API_TOKEN');
        try {
            const response = await axios.post(apiUrl, null, {
                params: {
                    api_token: apiToken,
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
    async sendSMSFromBulkSMSNigeriaV2(to, body, from, ref) {
        const apiUrl = 'https://www.bulksmsnigeria.com/api/v2/sms/create';
        const apiToken = env.get('BULKSMS_API_TOKEN');
        try {
            const response = await axios.post(apiUrl, {
                api_token: apiToken,
                from,
                to,
                body,
                customer_reference: ref,
                callback_url: `${env.get('HOST')}/callback/sms`,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    }
    async sendSMS(to, body, from, ref) {
        try {
            const response = await this.sendSMSFromBulkSMSNigeriaV2(to, body, from, ref);
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
        await this.sendSMS(student.primaryContact, message, student.school.name.substring(0, 10), `${student.firstName} - ${student.id}`);
    }
}
export default new SMSService();
//# sourceMappingURL=sms_services.js.map