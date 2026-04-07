import { initializeApp, App, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

if(getApps().length === 0){
    app = initializeApp({
        credential: cert(
            process.env.FIREBASE_SERVICE_KEY
                ? JSON.parse(process.env.FIREBASE_SERVICE_KEY)
                : require('./service_key.json')
        ),
    })
} else {
    app = getApp()
}

const admindb = getFirestore(app);

export { app as adminApp, admindb }