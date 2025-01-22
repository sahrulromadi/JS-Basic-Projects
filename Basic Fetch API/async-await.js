// async -> kata kunci untuk membuat fungsi asinkron
// await -> menunggu promise sebelum dilanjutkan ke baris berikutnya

const url = "https://reqres.in/api/users?page=2";

// GET
async function fetchData() {
  try {
    const response = await fetch(url); // menunggu response dari sebelumnya
    const data = await response.json(); // menunggu response diubah menjadi JSON
    console.log(data);
  } catch (error) {
    console.log("Error = ", error);
  }
}

// POST
async function postData() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: "Sahrul",
        umur: "21",
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error = ", error);
  }
}

// fetchData();
postData();
