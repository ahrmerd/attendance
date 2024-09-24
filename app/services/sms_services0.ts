import axios from 'axios'
// import Env from '@ioc:Adonis/Core/Env'
import Student from '#models/student'
import env from '#start/env'

class SMSService {
  private apiToken: string
  private apiUrl: string
  private defaultSenderId: string

  constructor() {
    this.apiToken = env.get('BULKSMS_API_TOKEN')
    this.apiUrl = 'https://www.bulksmsnigeria.com/api/v1/sms/create'
    this.defaultSenderId = env.get('BULKSMS_SENDER_ID', 'YourSchool')
  }

  async sendSMS(to: string, body: string, from: string) {
    try {
      const response = await axios.post(this.apiUrl, null, {
        params: {
          api_token: this.apiToken,
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

  async sendToStudent(student: Student, message: string) {
    await student.load('school')
    if (!student.primaryContact) {
      throw new Error('Student does not have a primary contact number')
    }
    return true;

    // return this.sendSMS(student.primaryContact, message, student.school.name)
  }
}

export default new SMSService()
