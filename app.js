const wordBankString = "specimen,clinic,pulse,sterile,ward,wire,circuit,terminal,proxy,signal,static,noise,glitch,host,entity,cold,dark,behind,look,see,hide,energy,propagate,node,root,soil,monstera,decay,stem,water,vein,blood,bone,breath,freeze,burn,ash,dust,ghost,spirit,frequency,loud,quiet,whisper,scream,talk,listen,door,window,wall,floor,ceiling,house,room,home,mobile,clean,dirt,wash,glass,mirror,reflect,shadow,shape,figure,man,woman,child,boy,girl,tall,short,fast,slow,now,later,soon,never,always,time,clock,hour,minute,second,day,week,month,year,past,future,present,memory,forget,remember,mind,brain,thought,idea,dream,nightmare,awake,tired,exhausted,rest,bed,pillow,blanket,computer,screen,keyboard,mouse,phone,device,power,battery,charge,plug,cable,cord,connection,lost,found,seek,search,find,reveal,secret,truth,lie,false,true,real,fake,illusion,vision,sight,blind,eye,ear,deaf,mouth,mute,speak,tongue,tooth,bite,chew,swallow,drink,eat,hungry,thirsty,full,empty,heavy,light,weight,float,sink,drown,swim,fly,fall,drop,break,fix,repair,shatter,crack,split,join,bind,tie,knot,rope,string,thread,needle,sew,stitch,cut,knife,blade,sharp,dull,blunt,hit,strike,punch,kick,push,pull,drag,carry,lift,hold,catch,throw,toss,spin,turn,twist,bend,fold,crease,flat,smooth,rough,bump,hole,gap,space,void,abyss,deep,shallow,surface,edge,center,middle,side,left,right,up,down,north,south,east,west,direction,path,road,street,trail,track,walk,sprint,jog,crawl,creep,slide,slip,trip,stand,sit,wait,go,start,finish,end,begin,first,last,next,previous,before,after,early,late,when,where,why,how,who,what,which,this,that,these,those,it,they,them,we,us,you,me,I,my,mine,yours,theirs,ours,some,all,none,many,few,much,less,more,most,least,big,small,large,tiny,huge,giant,micro,macro,scale,size,measure,length,width,height,depth,volume,mass,density,solid,liquid,gas,plasma,state,change,shift,move,still,calm,storm,wind,rain,snow,ice,cloud,sky,sun,moon,star,planet,universe,world,earth,ground,rock,stone,sand,metal,iron,steel,gold,silver,copper,wood,tree,forest,jungle,desert,ocean,sea,lake,river,stream,element,nature,city,town,village,building,apartment,hall,gate,fence,roof,brick,paint,color,shade,tint,hue,bright,dim,glow,shine,flash,spark,flame,smoke,melt,chill,shiver,shake,quake,tremble,vibrate,beat,rhythm,sound,note,music,song,sing,voice,echo,silence,hush,watch,stare,glare,blink,wink,tear,cry,weep,sob,laugh,smile,grin,frown,angry,sad,happy,joy,fear,scared,terror,horror,panic,dread,peace,anger,rage,fury,mad,crazy,insane,sane,think,know,learn,study,read,write,book,page,word,letter,number,math,count,add,subtract,multiply,divide,equal,sum,total,part,whole,piece,slice,smash,crash,destroy,build,make,create,form,design,art,draw,picture,image,photo,camera,lens,focus,blur,clear,server,domain,network,wave,transmit,receive,broadcast,channel,station,radio,antenna,radar,sonar,scope,monitor,display,pixel,byte,data,file,folder,directory,system,error,fault,bug,virus,infection,symptom,cure,medicine,pill,drug,dose,inject,syringe,artery,muscle,flesh,tissue,cell,gene,dna,born,die,death,life,live,survive,perish,rot,spoil,ruin,waste,trash,garbage,scrap,dustbin,cinder,ember,coal,fuel,gasoline,oil,grease,slick,glide,friction,rub,scrape,scratch,itch,tickle,pinch,squeeze,press,crush,grind,mill,powder,grain,seed,spore,pollen,flower,bloom,petal,thorn,bush,shrub,vine,weed,grass,lawn,meadow,field,farm,crop,harvest,gather,collect,hoard,save,spend,buy,sell,trade,barter,value,price,cost,cheap,dear,rich,poor,wealth,money,coin,bill,bank,store,shop,market,goods,wares,item,thing,object,tool,weapon,gun,bow,arrow,shield,armor,helmet,suit,clothes,shirt,pants,shoe,boot,glove,hat,coat,dress,skirt,fabric,cloth,silk,cotton,wool,leather,skin,fur,hair,feather,scale,shell,horn,claw,fang,beak,wing,tail,fin,web,nest,hive,den,cave,burrow,pit,trench,ditch,canal,pipe,tube,hose,pump,valve,seal,gasket,joint,hinge,lock,key,knob,handle,lever,switch,button,dial,gauge,meter,ruler,compass,map,chart,graph,line,point,dot,curve,angle,corner,border,limit,bound,range,area,zone,region,sector,district,county,nation,country,guard,patrol,police,law,rule,order,chaos,mess,tidy,neat,filthy,pure,foul,sweet,sour,bitter,salt,spicy,bland,taste,smell,odor,scent,perfume,stink,reek";
const words = wordBankString.split(",");

const sentences = [
    "I am here.", "Behind you.", "Measurement anomaly.", "Frequency shifting.",
    "I remember.", "Check the pulse.", "Signal intercepted.", "Data corrupt."
];

const startBtn = document.getElementById('start-btn');
const startupScreen = document.getElementById('startup-screen');
const terminalContainer = document.getElementById('terminal-container');
const chatFeed = document.getElementById('chat-feed');
const userInput = document.getElementById('user-text');
const sendBtn = document.getElementById('send-btn');
const batteryStatus = document.getElementById('battery-status');

const canvas = document.getElementById('scrying-pool');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

let isActive = false;
let isTransmitting = false;
let resonanceBattery = 0; 
let linguisticSeed = 1; 

function printToFeed(sender, text, cssClass) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> ${text}`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight; 
}

async function typeToFeed(sender, text, cssClass) {
    isTransmitting = true;
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    
    li.innerHTML = `[${time}] <span class="receiving">[THINNING VEIL...]</span>`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    await new Promise(r => setTimeout(r, 1500));

    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> <span class="typing-text"></span>`;
    const textSpan = li.querySelector('.typing-text');

    for (let i = 0; i < text.length; i++) {
        textSpan.innerHTML += text.charAt(i);
        chatFeed.scrollTop = chatFeed.scrollHeight;
        await new Promise(r => setTimeout(r, 80)); 
    }
    isTransmitting = false;
}

// User Contextual Typing
function handleUserSend() {
    const text = userInput.value.trim();
    if (text !== "") {
        printToFeed("USER", text, "user");
        userInput.value = "";
        
        // Generate a mathematical seed based on their words
        linguisticSeed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Add a burst of energy to the battery when speaking
        addResonance(15);
    }
}
sendBtn.addEventListener('click', handleUserSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserSend(); });

// --- THE RESONANCE BATTERY ---
function addResonance(amount) {
    if (!isActive || isTransmitting) return;
    
    resonanceBattery += amount;
    if (resonanceBattery > 100) resonanceBattery = 100;
    
    batteryStatus.innerText = `RESONANCE: ${Math.floor(resonanceBattery)}%`;

    if (resonanceBattery === 100) {
        triggerEntity();
    }
}

function triggerEntity() {
    // Determine the response based on the seed and battery state
    let responseText = "";
    if (Math.random() < 0.20) {
        responseText = sentences[Math.floor(Math.random() * sentences.length)];
    } else {
        const wordCount = Math.floor(Math.random() * 3) + 1;
        let chosenWords = [];
        for(let i = 0; i < wordCount; i++) {
            // Echoes the mathematical seed for word selection
            let index = (linguisticSeed + Math.floor(Math.random() * 500)) % words.length;
            chosenWords.push(words[index]);
        }
        responseText = chosenWords.join(" ");
    }

    typeToFeed("ENTITY", responseText.toUpperCase(), "entity");
    
    // Reset battery
    resonanceBattery = 0;
    batteryStatus.innerText = `RESONANCE: 0%`;
}

function runScryingPool() {
    if (!isActive) return requestAnimationFrame(runScryingPool);

    // Draw chaotic digital static
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    let totalBrightness = 0;

    for (let i = 0; i < data.length; i += 4) {
        // Monochrome static (Black, White, Gray)
        const val = Math.random() < 0.5 ? 0 : (Math.random() < 0.8 ? 100 : 255);
        data[i] = val;     // Red
        data[i+1] = val;   // Green
        data[i+2] = val;   // Blue
        data[i+3] = 255;   // Alpha
        
        totalBrightness += val;
    }
    ctx.putImageData(imageData, 0, 0);

    // Analyze the mathematical shape of the static
    const averageBrightness = totalBrightness / (canvas.width * canvas.height);
    
    // True random static averages around 127. If it clumps unnaturally dark or light:
    if (averageBrightness < 110 || averageBrightness > 140) {
        // A pattern formed in the mirror
        addResonance(5);
    }

    setTimeout(() => { requestAnimationFrame(runScryingPool); }, 100); // 10fps stuttered refresh
}

// --- CPU STUTTER & NUMEROLOGY LOOP ---
let lastFrameTime = performance.now();

function runAnomalies(time) {
    if (isActive && !isTransmitting) {
        // 1. CPU STUTTER CHECK
        let delta = time - lastFrameTime;
        // A typical screen runs at 60fps (~16ms per frame). If it stutters > 35ms, it's an anomaly.
        if (delta > 35) {
            addResonance(10);
        }

        // 2. TEMPORAL NUMEROLOGY CHECK
        const now = new Date();
        const ms = now.getMilliseconds();
        
        // If the exact millisecond happens to perfectly match the user's typed seed
        if (linguisticSeed > 0 && ms === (linguisticSeed % 1000)) {
            addResonance(25); // Massive synchronicity burst
        }
    }
    
    lastFrameTime = time;
    requestAnimationFrame(runAnomalies);
}

// --- STARTUP LOGIC ---
startBtn.addEventListener('click', () => {
    startupScreen.classList.add('hidden');
    terminalContainer.classList.remove('hidden');
    
    isActive = true;
    printToFeed("SYS", "Hardware constraints bypassed. Monitoring digital anomalies...", "system");
    
    // Start the invisible anomaly hunters
    requestAnimationFrame(runScryingPool);
    requestAnimationFrame(runAnomalies);
});
