export const today = () => new Date().toLocaleDateString('en-CA');
export function daysLeft(date, now=today()) { return Math.round((Date.parse(date+'T12:00:00Z')-Date.parse(now+'T12:00:00Z'))/86400000); }
export const recipes = [
{id:'frittata',name:'Garden frittata',time:20,kind:'Vegetarian',icon:'◒',ingredients:{eggs:200,spinach:100,tomato:200},steps:['Chop the vegetables and wilt the spinach in a little oil.','Beat the eggs, fold in vegetables, and cook gently in a covered pan until set throughout.'],tip:'Use soft tomatoes here; keep firm ones for salads.'},
{id:'rice',name:'Clean-out-the-fridge rice',time:15,kind:'Vegetarian',icon:'◈',ingredients:{rice:300,carrot:150,spinach:100,eggs:100},steps:['Cook rice according to the packet. Dice carrots and sauté until tender.','Add spinach and beaten eggs. Cook the eggs through, fold in rice, and serve immediately.'],tip:'This recipe uses dry rice; cool any leftovers promptly.'},
{id:'pasta',name:'Roasted tomato pasta',time:25,kind:'Vegan',icon:'≋',ingredients:{pasta:200,tomato:300,spinach:100},steps:['Cook the dry pasta according to the packet.','Roast chopped tomatoes with oil, then toss with pasta and spinach until the leaves wilt.'],tip:'Tomatoes that are soft but unspoiled work well in a sauce.'},
{id:'soup',name:'Golden carrot & lentil soup',time:30,kind:'Vegan',icon:'◡',ingredients:{carrot:250,lentils:150,tomato:150},steps:['Rinse lentils. Chop carrots and tomatoes.','Simmer together with water or stock until the lentils and carrots are fully tender. Season to taste.'],tip:'Freeze extra portions with a date label.'},
{id:'toast',name:'Tomato & egg toast',time:10,kind:'Vegetarian',icon:'▱',ingredients:{bread:120,eggs:100,tomato:150},steps:['Toast bread. Chop tomatoes and sauté in a pan.','Add beaten eggs and cook until fully set, then spoon onto the toast.'],tip:'Toast bread before it becomes stale.'},
{id:'oats',name:'Banana overnight oats',time:5,kind:'Vegetarian',icon:'◔',ingredients:{oats:100,milk:250,banana:200},steps:['Mash banana and combine with oats and milk.','Cover and refrigerate overnight. Serve chilled the next day.'],tip:'Only use milk that is within its use-by date and properly stored.'},
{id:'salad',name:'Chickpea crunch bowl',time:10,kind:'Vegan',icon:'✳',ingredients:{chickpeas:250,carrot:150,tomato:200},steps:['Drain ready-to-eat chickpeas. Grate carrots and chop tomatoes.','Toss together with oil, lemon juice, and seasoning.'],tip:'Use ready-to-eat canned chickpeas, not raw dried ones.'}
];
export function plan(pantry,{people=2,diet='All',maxTime=30,now=today()}={}) {
 const usable=pantry.filter(x=>x.grams>0&&daysLeft(x.date,now)>=0);
 return recipes.filter(r=>(diet==='All'||r.kind===diet)&&r.time<=maxTime).map(r=>{
 let used=[],missing=[],score=0;
 for(const [food,base] of Object.entries(r.ingredients)) { let need=base*people/2;
 for(const p of usable.filter(x=>x.food===food).sort((a,b)=>a.date.localeCompare(b.date))) {let grams=Math.min(need,p.grams);if(grams<=0)continue;used.push({id:p.id,food,grams,date:p.date});need-=grams;score+=grams*(daysLeft(p.date,now)<=2?4:1);}
 if(need>0)missing.push({food,grams:need}); }
 const urgent=used.filter(x=>daysLeft(x.date,now)<=2).reduce((a,x)=>a+x.grams,0);
 return {...r,used,missing,urgent,grams:used.reduce((a,x)=>a+x.grams,0),score:score-missing.reduce((a,x)=>a+x.grams,0)*2};
 }).filter(r=>r.used.length).sort((a,b)=>b.score-a.score);
}
export function cook(state,recipe,now=today()) {
 if(recipe.missing.length) throw Error('Add the missing ingredients and regenerate the plan before logging this meal.');
 const pantry=state.pantry.map(x=>({...x}));
 for(const use of recipe.used){const p=pantry.find(x=>x.id===use.id);if(!p||p.grams<use.grams||daysLeft(p.date,now)<0)throw Error('Inventory changed. Generate a fresh plan.');p.grams-=use.grams;}
 return {...state,pantry:pantry.filter(x=>x.grams>0),history:[{id:crypto.randomUUID(),name:recipe.name,date:now,grams:recipe.grams,urgent:recipe.urgent,used:recipe.used},...state.history]};
}
export function demo(now=today()) { const date=n=>{let d=new Date(now+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};return {version:1,pantry:[['tomato',650,1],['spinach',250,1],['eggs',400,4],['bread',300,2],['rice',500,90],['carrot',450,6],['pasta',400,90],['banana',300,2],['oats',500,80],['milk',500,3]].map(([food,grams,n],i)=>({id:'demo-'+i,food,grams,date:date(n)})),history:[]}; }
export function validate(data) { if(data?.version!==1||!Array.isArray(data.pantry)||!Array.isArray(data.history)||data.pantry.length>1000||data.history.length>10000)throw Error('Invalid ShelfShift backup.');let ids=new Set();for(const x of data.pantry){if(typeof x.id!=='string'||ids.has(x.id)||!foods.includes(x.food)||!Number.isFinite(x.grams)||x.grams<=0||x.grams>100000||!/^\d{4}-\d{2}-\d{2}$/.test(x.date)||!Number.isFinite(Date.parse(x.date+'T12:00:00Z'))||new Date(x.date+'T12:00:00Z').toISOString().slice(0,10)!==x.date)throw Error('Invalid pantry item.');ids.add(x.id)}for(const h of data.history){if(typeof h.name!=='string'||typeof h.date!=='string'||!Number.isFinite(h.grams)||h.grams<0||!Number.isFinite(h.urgent)||h.urgent<0||h.urgent>h.grams)throw Error('Invalid meal history.')}return data; }
export const foods=['tomato','spinach','eggs','bread','rice','carrot','pasta','banana','oats','milk','lentils','chickpeas'];
