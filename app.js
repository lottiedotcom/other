// --- STRICT 500-WORD THEMED DICTIONARY ---
const wordBankString = "specimen,clinic,pulse,sterile,ward,wire,circuit,terminal,proxy,signal,static,noise,glitch,host,entity,cold,dark,behind,look,see,hide,energy,propagate,node,root,soil,monstera,decay,stem,water,vein,blood,bone,breath,freeze,burn,ash,dust,ghost,spirit,frequency,loud,quiet,whisper,scream,talk,listen,door,window,wall,floor,ceiling,house,room,home,mobile,clean,dirt,wash,glass,mirror,reflect,shadow,shape,figure,man,woman,child,boy,girl,tall,short,fast,slow,now,later,soon,never,always,time,clock,hour,minute,second,day,week,month,year,past,future,present,memory,forget,remember,mind,brain,thought,idea,dream,nightmare,awake,tired,exhausted,rest,bed,pillow,blanket,computer,screen,keyboard,mouse,phone,device,power,battery,charge,plug,cable,cord,connection,lost,found,seek,search,find,reveal,secret,truth,lie,false,true,real,fake,illusion,vision,sight,blind,eye,ear,deaf,mouth,mute,speak,tongue,tooth,bite,chew,swallow,drink,eat,hungry,thirsty,full,empty,heavy,light,weight,float,sink,drown,swim,fly,fall,drop,break,fix,repair,shatter,crack,split,join,bind,tie,knot,rope,string,thread,needle,sew,stitch,cut,knife,blade,sharp,dull,blunt,hit,strike,punch,kick,push,pull,drag,carry,lift,hold,catch,throw,toss,spin,turn,twist,bend,fold,crease,flat,smooth,rough,bump,hole,gap,space,void,abyss,deep,shallow,surface,edge,center,middle,side,left,right,up,down,north,south,east,west,direction,path,road,street,trail,track,walk,sprint,jog,crawl,creep,slide,slip,trip,stand,sit,wait,go,start,finish,end,begin,first,last,next,previous,before,after,early,late,when,where,why,how,who,what,which,this,that,these,those,it,they,them,we,us,you,me,I,my,mine,yours,theirs,ours,some,all,none,many,few,much,less,more,most,least,big,small,large,tiny,huge,giant,micro,macro,scale,size,measure,length,width,height,depth,volume,mass,density,solid,liquid,gas,plasma,state,change,shift,move,still,calm,storm,wind,rain,snow,ice,cloud,sky,sun,moon,star,planet,universe,world,earth,ground,rock,stone,sand,metal,iron,steel,gold,silver,copper,wood,tree,forest,jungle,desert,ocean,sea,lake,river,stream,element,nature,city,town,village,building,apartment,hall,gate,fence,roof,brick,paint,color,shade,tint,hue,bright,dim,glow,shine,flash,spark,flame,smoke,melt,chill,shiver,shake,quake,tremble,vibrate,beat,rhythm,sound,note,music,song,sing,voice,echo,silence,hush,watch,stare,glare,blink,wink,tear,cry,weep,sob,laugh,smile,grin,frown,angry,sad,happy,joy,fear,scared,terror,horror,panic,dread,peace,anger,rage,fury,mad,crazy,insane,sane,think,know,learn,study,read,write,book,page,word,letter,number,math,count,add,subtract,multiply,divide,equal,sum,total,part,whole,piece,slice,smash,crash,destroy,build,make,create,form,design,art,draw,picture,image,photo,camera,lens,focus,blur,clear,server,domain,network,wave,transmit,receive,broadcast,channel,station,radio,antenna,radar,sonar,scope,monitor,display,pixel,byte,data,file,folder,directory,system,error,fault,bug,virus,infection,symptom,cure,medicine,pill,drug,dose,inject,syringe,artery,muscle,flesh,tissue,cell,gene,dna,born,die,death,life,live,survive,perish,rot,spoil,ruin,waste,trash,garbage,scrap,dustbin,cinder,ember,coal,fuel,gasoline,oil,grease,slick,glide,friction,rub,scrape,scratch,itch,tickle,pinch,squeeze,press,crush,grind,mill,powder,grain,seed,spore,pollen,flower,bloom,petal,thorn,bush,shrub,vine,weed,grass,lawn,meadow,field,farm,crop,harvest,gather,collect,hoard,save,spend,buy,sell,trade,barter,value,price,cost,cheap,dear,rich,poor,wealth,money,coin,bill,bank,store,shop,market,goods,wares,item,thing,object,tool,weapon,gun,bow,arrow,shield,armor,helmet,suit,clothes,shirt,pants,shoe,boot,glove,hat,coat,dress,skirt,fabric,cloth,silk,cotton,wool,leather,skin,fur,hair,feather,scale,shell,horn,claw,fang,beak,wing,tail,fin,web,nest,hive,den,cave,burrow,pit,trench,ditch,canal,pipe,tube,hose,pump,valve,seal,gasket,joint,hinge,lock,key,knob,handle,lever,switch,button,dial,gauge,meter,ruler,compass,map,chart,graph,line,point,dot,curve,angle,corner,border,limit,bound,range,area,zone,region,sector,district,county,nation,country,guard,patrol,police,law,rule,order,chaos,mess,tidy,neat,filthy,pure,foul,sweet,sour,bitter,salt,spicy,bland,taste,smell,odor,scent,perfume,stink,reek";
const words = wordBankString.split(",");

// --- ELEMENTS ---
const startBtn = document.getElementById('start-btn');
const startupScreen = document.getElementById('startup-screen');
const terminalContainer = document.getElementById('terminal-container');
const chatFeed = document.getElementById('chat-feed');
const userInput = document.getElementById('user-text');
const sendBtn = document.getElementById('send-btn');
const targetHzDisplay = document.getElementById('target-hz');
const targetEmfDisplay = document.getElementById('target-emf');

// --- STATE VARIABLES ---
let isActive = false;
let isCooldown = false;
let linguisticSeed = 0;
let targetHz = 0;
let targetEmf = 0;

// Audio processing variables
let audioContext, analyser, microphone, dataArray;

// --- DIRECT OUTPUT ---
function printToFeed(sender, text, cssClass) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> ${text}`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight; 
}

// --- ANCHORING (SETTING THE TARGETS) ---
function handleUserSend() {
    const text = userInput.value.trim();
    if (text !== "") {
        printToFeed("USER", text, "user");
        userInput.value = "";
        
        // Create the mathematical seed from the text
        linguisticSeed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Calculate Target Audio Frequency (Range: 100Hz to 800Hz)
        targetHz = (linguisticSeed % 700) + 100;
        targetHzDisplay.innerText = `T-HZ: ${targetHz}`;

        // Calculate Target Magnetic Heading (Range: 0 to 359 degrees)
        targetEmf = linguisticSeed % 360;
        targetEmfDisplay.innerText = `T-EMF: ${targetEmf}°`;

        printToFeed("SYS", `Targets acquired. Sweeping for ${targetHz}Hz or ${targetEmf}°.`, "system");
    }
}

sendBtn.addEventListener('click', handleUserSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserSend(); });

function triggerEntity(source) {
    if (isCooldown || linguisticSeed === 0) return;
    isCooldown = true;

    // Word selection changes slightly based on which sensor triggered it
    let indexMod = source === "AUDIO" ? targetHz : targetEmf;
    let index = (linguisticSeed + indexMod + Math.floor(Math.random() * 100)) % words.length;
    
    printToFeed("ENTITY", words[index].toUpperCase(), "entity");

    // Clear targets and wait
    linguisticSeed = 0;
    targetHzDisplay.innerText = `T-HZ: --`;
    targetEmfDisplay.innerText = `T-EMF: --`;
    
    setTimeout(() => { isCooldown = false; }, 10000); // 10 second cooldown
}

// --- ENVIRONMENTAL SCANNERS ---

// 1. Audio Scanner
async function initAudioListener() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        
        analyser.fftSize = 1024; // High resolution frequency data
        microphone.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkFrequencies() {
            if (!isActive) return;
            analyser.getByteFrequencyData(dataArray);

            if (targetHz > 0 && !isCooldown) {
                // Find the loudest frequency currently in the room
                let maxVal = -1;
                let peakIndex = -1;
                for(let i = 0; i < dataArray.length; i++) {
                    if(dataArray[i] > maxVal) {
                        maxVal = dataArray[i];
                        peakIndex = i;
                    }
                }
                
                // Convert peak index back to actual Hz
                let dominantHz = Math.round(peakIndex * (audioContext.sampleRate / analyser.fftSize));

                // If the loudest room frequency naturally drifts within 15Hz of your target
                if (maxVal > 100 && Math.abs(dominantHz - targetHz) <= 15) {
                    triggerEntity("AUDIO");
                }
            }
            requestAnimationFrame(checkFrequencies);
        }
        checkFrequencies();
    } catch (err) {
        printToFeed("SYS", "Audio input denied. Hz targeting disabled.", "system");
    }
}

// 2. Magnetic Scanner
function initMotionListener() {
    window.addEventListener('deviceorientationabsolute', (event) => {
        if (!isActive || isCooldown || targetEmf === 0) return;

        let currentHeading = event.webkitCompassHeading || event.alpha;
        if (!currentHeading) return;

        // If the magnetic field aligns within 5 degrees of your target
        if (Math.abs(currentHeading - targetEmf) <= 5) {
            triggerEntity("EMF");
        }
    }, true);
}

// --- INITIALIZATION ---
startBtn.addEventListener('click', async () => {
    startupScreen.classList.add('hidden');
    terminalContainer.classList.remove('hidden');

    // iOS permissions for compass
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') { initMotionListener(); } 
            else { printToFeed("SYS", "Compass denied. EMF targeting disabled.", "system"); }
        } catch (error) { console.error(error); }
    } else {
        initMotionListener();
    }

    initAudioListener();
    isActive = true;
});
