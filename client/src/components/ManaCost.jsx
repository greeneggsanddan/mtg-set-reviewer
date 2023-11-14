/* eslint-disable react/self-closing-comp */
export default function ManaCost({ manaCost }) {
  const attributes = {
    W: "ms ms-w ms-cost ms-shadow",
    U: "ms ms-u ms-cost ms-shadow",
    B: "ms ms-b ms-cost ms-shadow",
    R: "ms ms-r ms-cost ms-shadow",
    G: "ms ms-g ms-cost ms-shadow",
    C: "ms ms-c ms-cost ms-shadow",
    X: "ms ms-x ms-cost ms-shadow",
    1: "ms ms-1 ms-cost ms-shadow",
    2: "ms ms-2 ms-cost ms-shadow",
    3: "ms ms-3 ms-cost ms-shadow",
    4: "ms ms-4 ms-cost ms-shadow",
    5: "ms ms-5 ms-cost ms-shadow",
    6: "ms ms-6 ms-cost ms-shadow",
    7: "ms ms-7 ms-cost ms-shadow",
    8: "ms ms-8 ms-cost ms-shadow",
    9: "ms ms-9 ms-cost ms-shadow",
    10: "ms ms-10 ms-cost ms-shadow",
    11: "ms ms-11 ms-cost ms-shadow",
    12: "ms ms-12 ms-cost ms-shadow",
    13: "ms ms-13 ms-cost ms-shadow",
    14: "ms ms-14 ms-cost ms-shadow",
    15: "ms ms-15 ms-cost ms-shadow",
    16: "ms ms-16 ms-cost ms-shadow",
    17: "ms ms-17 ms-cost ms-shadow",
    18: "ms ms-18 ms-cost ms-shadow",
    19: "ms ms-19 ms-cost ms-shadow",
    20: "ms ms-20 ms-cost ms-shadow",
  };

  function trimCost(str) {
    const trimmed = str.split(" ");
    return trimmed[0];
  }

  function extractValues(str) {
    const splitValues = str.split("}");
    const values = splitValues.map((value) => value.slice(1));

    return values;
  }

  const symbols = extractValues(trimCost(manaCost)).map((value, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <i className={attributes[value]} key={index}></i>
  ));

  return (
    <div className="d-flex align-items-center" style={{ fontSize: ".8125rem" }}>
      {symbols}
    </div>
  );
}
