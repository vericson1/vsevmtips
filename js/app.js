// Koppla datan från data/*.js till appen.
const DATA = window.DATA;
const PARTICIPANTS = window.PARTICIPANTS;
const CHAMP_COUNTS = window.CHAMP_COUNTS;
const MATCH_RESULTS = window.MATCH_RESULTS || {};

if (!DATA || !PARTICIPANTS) {
  throw new Error('Data saknas. Kontrollera att data/results.js och data/tips.js laddas före js/app.js.');
}

// Renderar tabeller, personvyer, sök och poängmarkeringar.

const content=document.getElementById('content');
const fmtDate=d=>d?new Date(d+'T00:00:00').toLocaleDateString('sv-SE',{day:'numeric',month:'short'}):'';
const score=m=>`${m.home_goals ?? ''}–${m.away_goals ?? ''}`;
function resultChip(m, extraClasses=''){return `<span class="result-chip ${extraClasses}">${score(m)}</span>`}
function matchCard(m){return `<div class="match"><div class="match-top"><span>Match ${m.match_no??''}</span><span>${fmtDate(m.date)}</span></div><div class="teams"><span>${m.home??''}</span><span class="score">${score(m)}</span><span>${m.away??''}</span></div>${m.winner?`<div class="winner">Vinnare: ${m.winner}</div>`:''}</div>`}
function renderOverview(){const champs=Object.entries(CHAMP_COUNTS).sort((a,b)=>b[1]-a[1]).map(([team,n])=>`<div class="bonus-item"><b>${team}</b><div class="muted">${n} tips</div></div>`).join('');const rows=PARTICIPANTS.map(p=>{const d=DATA[p];return `<tr><td><b>${p}</b></td><td>${d.champion??''}</td><td>${d.silver??''}</td><td>${d.bronze??''}</td></tr>`}).join('');content.innerHTML=`<section class="person-header"><div class="section"><h2>Världsmästartips</h2><div class="bonus-list">${champs}</div></div><div class="section compare"><h2>Podium per deltagare</h2><table><thead><tr><th>Deltagare</th><th>Guld</th><th>Silver</th><th>Brons</th></tr></thead><tbody>${rows}</tbody></table></div></section>`}

/*
getOutcome()
Returnerar "home", "away" eller "draw".
Används för att se om tipset hade rätt vinnare/oavgjort.
*/
function getOutcome(homeGoals, awayGoals){
  if(homeGoals > awayGoals) return 'home';
  if(homeGoals < awayGoals) return 'away';
  return 'draw';
}

/*
parseResult()
Gör om resultat från results.js till siffror.
Ex: "2-1" -> {home:2, away:1}
*/
function parseResult(value){
  if(!value || typeof value !== 'string') return null;
  const parsed = value.trim().match(/^(\d+)\s*[-–]\s*(\d+)$/);
  if(!parsed) return null;
  return {home:Number(parsed[1]), away:Number(parsed[2])};
}

/*
getPredictionClasses()
Jämför ett tips med det riktiga resultatet och returnerar CSS-klasser.
*/
function getPredictionClasses(prediction, actualResultText){
  const actual = parseResult(actualResultText);

  // Om resultat saknas i results.js ska inget färgmarkeras.
  if(!actual) return '';

  const predictedOutcome = getOutcome(prediction.home_goals, prediction.away_goals);
  const actualOutcome = getOutcome(actual.home, actual.away);

  const outcomeClass = predictedOutcome === actualOutcome
    ? 'prediction-correct-outcome'
    : 'prediction-wrong-outcome';

  const exactScore =
    prediction.home_goals === actual.home &&
    prediction.away_goals === actual.away;

  if(exactScore) return `${outcomeClass} prediction-exact`;

  const oneTeamGoalsCorrect =
    prediction.home_goals === actual.home ||
    prediction.away_goals === actual.away;

  if(oneTeamGoalsCorrect) return `${outcomeClass} prediction-one-goal`;

  return `${outcomeClass} prediction-no-goal`;
}

function renderCompare(){let nums=[...new Set(Object.values(DATA).flatMap(d=>d.matches.map(m=>m.match_no)))].sort((a,b)=>a-b);let today=new Date().toLocaleDateString('sv-SE',{day:'2-digit',month:'short'}).replace('.','').toLowerCase();let rows=nums.map(n=>{let meta=Object.values(DATA)[0].matches.find(m=>m.match_no===n)||{};let group=(meta.round||'').replace('Grupp ','');let matchName=`${meta.home??''} - ${meta.away??''}`;let actualResult=(typeof MATCH_RESULTS!=='undefined'&&MATCH_RESULTS[n])?MATCH_RESULTS[n]:'-';let rowDate=fmtDate(meta.date).toLowerCase();let todayClass=rowDate===today?'today-row':'';let cells=PARTICIPANTS.map(p=>{let m=DATA[p].matches.find(x=>x.match_no===n);let predictionClasses=m?getPredictionClasses(m,actualResult):'';return `<td>${m?resultChip(m,predictionClasses):''}</td>`}).join('');return `<tr class="${todayClass}" data-q="${(meta.home+' '+meta.away+' '+meta.round).toLowerCase()}"><td>${n}</td><td>${fmtDate(meta.date)}</td><td>${group}</td><td class="match-name">${matchName}</td><td class="actual-result">${actualResult}</td>${cells}</tr>`}).join('');content.innerHTML=`<section class="section compare"><h2>Jämför tips i gruppspelet</h2><input class="search" id="matchSearch" placeholder="Sök lag eller grupp…"><table><thead><tr><th>#</th><th>Datum</th><th>Grupp</th><th>Match</th><th>Resultat</th>${PARTICIPANTS.map(p=>`<th>${p}</th>`).join('')}</tr></thead><tbody id="compareRows">${rows}</tbody></table></section>`;document.getElementById('matchSearch').addEventListener('input',e=>{let q=e.target.value.toLowerCase();document.querySelectorAll('#compareRows tr').forEach(tr=>tr.style.display=tr.dataset.q.includes(q)?'':'none')})}
function renderPerson(p){const d=DATA[p];const points=d.points.map(x=>`<tr><td>${x.category}</td><td>${x.points??''}</td><td>${x.bonus??''}</td><td><b>${x.total??''}</b></td></tr>`).join('');const bonus=d.bonus.map(x=>`<div class="bonus-item"><b>${x.category}</b><div>${x.answer??''}</div></div>`).join('');const rounds=d.rounds.map(r=>`<div class="card round"><h3>${r.name}</h3>${r.matches.map(matchCard).join('')}</div>`).join('');const standings=d.tables.map(g=>`<div class="card standings"><h3>${g.name}</h3><table><thead><tr><th>Lag</th><th>V</th><th>O</th><th>F</th><th>+/-</th><th>P</th></tr></thead><tbody>${g.rows.map(row=>`<tr><td>${row.team}</td><td>${row.v}</td><td>${row.o}</td><td>${row.f}</td><td>${row.diff}</td><td><b>${row.p}</b></td></tr>`).join('')}</tbody></table></div>`).join('');content.innerHTML=`<section class="person-header"><div class="section"><h2>${p}</h2><div class="podium"><div class="medal gold"><b>Guld</b><span>${d.champion??''}</span></div><div class="medal silver"><b>Silver</b><span>${d.silver??''}</span></div><div class="medal bronze"><b>Brons</b><span>${d.bronze??''}</span></div></div></div><div class="section compare"><h2>Poängöversikt</h2><table><tbody>${points}</tbody></table></div></section><section class="section"><h2>Bonusfrågor</h2><div class="bonus-list">${bonus}</div></section><section class="section"><h2>Slutspelsträd</h2><div class="grid rounds">${rounds}</div></section><section class="section"><h2>Grupptabeller enligt ${p}</h2><div class="grid tables">${standings}</div></section>`}
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const v=btn.dataset.view;if(v==='compare')renderCompare();else renderPerson(v.replace('person-',''));window.scrollTo({top:0,behavior:'smooth'})}));renderCompare();
