// eslint-disable-next-line import/prefer-default-export
export async function saveData(data, set) {
  try {
    await fetch(`https://set-review-server.fly.dev/sets/${set}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
  } catch (err) {
    console.log(err);
  }
}
