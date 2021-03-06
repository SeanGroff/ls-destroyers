import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
    this.cloudFunctions = app.functions()
  }

  handleCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  handleSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  handleSignOut = () => this.auth.signOut()

  handlePasswordReset = email => this.auth.sendPasswordResetEmail(email)

  handlePasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password)
  }

  handleMakeAdmin = ({ email }) => {
    const addAdminRole = this.cloudFunctions.httpsCallable('addAdminRole')
    return addAdminRole({ email })
  }
}

export default Firebase
