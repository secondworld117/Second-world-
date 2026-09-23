const $ = (s) => document.querySelector(s);

const modal = $("#loginModal");
const loginBtn = $("#loginBtn");
const closeModal = $("#closeModal");
const menuBtn = $("#menuBtn");
const nav = $(".nav");

loginBtn.addEventListener("click", () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
});
closeModal.addEventListener("click", () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal.click();
});
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".work-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.type !== filter);
    });
  });
});

/*
  GOOGLE LOGIN / FIREBASE
  1) Create a Firebase project.
  2) Enable Authentication > Sign-in method > Google and Email/Password.
  3) Add your web app and paste its config into firebase-config.js.
  4) Serve the website from localhost or HTTPS. Google OAuth will NOT work
     reliably from file:// or a random 127.0.0.1 port unless that origin is
     added to Firebase Authorized Domains.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const status = $("#authStatus");
const googleBtn = $("#googleBtn");
const emailForm = $("#emailForm");

let auth;
try {
  if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey === "PASTE_YOUR_API_KEY") {
    status.innerHTML = "Google جاهز للربط، لكن ضع بيانات Firebase في <b>firebase-config.js</b> أولًا.";
  } else {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    onAuthStateChanged(auth, user => {
      if (user) {
        loginBtn.innerHTML = `👤 ${user.displayName || user.email}`;
        status.textContent = `تم تسجيل الدخول: ${user.email}`;
      }
    });
  }
} catch (err) {
  status.textContent = "تعذر تهيئة نظام الدخول. راجع إعدادات Firebase.";
}

googleBtn.addEventListener("click", async () => {
  if (!auth) {
    status.textContent = "أكمل إعداد Firebase أولًا في firebase-config.js.";
    return;
  }
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    modal.classList.remove("open");
  } catch (err) {
    status.textContent = "لم يكتمل تسجيل الدخول. تأكد من Authorized Domains وإعداد Google.";
  }
});

emailForm.addEventListener("submit", async e => {
  e.preventDefault();
  if (!auth) {
    status.textContent = "أكمل إعداد Firebase أولًا في firebase-config.js.";
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, $("#emailInput").value, $("#passwordInput").value);
    modal.classList.remove("open");
  } catch (err) {
    status.textContent = "البريد أو كلمة المرور غير صحيحة، أو الحساب غير مفعّل.";
  }
});
