// eslint-disable-next-line import/prefer-default-export
export async function saveData(data, set) {
  try {
    await fetch(
      `https://mtg-set-reviewer.fly.dev/sets/${set}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
        mode: "cors",
      },
    );
  } catch (err) {
    console.log(err);
  }
}
