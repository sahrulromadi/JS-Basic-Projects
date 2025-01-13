const url = "https://reqres.in/api/users?page=2";

// selalu mengembalikan response
// agar bisa diakses, response nya di jadiin json dlu
// then selalu mengembalikan response dari then sebelumnya

// GET
// fetch(url)
//   .then((response) => {
//     return response.json();
//   })
//   // harus di return dulu, agar bisa dikirimkan ke then setelahnya
//   .then((data) => {
//     return data;
//   })
//   .then((isiData) => {
//     console.log(isiData.data);
//   })
//   .catch((error) => {
//     console.log("Error = ", error);
//   });

// POST
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/JSON",
  },
  // data yang dikirimkan
  body: JSON.stringify({
    name: "Sahrul",
    umur: "21",
  }),
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
