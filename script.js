const items = ['button1.png', 'button2.png', 'ring.png'];
const inventory = {};
const columns = [0, 1, 2];
const container = document.getElementById('falling-items-container');
const inventoryItems = document.getElementById('inventory-items');

function spawnItem() {
  const itemType = items[Math.floor(Math.random() * items.length)];
  const columnIndex = columns[Math.floor(Math.random() * columns.length)];

  const item = document.createElement('img');
  item.src = `assets/${itemType}`;
  item.classList.add('falling-item');
  item.style.left = `${columnIndex * 100}px`;
  const duration = Math.random() * 3 + 2;
  item.style.animationDuration = `${duration}s`;

  item.onclick = () => {
    addToInventory(itemType);
    item.remove();

    const pickaxe = document.createElement('img');
    pickaxe.src = 'assets/pickaxe.png';
    pickaxe.style.position = 'absolute';
    pickaxe.style.left = item.style.left;
    pickaxe.style.top = item.style.top;
    pickaxe.style.width = '50px';
    pickaxe.style.height = '50px';
    pickaxe.style.zIndex = 3;
    container.appendChild(pickaxe);

    setTimeout(() => pickaxe.remove(), 500);
  };

  item.addEventListener('animationend', () => {
    removeFromInventory(itemType);
    item.remove();
  });

  container.appendChild(item);
}

function addToInventory(type) {
  if (!inventory[type]) inventory[type] = 0;
  inventory[type]++;
  updateInventoryUI();
}

function removeFromInventory(type) {
  if (!inventory[type]) inventory[type] = 0;
  if (inventory[type] > 0) inventory[type]--;
  updateInventoryUI();
}

function updateInventoryUI() {
  inventoryItems.innerHTML = '';
  for (let [item, count] of Object.entries(inventory)) {
    if (count > 0) {
      inventoryItems.innerHTML += `<div><img src="assets/${item}" style="width:20px;vertical-align:middle"/> x${count}</div>`;
    }
  }
}

setInterval(spawnItem, 1500);
