let currentTeam = 0;

const teams = [
  { money: 50000, sectors: [] },
  { money: 50000, sectors: [] },
  { money: 50000, sectors: [] },
  { money: 50000, sectors: [] }
];

const tiles = [
  { name: "Corporate HQ", type: "corner" },

  { name: "Banking", type: "sector", price: 8000, rent: 2000, owner: null },
  { name: "FMCG", type: "sector", price: 7000, rent: 1800, owner: null },
  { name: "Strategy", type: "strategy" },
  { name: "IT Services", type: "sector", price: 9000, rent: 2200, owner: null },

  { name: "Market Event", type: "market" },
  { name: "Healthcare", type: "sector", price: 8500, rent: 2100, owner: null },
  { name: "Regulation", type: "bonus" }
];

const strategyCards = [
  { text: "Operational efficiency +₹5000", value: 5000 },
  { text: "Failed expansion −₹4000", value: -4000 },
  { text: "Strong leadership +₹6000", value: 6000 },
  { text: "Strategy misfire −₹3000", value: -3000 },
  { text: "Process automation +₹4500", value: 4500 },
  { text: "Delayed execution −₹2500", value: -2500 },
  { text: "Cost control +₹4000", value: 4000 },
  { text: "Bad merger −₹3500", value: -3500 },
  { text: "Market alignment +₹3000", value: 3000 },
  { text: "Internal conflict −₹2000", value: -2000 }
];

const marketCards = [
  { text: "Market boom +₹6000", value: 6000 },
  { text: "Recession −₹4000", value: -4000 },
  { text: "High demand +₹5000", value: 5000 },
  { text: "Inflation −₹3000", value: -3000 },
  { text: "Export growth +₹4500", value: 4500 },
  { text: "Currency loss −₹2500", value: -2500 },
  { text: "Investor confidence +₹4000", value: 4000 },
  { text: "Supply shock −₹3500", value: -3500 },
  { text: "Price surge +₹3000", value: 3000 },
  { text: "Market crash −₹2000", value: -2000 }
];

const bonusCards = [
  { text: "Tax rebate +₹4000", value: 4000 },
  { text: "Audit penalty −₹3000", value: -3000 },
  { text: "Govt subsidy +₹5000", value: 5000 },
  { text: "Regulatory fine −₹4000", value: -4000 },
  { text: "Policy support +₹3500", value: 3500 },
  { text: "Compliance failure −₹2500", value: -2500 },
  { text: "Incentive grant +₹3000", value: 3000 },
  { text: "Legal expense −₹2000", value: -2000 },
  { text: "Bonus payout +₹4500", value: 4500 },
  { text: "License issue −₹3500", value: -3500 }
];

let positions = [0, 0, 0, 0];

function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  positions[currentTeam] = (positions[currentTeam] + dice) % tiles.length;

  let tile = tiles[positions[currentTeam]];
  let team = teams[currentTeam];

  let log = `Team ${currentTeam + 1} rolled ${dice} → ${tile.name}`;

  if (tile.type === "sector") {
    if (tile.owner === null) {
      if (confirm(`Buy ${tile.name} for ₹${tile.price}?`)) {
        tile.owner = currentTeam;
        team.money -= tile.price;
        team.sectors.push(tile.name);
      }
    } else if (tile.owner !== currentTeam) {
      team.money -= tile.rent;
      teams[tile.owner].money += tile.rent;
      log += ` | Paid ₹${tile.rent} rent`;
    }
  }

  if (tile.type === "strategy") drawCard(strategyCards);
  if (tile.type === "market") drawCard(marketCards);
  if (tile.type === "bonus") drawCard(bonusCards);

  document.getElementById("log").innerText = log;
  updateSidebar();

  currentTeam = (currentTeam + 1) % 4;
  document.getElementById("turn").innerText =
    `Current Turn: Team ${currentTeam + 1}`;
}

function drawCard(deck) {
  let card = deck[Math.floor(Math.random() * deck.length)];
  teams[currentTeam].money += card.value;
  alert(card.text);
}

function updateSidebar() {
  let html = "";
  teams.forEach((t, i) => {
    html += `<b>Team ${i + 1}</b><br>`;
    html += `Money: ₹${t.money}<br>`;
    html += `Sectors: ${t.sectors.join(", ") || "None"}<hr>`;
  });
  document.getElementById("status").innerHTML = html;
}

updateSidebar();
