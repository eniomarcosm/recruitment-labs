import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import { SucessEmail } from 'src/emails/confirmedEmail'

// // import VacationRequestEmail from 'src/emails/vacation_request'

export async function POST(request: Request) {
  const { subject, vaga_nome, email } = await request.json()

  //   // console.log(email, name, start_date, end_date, days)

  //   // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: parseInt('587', 10),
    service: 'gmail',
    auth: {
      user: 'eniomarcos48', // SMTP username
      pass: 'dbta xznp kkwd frne' // SMTP password
    }
  })

  //   // Send email using the transporter
  await transporter.sendMail({
    from: process.env.SMTP_FROM, // Sender address
    to: email, // List of receivers
    subject: subject, // Subject line
    html: compileEmail(vaga_nome, subject) // HTML body
  })

  return NextResponse.json({ message: 'Email sent', status: 'OK' })
}

export function compileEmail(subject: string, vaga_nome: string) {
  const template = handlebars.compile(SucessEmail)

  const htmlBody = template({
    subject: subject,
    vaga_nome
  })

  return htmlBody
}
