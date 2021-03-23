import axios from "axios"

export default {
createAccount: function (data) {
axios.post("http://localhost:8080/api/create/account", data)
}

// {
//     headers: { authorization: "Bearer: " + localStorage.getItem("Auth") },
//   }
}