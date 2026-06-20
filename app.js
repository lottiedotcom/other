// --- THEMED DICTIONARY (Strictly 500 Words) ---
const wordBankString = "specimen,clinic,pulse,sterile,ward,wire,circuit,terminal,proxy,signal,static,noise,glitch,host,entity,cold,dark,behind,look,see,hide,energy,propagate,node,root,soil,monstera,decay,stem,water,vein,blood,bone,breath,freeze,burn,ash,dust,ghost,spirit,frequency,loud,quiet,whisper,scream,talk,listen,door,window,wall,floor,ceiling,house,room,home,mobile,clean,dirt,wash,glass,mirror,reflect,shadow,shape,figure,man,woman,child,boy,girl,tall,short,fast,slow,now,later,soon,never,always,time,clock,hour,minute,second,day,week,month,year,past,future,present,memory,forget,remember,mind,brain,thought,idea,dream,nightmare,awake,tired,exhausted,rest,bed,pillow,blanket,computer,screen,keyboard,mouse,phone,device,power,battery,charge,plug,cable,cord,connection,lost,found,seek,search,find,reveal,secret,truth,lie,false,true,real,fake,illusion,vision,sight,blind,eye,ear,deaf,mouth,mute,speak,tongue,tooth,bite,chew,swallow,drink,eat,hungry,thirsty,full,empty,heavy,light,weight,float,sink,drown,swim,fly,fall,drop,break,fix,repair,shatter,crack,split,join,bind,tie,knot,rope,string,thread,needle,sew,stitch,cut,knife,blade,sharp,dull,blunt,hit,strike,punch,kick,push,pull,drag,carry,lift,hold,catch,throw,toss,spin,turn,twist,bend,fold,crease,flat,smooth,rough,bump,hole,gap,space,void,abyss,deep,shallow,surface,edge,center,middle,side,left,right,up,down,north,south,east,west,direction,path,road,street,trail,track,walk,sprint,jog,crawl,creep,slide,slip,trip,stand,sit,wait,go,start,finish,end,begin,first,last,next,previous,before,after,early,late,when,where,why,how,who,what,which,this,that,these,those,it,they,them,we,us,you,me,I,my,mine,yours,theirs,ours,some,all,none,many,few,much,less,more,most,least,big,small,large,tiny,huge,giant,micro,macro,scale,size,measure,length,width,height,depth,volume,mass,density,solid,liquid,gas,plasma,state,change,shift,move,still,calm,storm,wind,rain,snow,ice,cloud,sky,sun,moon,star,planet,universe,world,earth,ground,rock,stone,sand,metal,iron,steel,gold,silver,copper,wood,tree,forest,jungle,desert,ocean,sea,lake,river,stream,element,nature,city,town,village,building,apartment,hall,gate,fence,roof,brick,paint,color,shade,tint,hue,bright,dim,glow,shine,flash,spark,flame,smoke,melt,chill,shiver,shake,quake,tremble,vibrate,beat,rhythm,sound,note,music,song,sing,voice,echo,silence,hush,watch,stare,glare,blink,wink,tear,cry,weep,sob,laugh,smile,grin,frown,angry,sad,happy,joy,fear,scared,terror,horror,panic,dread,peace,anger,rage,fury,mad,crazy,insane,sane,think,know,learn,study,read,write,book,page,word,letter,number,math,count,add,subtract,multiply,divide,equal,sum,total,part,whole,piece,slice,smash,crash,destroy,build,make,create,form,design,art,draw,picture,image,photo,camera,lens,focus,blur,clear,server,domain,network,wave,transmit,receive,broadcast,channel,station,radio,antenna,radar,sonar,scope,monitor,display,pixel,byte,data,file,folder,directory,system,error,fault,bug,virus,infection,symptom,cure,medicine,pill,drug,dose,inject,syringe,artery,muscle,flesh,tissue,cell,gene,dna,born,die,death,life,live,survive,perish,rot,spoil,ruin,waste,trash,garbage,scrap,dustbin,cinder,ember,coal,fuel,gasoline,oil,grease,slick,glide,friction,rub,scrape,scratch,itch,tickle,pinch,squeeze,press,crush,grind,mill,powder,grain,seed,spore,pollen,flower,bloom,petal,thorn,bush,shrub,vine,weed,grass,lawn,meadow,field,farm,crop,harvest,gather,collect,hoard,save,spend,buy,sell,trade,barter,value,price,cost,cheap,dear,rich,poor,wealth,money,coin,bill,bank,store,shop,market,goods,wares,item,thing,object,tool,weapon,gun,bow,arrow,shield,armor,helmet,suit,clothes,shirt,pants,shoe,boot,glove,hat,coat,dress,skirt,fabric,cloth,silk,cotton,wool,leather,skin,fur,hair,feather,scale,shell,horn,claw,fang,beak,wing,tail,fin,web,nest,hive,den,cave,burrow,pit,trench,ditch,canal,pipe,tube,hose,pump,valve,seal,gasket,joint,hinge,lock,key,knob,handle,lever,switch,button,dial,gauge,meter,ruler,compass,map,chart,graph,line,point,dot,curve,angle,corner,border,limit,bound,range,area,zone,region,sector,district,county,nation,country,guard,patrol,police,law,rule,order,chaos,mess,tidy,neat,filthy,pure,foul,sweet,sour,bitter,salt,spicy,bland,taste,smell,odor,scent,perfume,stink,reek";
const words = wordBankString.split(",");

const sentences = [
    "I am here.", "Behind you.", "Too loud.", "Look closely.", 
    "It is cold.", "Can you see?", "Do not leave.", "We are waiting.",
    "System glitch.", "Measurement anomaly.", "Frequency shifting.",
    "I remember.", "Check the pulse.", "Signal intercepted.",
    "Root decay detected.", "Specimen contaminated."
];

// --- HTML ELEMENTS ---
const startBtn = document.getElementById('start-btn');
const startupScreen = document.getElementById('startup-screen');
const terminalContainer = document.getElementById('terminal-container');
const chatFeed = document.getElementById('chat-feed');
const userInput = document.getElementById('user-text');
const sendBtn = document.getElementById('send-btn');
const audioStatus = document.getElementById('audio-status');
const fluxStatus = document.getElementById('flux-status');
const sysStatus = document.getElementById('sys-status');

// --- STATE & CALIBRATION VARIABLES ---
let isCalibrating = false;
let isActive = false;
let cooldown = false; 

let audioBaseline = 0;
let fluxBaseline = 0;
let calibAudioSamples = [];
let calibFluxSamples = [];

const AUDIO_THRESHOLD = 25; 
const FLUX_THRESHOLD = 20; // Harder EMF spike required

// --- UI FUNCTIONS ---
function printToFeed(sender, text, cssClass) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> ${text}`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight; 
}

// Typing effect for Entity
async function typeToFeed(sender, text, cssClass) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    
    li.innerHTML = `[${time}] <span class="receiving">[RECEIVING SIGNAL...]</span>`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight;

    await new Promise(r => setTimeout(r, 1200));

    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> <span class="typing-text"></span>`;
    const textSpan = li.querySelector('.typing-text');

    for (let i = 0; i < text.length; i++) {
        textSpan.innerHTML += text.charAt(i);
        chatFeed.scrollTop = chatFeed.scrollHeight;
        await new Promise(r => setTimeout(r, 80)); 
    }
}

// User Input
function handleUserSend() {
    const text = userInput.value.trim();
    if (text !== "") {
        printToFeed("USER", text, "user");
        userInput.value = "";
    }
}
sendBtn.addEventListener('click', handleUserSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserSend(); });

// Entity Trigger Logic
function triggerEntity(triggerSource) {
    if (cooldown || !isActive) return;
    cooldown = true;
    
    let responseText = "";
    if (Math.random() < 0.25) {
        responseText = sentences[Math.floor(Math.random() * sentences.length)];
    } else {
        const wordCount = Math.floor(Math.random() * 3) + 1;
        let chosenWords = [];
        for(let i = 0; i < wordCount; i++) {
            chosenWords.push(words[Math.floor(Math.random() * words.length)]);
        }
        responseText = chosenWords.join(" ");
    }

    typeToFeed("ENTITY", responseText.toUpperCase(), "entity");

    // Anti-Spam: 15 to 25 seconds cooldown
    setTimeout(() => { cooldown = false; }, Math.random() * 10000 + 15000);
}

// --- CALIBRATION LOGIC ---
async function runCalibration() {
    isCalibrating = true;
    printToFeed("SYS", "Calibrating environmental baselines. Please remain perfectly still and silent.", "system");
    sysStatus.innerText = "SYS: CALIBRATING";
    sysStatus.style.color = "#ffb6c1";

    await new Promise(r => setTimeout(r, 10000));

    if (calibAudioSamples.length > 0) {
        audioBaseline = calibAudioSamples.reduce((a, b) => a + b, 0) / calibAudioSamples.length;
    }
    if (calibFluxSamples.length > 0) {
        fluxBaseline = calibFluxSamples.reduce((a, b) => a + b, 0) / calibFluxSamples.length;
    }

    isCalibrating = false;
    isActive = true;
    sysStatus.innerText = "SYS: ONLINE";
    sysStatus.style.color = "#333";
    
    printToFeed("SYS", `Calibration complete. Base Audio: ${audioBaseline.toFixed(1)} | Base Flux: ${fluxBaseline.toFixed(1)}`, "system");
    printToFeed("SYS", "Monitoring for anomalies...", "system");
}

// --- SENSOR LOGIC ---
async function initAudioListener() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 256;
        microphone.connect(analyser);
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkVolume() {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) { sum += dataArray[i]; }
            let average = sum / dataArray.length;
            
            audioStatus.innerText = `AUDIO: ${Math.round(average)}`;

            if (isCalibrating) {
                calibAudioSamples.push(average);
            } else if (isActive && average > (audioBaseline + AUDIO_THRESHOLD)) {
                triggerEntity("AUDIO");
            }
            requestAnimationFrame(checkVolume);
        }
        checkVolume();
    } catch (err) {
        printToFeed("SYS", "Audio input denied.", "system");
    }
}

// EMF Simulation (Magnetometer)
let lastMagneticValue = 0;
function initMotionListener() {
    window.addEventListener('deviceorientationabsolute', (event) => {
        let magneticValue = event.alpha; 
        
        if (event.webkitCompassHeading) {
            magneticValue = event.webkitCompassHeading;
        }

        if (!magneticValue) return;

        let flux = Math.abs(magneticValue - lastMagneticValue);
        if (flux > 180) flux = 360 - flux; 

        fluxStatus.innerText = `EMF FLUX: ${flux.toFixed(2)}`;

        if (isCalibrating && lastMagneticValue !== 0) {
            calibFluxSamples.push(flux);
        } else if (isActive && flux > (fluxBaseline + FLUX_THRESHOLD) && lastMagneticValue !== 0) {
            triggerEntity("EMF");
        }

        lastMagneticValue = magneticValue;
    }, true);
}

// --- STARTUP LOGIC ---
startBtn.addEventListener('click', async () => {
    startupScreen.classList.add('hidden');
    terminalContainer.classList.remove('hidden');

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') { initMotionListener(); } 
            else { printToFeed("SYS", "Motion sensors denied.", "system"); }
        } catch (error) { console.error(error); }
    } else {
        initMotionListener();
    }

    initAudioListener();
    runCalibration();
});
