const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));

const mutations = [
  {
    patch: {
      id: 'b2b-clinicas',
      set: { 
        title: 'Clínicas & Centros Estéticos',
        cardDescription: 'Automatiza el agendamiento de pacientes, reduce el absentismo y convierte más leads desde campañas publicitarias con asistentes de IA 24/7.',
        ctaLabel: 'Ver Ecosistema Médico'
      }
    }
  },
  {
    patch: {
      id: 'b2b-retail',
      set: {
        niche: 'ECOMMERCE & RETAIL',
        title: 'Nitro Retail E-commerce',
        cardDescription: 'Sincroniza inventarios, automatiza el servicio al cliente con IA y recupera carritos abandonados de forma automática para escalar tu facturación.',
        ctaLabel: 'Ver Ecosistema Retail'
      }
    }
  },
  {
    patch: {
      id: 'b2b-inmobiliaria',
      set: {
        title: 'Proyectos Inmobiliarios',
        cardDescription: 'Pre-califica prospectos inmobiliarios en piloto automático, agenda visitas de forma inteligente y realiza seguimientos sin intervención humana.',
        ctaLabel: 'Ver Ecosistema Inmobiliario'
      }
    }
  }
];

fetch('https://75jg16ba.api.sanity.io/v2023-05-03/data/mutate/production', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + envConfig.SANITY_API_TOKEN
  },
  body: JSON.stringify({ mutations })
}).then(r => r.json()).then(r => console.log(JSON.stringify(r))).catch(console.error);
