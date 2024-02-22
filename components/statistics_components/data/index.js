// file with dummy data. 
// TODO: Populate from backend
export default [
  {
    statisticId: 1,
    title: "Food Inventory Growth",
    description: "You’ve added {{addedValue}} lbs of food to your inventory this year.",
    foodGroupBreakdown: [
      { category: "Grains", quantity: "{{grainsValue}}", unit: "lbs" },
      { category: "Fruits", quantity: "{{fruitsValue}}", unit: "lbs" },
      { category: "Vegetables", quantity: "{{vegetablesValue}}", unit: "lbs"},
      { category: "Protein", quantity: "{{proteinValue}}", unit: "lbs" },
      { category: "Dairy", quantity: "{{dairyValue}}", unit: "lbs" }
    ],
    peakMonth: "",
    addedValue: "1000",
    grainsValue: "20",
    fruitsValue: "199",
    vegetablesValue: "419",
    proteinValue: "22",
    dairyValue: "372",
  },
  {
    statisticId: 2,
    title: "Monetary Value of Inventory Growth",
    description: "You’ve added approximately ${{addedValue}} worth of food to your inventory this year.",
    foodGroupBreakdown: [
      { category: "Grains", quantity: "{{grainsValue}}", unit: "$" },
      { category: "Fruits", quantity: "{{fruitsValue}}", unit: "$" },
      { category: "Vegetables", quantity: "{{vegetablesValue}}", unit: "$"},
      { category: "Protein", quantity: "{{proteinValue}}", unit: "$" },
      { category: "Dairy", quantity: "{{dairyValue}}", unit: "$" }
    ],
    peakMonth: "",
    addedValue: "1000",
    grainsValue: "20",
    fruitsValue: "199",
    vegetablesValue: "419",
    proteinValue: "22",
    dairyValue: "372",
  },
  {
    statisticId: 3,
    title: "Macronutrient Composition",
    description: "You’ve added {{carbsPercent}}% of carbs, {{proteinPercent}}% of protein, and {{fatPercent}}% of fat to your inventory this year.",
    peakMonth: "",
    carbsPercent: "10",
    proteinPercent: "40",
    fatPercent: "50",
  },
  {
    statisticId: 4,
    title: "Peak Inventory Addition Month",
    description: "You added the most items to your inventory in:",
    peakMonth: "March",
  },
  {
    statisticId: 5,
    title: "Peak Consumption Month",
    description: "You consumed the most items from your inventory in:",
    peakMonth: "April",
  },
  {
    statisticId: 6,
    title: "Unique Items Added",
    description: "You’ve added {{uniqueFoodItems}} different items to your inventory this year.",
    peakMonth: "",
    uniqueFoodItems: "8",
  },
  {
    statisticId: 7,
    title: "User Rankings",
    description: "You are in the top {{consumerPercentage}}% of Kitchenwise users",
    peakMonth: "",
    consumerPercentage: "12",
  },
];
