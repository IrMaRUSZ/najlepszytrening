import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Sprawdzanie zmiennych środowiskowych
const checkEnvVariables = () => {
  const requiredVars = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_RECIPIENT'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Brakujące zmienne środowiskowe: ${missingVars.join(', ')}`);
  }
};

// Konfiguracja transportera dla nodemailer
const createTransporter = () => {
  console.log('Tworzenie transportera z konfiguracją:', {
    user: process.env.EMAIL_USER,
    passLength: process.env.EMAIL_PASS?.length || 0
  });

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export async function POST(request: Request) {
  try {
    // Sprawdzenie zmiennych środowiskowych
    checkEnvVariables();
    
    console.log('Rozpoczęcie przetwarzania żądania');
    const body = await request.json();
    const { name, email, message } = body;

    console.log('Otrzymane dane:', { name, email, messageLength: message?.length });

    const transporter = createTransporter();

    // Opcje wiadomości email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `Nowa wiadomość od ${name}`,
      text: `
        Otrzymałeś nową wiadomość od:
        
        Imię: ${name}
        Email: ${email}
        
        Wiadomość:
        ${message}
      `,
      html: `
        <h3>Otrzymałeś nową wiadomość od:</h3>
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${message}</p>
      `
    };

    console.log('Próba wysłania emaila...');
    
    // Wysłanie emaila
    await transporter.sendMail(mailOptions);
    
    console.log('Email wysłany pomyślnie');

    return NextResponse.json(
      { message: 'Wiadomość została wysłana pomyślnie' },
      { status: 200 }
    );

  }  catch (error: Error | unknown) {
    console.error('Szczegóły błędu:', error);
    return NextResponse.json(
      { 
        message: 'Wystąpił błąd podczas wysyłania wiadomości',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}