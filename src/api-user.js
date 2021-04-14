import axios from "axios"

export default {
createAccount: function (data) {
axios.post("https://dispatch-rider-back.herokuapp.com/api/create/account", data)
}

// {
//     headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
//   }
}