{
  "name": "custom",
  "inputs": [
    "A",
    "B",
    "Ci"
  ],
  "outputs": [
    "S",
    "Co"
  ],
  "wires": [
    "w1"
  ],
  "operations": [
    {
      "instance": "basic_xor",
      "type":"basic",
      "inputs": [
        "A",
        "B",
        "Ci"
      ],
      "outputs": [
        "w1"
      ]
    },
    {
      "instance": "adder",
      "type": "non-basic",
      "inputs": [
        "B",
        "w1"
      ],
      "outputs": [
        "S",
        "Co"
      ]
    }
  ]
}