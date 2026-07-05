importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyCVxjNKmd4q0MSqMSAHVBZKL6gKxm-FkjQ",
  authDomain:        "uno-travel-76fff.firebaseapp.com",
  projectId:         "uno-travel-76fff",
  storageBucket:     "uno-travel-76fff.firebasestorage.app",
  messagingSenderId: "844479496061",
  appId:             "1:844479496061:web:bf5996033433c9a9895614",
  measurementId:     "G-X5E4H5Z67N",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification ?? {};
  if (!title) return;
  self.registration.showNotification(title, {
    body:  body ?? "",
    icon:  "/images/BusinessCardLogo-removebg-preview.png",
    badge: "/images/BusinessCardLogo-removebg-preview.png",
    data:  payload.data ?? {},
  });
});
