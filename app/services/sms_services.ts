import axios from 'axios'
// import Env from '@ioc:Adonis/Core/Env'
import Student from '#models/student'
import env from '#start/env'

class SMSService {
  // private defaultSenderId: string

  constructor() {
    // this.apiToken = env.get('BULKSMS_API_TOKEN')
    // this.apiUrl = 'https://www.bulksmsnigeria.com/api/v2/sms/create'
    // this.defaultSenderId = env.get('BULKSMS_SENDER_ID', 'YourSchool')
  }

  async sendSMSFromBulkSMSNigeriaV1(to: string, body: string, from: string) {
    const apiUrl = 'https://www.bulksmsnigeria.com/api/v1/sms/create'
    const apiToken = env.get('BULKSMS_API_TOKEN')
    
    try {
      const response = await axios.post(apiUrl, null, {
        params: {
          api_token: apiToken,
          from,
          to,
          body,
          dnd: 2, // Using the default option for DND management
        },
      })

      return response.data
    } catch (error) {
      console.error('Error sending SMS:', error)
      throw error
    }
  }

  async sendSMSFromBulkSMSNigeriaV2(to: string, body: string, from: string, ref: string) {
    const apiUrl = 'https://www.bulksmsnigeria.com/api/v2/sms/create'
    const apiToken = env.get('BULKSMS_API_TOKEN')
    try {
      const response = await axios.post(apiUrl, {
          api_token: apiToken,
          from,
          to,
          body,
          customer_reference: ref,
          callback_url: `${env.get('HOST')}/callback/sms`
           // Using the default option for DND management,
      }, {headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      }})

      return response.data
    } catch (error) {
      console.error('Error sending SMS:', error)
      throw error
    }
  }

  async sendSMS(to: string, body: string, from: string, ref: string) {
    try {
      const response = await this.sendSMSFromBulkSMSNigeriaV2(to,body, from, ref)

      return response.data
    } catch (error) {
      console.error('Error sending SMS:', error)
      throw error
    }
  }

  async sendToStudent(student: Student, message: string) {
    await student.load('school')
    if (!student.primaryContact) {
      throw new Error('Student does not have a primary contact number')
    }
    // return true;

    await this.sendSMS(student.primaryContact, message, student.school.name.substring(0, 10), `${student.firstName} - ${student.id}`)
  }
}

export default new SMSService()
