// eslint-disable-next-line import/prefer-default-export
export async function saveData(data, set) {
  try {
    const response = await fetch(`http://localhost:3000/sets/${set}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const status = await response.json();
    console.log(status.message)
  } catch (err) {
    console.log(err);
  }
}
