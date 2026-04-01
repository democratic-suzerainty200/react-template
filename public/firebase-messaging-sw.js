importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js")

const firebaseConfig = {
  apiKey: "AIzaSyDxLFbJhB5-flMoP3bN2OEZYOPg3mBpcdE",
  authDomain: "react-template-555aa.firebaseapp.com",
  projectId: "react-template-555aa",
  storageBucket: "react-template-555aa.firebasestorage.app",
  messagingSenderId: "1088072796748",
  appId: "1:1088072796748:web:e98c505bed214e669dc2e9",
  measurementId: "G-ZXKQ4B1321"
}

// Init
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title
  const options = {
    body: payload.notification?.body
  }

  self.registration.showNotification(title, options)
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const url = event.notification.data?.url || "/i/notice"

  event.waitUntil(
    clients.openWindow(url)
  )
})
