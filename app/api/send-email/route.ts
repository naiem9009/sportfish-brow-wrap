/**
 * Developed by Md Naim Hossen
 * Full Stack Developer
 *
 * WhatsApp: +880 1776-556776
 * Email: developernaim83@gmail.com
 */

import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  boatDetails: z.string().min(1, "Boat details are required"),
  message: z.string().optional(),
})

const transporter = nodemailer.createTransport({
  host: "browwraps.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@browwraps.com",
    pass: "}BsV+o$icWFm",
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = formSchema.parse(body)

    const mailOptions = {
      from: `"Browwraps" <contact@browwraps.com>`,
      to: "oceanwraps@gmail.com",
      subject: `New Quote Request from ${validatedData.firstName} ${validatedData.lastName}`,
      html: `
        <h1>New Quote Request</h1>
        <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || "Not provided"}</p>
        <p><strong>Marina Location:</strong> ${validatedData.location}</p>
        <p><strong>Boat Details:</strong> ${validatedData.boatDetails}</p>
        <p><strong>Additional Details:</strong> ${validatedData.message || "None"}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: "Your quote request has been sent successfully!" 
    })

  } catch (error) {
    console.error("Error sending email:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: "Please check your form inputs and try again.",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      }, { status: 400 })
    }

    return NextResponse.json({ 
      success: false, 
      message: "Failed to send your request. Please try again later." 
    }, { status: 500 })
  }
}
