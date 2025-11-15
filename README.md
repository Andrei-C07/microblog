## 📌 **Description du projet (Cours 420-P5C – Applications Mobiles)**
Ce projet s’inscrit dans le cadre du cours *Applications Mobiles (P5C)*.
L’objectif est de développer une application de micro-blogging minimaliste, fonctionnant sur mobile et web via Expo, permettant aux utilisateurs de :
publier des messages,suivre ou ne plus suivre d’autres utilisateurs,
voir les publications en temps réel grâce à WebSocket,
filtrer les messages (tous / suivis / mes posts),
naviguer entre les pages de publications avec pagination,
gérer une session (login/logout).

L’application utilise une **architecture REST API**, un **frontend React Native**, et un **backend Flask avec SQLite3**.

## 👥 **Membres de l’équipe**

**Alexandru Ciuca** & 
**Andrei Cretu**

## 🚀 **Instructions pour installer et exécuter le projet**

### **1️⃣ Prérequis**

* Node.js (18+)
* Python 3.10+
* pip
* Expo CLI :

  ```bash
  npm install -g expo-cli

## **2️⃣ Installation du backend**
### 📁 Aller dans le dossier backend
 ```bash
 cd serveur_rest_api
 ```

### Créer et activer un environnement virtuel
 ```bash
python -m venv venv
source venv/bin/activate
 ```
### Installer les dépendances
 ```bash
pip install -r requirements.txt
 ```

### Lancer le serveur Flask

python main.py

Le backend démarre par défaut sur :
👉 **http://localhost:8000**

## **3️⃣ Installation du frontend**
### 📁 Aller dans le dossier frontend
 ```bash
 cd microblog
 ```

### Installer les dépendances
 ```bash
 npm install
 ```

### Lancer Expo
 ```bash
 npx expo start OU npm start
 ```
