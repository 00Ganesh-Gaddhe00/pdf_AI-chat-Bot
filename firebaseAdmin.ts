import { initializeApp, applicationDefault, App, getApps, cert, getApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';

const serviceKey = require('./service_key.json')

let app: App;

if(getApps().length === 0){
    app= initializeApp({
        credential: cert( serviceKey ),
    })
}
else{
    app = getApp()
}

const admindb = getFirestore(app);

export { app as adminApp, admindb }