# Bolo 🗣️
*Bolo means "speak" in Hindi.*

I built this for my grandmother. She is blind and Hindi-speaking, and every medication reminder app I found assumed the user could see and read English. Bolo speaks to her in her language so she never misses a dose.

## What it does
- Sends voice reminders in 16 languages including Hindi, Spanish, Arabic, French, and more
- Built so visually impaired users never have to look at or read anything — the app speaks every reminder aloud in the patient's chosen language with a warm, slowed voice
- Press-and-hold confirmation mechanic designed for low vision and motor difficulty users — no precise tapping required
- Accessibility setup at the start — caregiver specifies vision or hearing difficulty and the app adapts automatically (larger text, stronger vibration)
- Caregiver sets everything up, patient just listens and confirms
- Live countdown timer showing days, hours, and minutes until the next reminder
- Tap-to-check overlay for patients to see medicine details between reminders
- Gentle chime before every spoken reminder
- Tracks starting tablet count (low supply alerts coming soon)
- "Display in English" toggle — screen stays in English for readability while the voice speaks in the patient's language

## How I built it
I leveraged Claude AI throughout the design and development process as a thought partner — from mapping out the user experience to working through technical decisions. Using AI as a collaborative tool allowed me to iterate faster and build more thoughtfully, which is central to how I approach engineering problems.

- Voice confirmation: the patient says "yes" (or "I took it") in their language, and "no" is never mistaken for yes
- Reminders repeat every 5 minutes, and a dose is logged as missed after 15
- Caregiver dashboard behind a 4-digit PIN: tablets left, when each medicine runs out, refills, missed-dose and low-supply alerts, and the full dose history
- One account per caregiver, saved in Firebase so the tablet picks up where it left off after a reload

## Tech Stack
- HTML, CSS, JavaScript
- Web Speech API (SpeechSynthesis + SpeechRecognition) for multilingual voice in and out
- Firebase Authentication + Cloud Firestore

## Running it
The mic and voice only work on `localhost` or `https`, not when opening `index.html` directly:
```
python3 -m http.server 8000
```
Then open http://localhost:8000. Without Firebase set up, the app runs offline and nothing is saved.

## Firebase setup
1. Create a project at https://console.firebase.google.com
2. **Authentication** → Sign-in method → enable **Email/Password**
3. **Firestore Database** → Create database → then paste `firestore.rules` into the **Rules** tab and publish
4. Project settings → Your apps → add a **Web app** → copy the config into `firebase-config.js`

Data lives at `caregivers/{uid}/patients/{patientId}/medicines` and `/logs`, so one caregiver can have several patients later.

## Status
Work in progress. Next up: multiple patients per caregiver, and texting the caregiver about missed doses.

## Get in touch
marvigarg181@gmail.com
