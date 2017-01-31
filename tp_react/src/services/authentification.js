/**
 * Created by glo_0 on 28/01/2017.
 */

const hardCodedLogin = [
  {
    user: "iwa",
    password: "iwa"
  },
  {
    user:"gloria",
    password: "popo"
  },
  {
    user: "axel",
    password: "pipi"
  },    {
    user: "guillaume",
    password: "pupu"
  }

];


module.exports = {

  login(username, password, cb) {
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(username, password, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.token
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
};

function pretendRequest(username, password, cb) {
  setTimeout(() => {
    if (hardCodedLogin.reduce(function(a,b) {
        return a || (b.user == username && b.password == password);
      }, false)) {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}


