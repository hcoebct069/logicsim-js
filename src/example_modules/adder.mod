{
  "name": "fulladder",
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
    "w1",
    "w2",
    "w3"
  ],
  "operations": [
    {
      "instance": "basic_xor",
      "type": "basic",
      "inputs": [
        "A",
        "B",
        "Ci"
      ],
      "outputs": [
        "S"
      ]
    },
    {
      "instance": "basic_and",
      "type": "basic",
      "inputs": [
        "A",
        "B"
      ],
      "outputs": [
        "w1"
      ]
    },
    {
      "instance": "basic_and",
      "type": "basic",
      "inputs": [
        "Ci",
        "A"
      ],
      "outputs": [
        "w2"
      ]
    },
    {
      "instance": "basic_and",
      "type": "basic",
      "inputs": [
        "Ci",
        "B"
      ],
      "outputs": [
        "w3"
      ]
    },
    {
      "instance": "basic_or",
      "type": "basic",
      "inputs": [
        "w1",
        "w2",
        "w3"
      ],
      "outputs": [
        "Co"
      ]
    }
  ]
}