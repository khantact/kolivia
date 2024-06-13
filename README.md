# Kolivia
#### Built by Kevin Han, and Olivia Malcolmson

![chatbox](image.png)

# Summary
Built for our machine learning class at Colgate, KOlivia seeks to combine the apps that students use everyday such as the weather app, google calendar, and google.
Our chatbot is built upon 3 separate models that provide it with the ability to classify and extract information from user prompts.
The models we utilize are the following:
- 2 DistilBERT models, trained on custom python-generated data (which can be seen in our [kolivia-backend](https://github.com/khantact/kolivia-backend/tree/master) repository)
- A spaCy NER model, trained on custom python-generated data (which can be seen in [this](https://github.com/omalcolmson/KOlivia2) repository)

# Tech Stack

- Frontend: Next.JS + TailwindCSS
- Backend: JavaScript, NextAuth, Firebase  