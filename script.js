// BPSR Refine Rates
// Index 0 = Level 1 (Success Rate for 1 -> 2)
const LEVEL_DATA = [
    // 1-10 (Crystal Lv1)
    { level: 1, success: 1.00, cType: 1, cQty: 2, mQty: 6 },
    { level: 2, success: 1.00, cType: 1, cQty: 2, mQty: 6 },
    { level: 3, success: 1.00, cType: 1, cQty: 4, mQty: 12 },
    { level: 4, success: 1.00, cType: 1, cQty: 4, mQty: 16 },
    { level: 5, success: 1.00, cType: 1, cQty: 6, mQty: 24 }, // Bonus
    { level: 6, success: 0.95, cType: 1, cQty: 6, mQty: 30 },
    { level: 7, success: 0.95, cType: 1, cQty: 8, mQty: 40 },
    { level: 8, success: 0.95, cType: 1, cQty: 8, mQty: 40 },
    { level: 9, success: 0.90, cType: 1, cQty: 10, mQty: 50 },
    { level: 10, success: 0.85, cType: 1, cQty: 10, mQty: 50 },
    // 11-20 (Crystal Lv2)
    { level: 11, success: 0.80, cType: 2, cQty: 4, mQty: 60 },
    { level: 12, success: 0.75, cType: 2, cQty: 4, mQty: 60 },
    { level: 13, success: 0.70, cType: 2, cQty: 4, mQty: 70 },
    { level: 14, success: 0.65, cType: 2, cQty: 6, mQty: 70 },
    { level: 15, success: 0.60, cType: 2, cQty: 8, mQty: 80 },
    { level: 16, success: 0.55, cType: 2, cQty: 8, mQty: 80 },
    { level: 17, success: 0.50, cType: 2, cQty: 8, mQty: 80 },
    { level: 18, success: 0.50, cType: 2, cQty: 10, mQty: 100 },
    { level: 19, success: 0.45, cType: 2, cQty: 12, mQty: 100 },
    { level: 20, success: 0.45, cType: 2, cQty: 16, mQty: 120 },
    // 21-30 (Crystal Lv3)
    { level: 21, success: 0.45, cType: 3, cQty: 4, mQty: 120 },
    { level: 22, success: 0.45, cType: 3, cQty: 4, mQty: 120 },
    { level: 23, success: 0.45, cType: 3, cQty: 6, mQty: 120 },
    { level: 24, success: 0.45, cType: 3, cQty: 6, mQty: 120 },
    { level: 25, success: 0.45, cType: 3, cQty: 8, mQty: 120 },
    { level: 26, success: 0.45, cType: 3, cQty: 8, mQty: 120 },
    { level: 27, success: 0.45, cType: 3, cQty: 10, mQty: 120 },
    { level: 28, success: 0.45, cType: 3, cQty: 12, mQty: 120 },
    { level: 29, success: 0.45, cType: 3, cQty: 14, mQty: 120 },
    { level: 30, success: 0.45, cType: 3, cQty: 16, mQty: 120 }
];

const SLOT_CONFIG = {
    weapon: { mat: 'mystery', costMod: 1.0 },
    head: { mat: 'mystery', costMod: 0.5 },
    armor: { mat: 'mystery', costMod: 0.5 },
    gauntlets: { mat: 'radiant', costMod: 0.5 },
    boots: { mat: 'radiant', costMod: 0.5 },
    earrings: { mat: 'radiant', costMod: 0.5 },
    necklace: { mat: 'radiant', costMod: 0.5 },
    ring: { mat: 'fine', costMod: 0.5 },
    bracelet: { mat: 'fine', costMod: 0.5 },
    charm: { mat: 'fine', costMod: 0.5 }
};

const PITY_INCREMENT = 0.02;

document.addEventListener('DOMContentLoaded', () => {
    populateLevelSelect();
    document.getElementById('calculateBtn').addEventListener('click', calculate);

    // Toggle Logic
    const priceHeader = document.getElementById('priceHeader');
    const priceList = document.querySelector('.price-list');

    priceHeader.addEventListener('click', () => {
        priceList.classList.toggle('collapsed');
    });

    // Default Market Prices
    document.getElementById('priceCrystal1').value = 14170;
    document.getElementById('priceCrystal2').value = 28340;
    document.getElementById('priceCrystal3').value = 65000;

    document.getElementById('priceMystery').value = 1845;
    document.getElementById('priceRadiant').value = 1845;
    document.getElementById('priceFine').value = 1845;

    document.getElementById('priceBuri').value = 7749;
    document.getElementById('priceMeteor').value = 10332;
    document.getElementById('priceMoss').value = 81180;
});

function populateLevelSelect() {
    const select = document.getElementById('currentLevel');
    LEVEL_DATA.forEach(d => {
        const option = document.createElement('option');
        option.value = d.level;
        option.textContent = `Lv.${d.level - 1} -> ${d.level} (${(d.success * 100).toFixed(0)}%)`;
        select.appendChild(option);
    });
}

function calculate() {
    // 1. Get Selections
    const slotKey = document.getElementById('slotType').value;
    const levelVal = parseInt(document.getElementById('currentLevel').value);

    // 2. Get Prices
    const pC1 = parseFloat(document.getElementById('priceCrystal1').value) || 0;
    const pC2 = parseFloat(document.getElementById('priceCrystal2').value) || 0;
    const pC3 = parseFloat(document.getElementById('priceCrystal3').value) || 0;

    const pMystery = parseFloat(document.getElementById('priceMystery').value) || 0;
    const pRadiant = parseFloat(document.getElementById('priceRadiant').value) || 0;
    const pFine = parseFloat(document.getElementById('priceFine').value) || 0;

    const pBuri = parseFloat(document.getElementById('priceBuri').value) || 0;
    const pMeteor = parseFloat(document.getElementById('priceMeteor').value) || 0;
    const pMoss = parseFloat(document.getElementById('priceMoss').value) || 0;

    // 4. Determine Attempt Cost
    const config = SLOT_CONFIG[slotKey];
    const data = LEVEL_DATA.find(d => d.level === levelVal);

    if (!data) return; // Error

    // Material Cost
    let crystalPrice = 0;
    if (data.cType === 1) crystalPrice = pC1;
    if (data.cType === 2) crystalPrice = pC2;
    if (data.cType === 3) crystalPrice = pC3;

    // Apply Cost Modifier
    const actualCQty = Math.ceil(data.cQty * config.costMod);
    const actualMQty = Math.ceil(data.mQty * config.costMod);

    let matPrice = 0;
    if (config.mat === 'mystery') matPrice = pMystery;
    if (config.mat === 'radiant') matPrice = pRadiant;
    if (config.mat === 'fine') matPrice = pFine;

    const baseAttemptCost = (actualCQty * crystalPrice) + (actualMQty * matPrice);

    // 5. Calculate Marginal Value (For Summary Card only - Gross Value)
    // Value of 1% = How much Luno (Base Mat Cost) we save by reducing attempts with a FREE 1% boost
    const baseStats = calculateExpectedValue(data.success, PITY_INCREMENT, 0, 0);
    const baseTotalCost = baseStats.avgAttempts * baseAttemptCost;

    const plusOneStats = calculateExpectedValue(data.success, PITY_INCREMENT, 0.01, 0);
    const plusOneTotalCost = plusOneStats.avgAttempts * baseAttemptCost; // Material cost only
    const savingPerOnePercent = baseTotalCost - plusOneTotalCost;

    // 6. Calculate Specific Item Value (The Real Math)
    // Net Profit = (Old_Attempts - New_Attempts) * Base_Cost - (New_Attempts * Item_Price)
    const calculateItemMath = (boostPct, itemPrice) => {
        const boost = boostPct / 100;
        const istats = calculateExpectedValue(data.success, PITY_INCREMENT, boost, 0);

        const grossValue = (baseStats.avgAttempts - istats.avgAttempts) * baseAttemptCost;
        const totalItemCost = istats.avgAttempts * itemPrice;
        const netProfit = grossValue - totalItemCost;

        return {
            grossValue, // "Value" displayed in UI
            totalItemCost, // "Price" displayed in UI (Total cost of items used)
            netProfit,
            isWorth: netProfit > 0
        };
    };

    const itemResults = {
        moss: calculateItemMath(3, pMoss),
        buri: calculateItemMath(5, pBuri),
        meteor: calculateItemMath(5, pMeteor)
    };

    // Prepare Breakdown Data
    const breakdown = {
        crystals: {
            name: `Starforge Crystal Lv.${data.cType}`,
            qty: actualCQty,
            price: crystalPrice,
            total: actualCQty * crystalPrice
        },
        material: {
            name: config.mat === 'mystery' ? 'Mystery Metal' :
                config.mat === 'radiant' ? 'Radiant Stone' : 'Fine Forgestone',
            qty: actualMQty,
            price: matPrice,
            total: actualMQty * matPrice
        },
        attemptCost: baseAttemptCost,
        avgAttempts: baseStats.avgAttempts
    };

    // 7. Render
    renderResults(baseStats, baseTotalCost, savingPerOnePercent, itemResults, data.success, breakdown);
}

function calculateExpectedValue(baseRate, pityStep, itemBoost, currentPityAccumulation) {
    let expectedAttempts = 0;
    let probabilityOfReachingThisAttempt = 1.0;
    let accumulatedPity = currentPityAccumulation || 0;
    for (let attempt = 1; attempt <= 200; attempt++) {
        let currentSuccessChance = baseRate + itemBoost + accumulatedPity;
        if (currentSuccessChance > 1.0) currentSuccessChance = 1.0;
        let successProbability = probabilityOfReachingThisAttempt * currentSuccessChance;
        expectedAttempts += attempt * successProbability;
        probabilityOfReachingThisAttempt *= (1.0 - currentSuccessChance);
        if (probabilityOfReachingThisAttempt < 0.000001) break;
        accumulatedPity += pityStep;
    }
    return { avgAttempts: expectedAttempts };
}

function renderResults(base, baseCost, savingPerPct, itemResults, baseRate, breakdown) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.remove('hidden');

    // Helper for cost formatting
    const fmt = (n) => formatNumber(n);

    // 1. Top Summary Card (Expected Cost + Stats)
    const summaryCardHtml = `
        <div class="summary-card" style="width: 100%; background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%); padding: 1.5rem; border-radius: 16px; text-align: center; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
            <div style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.5rem; font-weight: 600;">Base Expected Cost</div>
            <div style="font-size: 2.8rem; font-weight: 700; color: var(--primary); text-shadow: 0 0 30px rgba(53, 167, 255, 0.2); margin-bottom: 1.5rem; line-height: 1;">
                ${fmt(baseCost)} <span style="font-size: 1.2rem; color: var(--text-muted); font-weight: 400;">Luno</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.2rem;">
                <div style="border-right: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Base Success Rate</div>
                    <div style="font-size: 1.4rem; font-weight: 600; color: var(--text-main);">${(baseRate * 100).toFixed(0)}%</div>
                </div>
                <div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">Gross Value of 1% Boost</div>
                    <div style="font-size: 1.4rem; font-weight: 600; color: var(--success); text-shadow: 0 0 10px rgba(74, 222, 128, 0.2);">${fmt(savingPerPct)} Luno</div>
                </div>
            </div>
        </div>
    `;

    // 2. Item Cards (Same Line)
    const createCard = (name, pct, resultData) => {
        const { grossValue, totalItemCost, netProfit, isWorth } = resultData;

        return `
            <div style="flex: 1; padding: 1.25rem; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid ${isWorth ? 'rgba(74, 222, 128, 0.4)' : 'rgba(239, 68, 68, 0.4)'}; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; min-width: 0; box-shadow: ${isWorth ? '0 0 15px rgba(74, 222, 128, 0.1)' : 'none'}; transition: transform 0.2s;">
                <h3 style="margin: 0 0 0.8rem 0; font-size: 1.1rem; color: var(--text-main); font-weight: 600;">${name} <span style="color: var(--primary); font-size: 0.9em;">+${pct}%</span></h3>
                
                <div style="width: 100%; display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 0.4rem; color: var(--text-muted);">
                    <span>Avg Value:</span>
                    <span style="color: var(--text-main); font-weight: 600;">${fmt(grossValue)}</span>
                </div>
                <div style="width: 100%; display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 1rem; color: var(--text-muted);">
                    <span>Avg Price:</span>
                    <span>${fmt(totalItemCost)}</span>
                </div>

                <div style="margin-top: auto; width: 100%; text-align: center;">
                    <div style="font-weight: 800; font-size: 1.2rem; color: ${isWorth ? 'var(--success)' : 'var(--danger)'}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.2rem;">
                        ${isWorth ? 'BUY' : 'SKIP'}
                    </div>
                    <div style="font-size: 0.8rem; color: ${isWorth ? 'var(--success)' : 'var(--danger)'}; opacity: 0.8; font-family: monospace;">
                        ${isWorth ? 'save' : 'lose'} ${fmt(Math.abs(netProfit))}
                    </div>
                </div>
            </div>
        `;
    };

    const itemsHtml = `
        <div style="display: flex; gap: 1rem; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; margin-bottom: 1.5rem;">
            ${createCard('Moss', 3, itemResults.moss)}
            ${createCard('Buri', 5, itemResults.buri)}
            ${createCard('Meteor', 5, itemResults.meteor)}
        </div>
    `;

    // 3. Breakdown Card (New)
    const bd = breakdown || {};
    const breakdownHtml = `
        <div style="width: 100%; background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border);">
            <h3 style="font-size: 1rem; color: var(--text-main); margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">Cost Breakdown (Per Attempt)</h3>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-muted);">
                <span>${bd.crystals.name}</span>
                <span style="color: var(--text-main);">x${bd.crystals.qty} (${fmt(bd.crystals.total)})</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-muted);">
                <span>${bd.material.name}</span>
                <span style="color: var(--text-main);">x${bd.material.qty} (${fmt(bd.material.total)})</span>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 0.5rem; display: flex; justify-content: space-between; font-weight: bold; color: var(--primary);">
                <span>Cost Per Attempt</span>
                <span>${fmt(bd.attemptCost)}</span>
            </div>
             <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
                <span>Avg Attempts Needed</span>
                <span>${bd.avgAttempts.toFixed(2)}</span>
            </div>
        </div>
    `;

    resultsDiv.innerHTML = summaryCardHtml + itemsHtml + breakdownHtml;
}

function formatNumber(num) {
    return new Intl.NumberFormat().format(Math.round(num));
}
