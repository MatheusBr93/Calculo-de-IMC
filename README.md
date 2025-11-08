# 📱 Calculadora de IMC com Histórico (Firebase + React Native + Expo Snack)

Aplicativo que calcula o IMC do usuário, salva automaticamente os resultados no Firebase Firestore e exibe um histórico completo com possibilidade de excluir registros. Desenvolvido em React Native e executado via Expo Snack.

---

## 🚀 Funcionalidades

- ✅ Cálculo do IMC com classificação automática  
- ✅ Salvamento automático no Firebase Firestore  
- ✅ Histórico em tempo real  
- ✅ Listagem ordenada do mais recente ao mais antigo  
- ✅ Botão para apagar registros individualmente  
- ✅ Interface simples e intuitiva  

---

## 🛠️ Tecnologias Utilizadas

- React Native  
- Expo Snack  
- Firebase v8 (compat)  
- Firestore  
- Styled-Components (opcional)  
- React Native Paper  
- Expo Vector Icons  

---

## 📁 Estrutura do Projeto

├── App.js

├── firebase.js

├── package.json

└── README.md


---

## 🔧 Como Rodar o Projeto no Expo Snack

1. Acesse: https://snack.expo.dev  
2. Adicione a dependência obrigatória:  
   - `"firebase": "8.10.0"`
3. Cole o código dos arquivos `App.js` e `firebase.js`.
4. Insira suas credenciais Firebase no arquivo `firebase.js`.
5. Habilite o Firestore no Console do Firebase.
6. Execute nos dispositivos virtuais: Android, iOS ou Web.

---

## 🔥 Configuração do Firebase

No arquivo `firebase.js`, substitua pelo seu próprio config:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
## 🤝 Contribuição

Contribuições são bem-vindas!  
Sugestões podem ser enviadas via *Issues* ou *Pull Requests*.

---

## 📄 Licença

Distribuído sob a licença **MIT**.  
Livre para uso, modificação e distribuição.
