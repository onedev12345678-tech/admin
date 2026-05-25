// Firebase Configuration (sama)
const firebaseConfig = {
    apiKey: "AIzaSyC3_Mu644DfvIvRk-uw4UGmXEnjvSgpd1s",
  authDomain: "coba-70608.firebaseapp.com",
  databaseURL: "https://coba-70608-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coba-70608",
  storageBucket: "coba-70608.firebasestorage.app",
  messagingSenderId: "54930111072",
  appId: "1:54930111072:web:c09e6cd6e4e0177ce46105",
  measurementId: "G-NJXNLLDL3H"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// Fungsi untuk reseller bikin akun pembeli
function buatAkunPembeli(email, password, namaPembeli) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid;
            return db.ref(`reseller/pembeli_list/${uid}`).set({
                email: email,
                namaPembeli: namaPembeli,
                createdAt: Date.now(),
                createdByReseller: firebase.auth().currentUser.uid
            });
        });
}

// Fungsi untuk reseller lihat semua pembeli nya
function lihatSemuaPembeli() {
    const resellerId = firebase.auth().currentUser.uid;
    return db.ref('reseller/pembeli_list').orderByChild('createdByReseller').equalTo(resellerId).once('value');
}