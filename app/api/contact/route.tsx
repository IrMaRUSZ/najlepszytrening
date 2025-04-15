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

// Mapowanie celów na pełne opisy
const goalDescriptions = {
  'redukcja': 'Chcę schudnąć.',
  'masa': 'Interesuje mnie zbudowanie masy mięśniowej.',
  'plecy': 'Mam problemy z plecami.',
  'plan': 'Potrzebuje planu treningowego',
  'custom': ''
};

export async function POST(request: Request) {
  try {
    // Sprawdzenie zmiennych środowiskowych
    checkEnvVariables();
    
    console.log('Rozpoczęcie przetwarzania żądania');
    const body = await request.json();
    
    // Obsługa danych z nowego formularza
    const { 
      name, 
      phone, 
      contactMethod, 
      contactDetails, 
      goal, 
      customMessage 
    } = body;

    console.log('Otrzymane dane:', { 
      name, 
      phone, 
      contactMethod,
      contactDetails: contactDetails || 'Nie podano',
      goal
    });

    // Przygotowanie wiadomości na podstawie wybranego celu
    const message = goal === 'custom' 
      ? customMessage 
      : goalDescriptions[goal] || 'Nie określono szczegółów.';

    const transporter = createTransporter();

    // Opcje wiadomości email - zaktualizowane o nowe pola
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `Nowa wiadomość od ${name} - Formularz Kontaktowy`,
      text: `
        Otrzymałeś nową wiadomość od:
        
        Imię: ${name}
        Telefon: ${phone}
        Dodatkowy kontakt (${contactMethod}): ${contactDetails || 'Nie podano'}
        Wybrany cel: ${goal}
        
        Wiadomość:
        ${message}
      `,
      html: `
        <h3>Otrzymałeś nową wiadomość od formularza kontaktowego:</h3>
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Dodatkowy kontakt (${contactMethod}):</strong> ${contactDetails || 'Nie podano'}</p>
        <p><strong>Wybrany cel:</strong> ${goal}</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #fca311; border-radius: 4px;">
          <p><strong>Wiadomość:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">Ta wiadomość została wysłana automatycznie z formularza kontaktowego na stronie najlepszytrening.pl</p>
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

  } catch (error: Error | unknown) {
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