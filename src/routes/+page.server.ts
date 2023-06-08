// /** @type {import('./$types').PageServerLoad}*/
// export async function load() {
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const url = "${baseUrl}/api/spotify/recently-played";
//   return fetch(url).then(r => r.json()).then(payload => {
//     const {items} = payload;
//     return { items };
//   })
// }

export async function load() {
  console.log("This function only runs on the server");
}