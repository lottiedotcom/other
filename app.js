// --- DICTIONARY SETUP ---
// A dense string of 500+ words, compressed to save space. Includes everyday objects, medical/clinical terms, emotions, and random fragments.
const wordBankString = "yes,no,here,there,help,stop,run,hide,dark,light,red,blue,pink,white,wire,web,circuit,medical,clinic,specimen,circle,square,kitten,cat,brother,sleep,wake,biphasic,night,morning,plant,botany,monstera,rhaphidophora,soil,water,root,stem,leaf,alien,nine,lain,chobits,celeste,game,play,terminal,code,scan,ingredient,food,skin,mammal,blood,bone,heart,lung,breath,cold,hot,warm,freeze,burn,fire,ash,dust,ghost,spirit,entity,energy,frequency,static,noise,loud,quiet,whisper,scream,talk,listen,door,window,wall,floor,ceiling,house,room,home,mobile,yard,clean,dirt,wash,glass,mirror,reflect,shadow,shape,figure,man,woman,child,boy,girl,tall,short,fast,slow,now,later,soon,never,always,time,clock,hour,minute,second,day,week,month,year,past,future,present,memory,forget,remember,mind,brain,thought,idea,dream,nightmare,awake,tired,exhausted,rest,bed,pillow,blanket,chair,table,desk,computer,screen,keyboard,mouse,phone,device,power,battery,charge,plug,cable,cord,connection,lost,found,seek,search,find,hide,reveal,secret,truth,lie,false,true,real,fake,illusion,vision,sight,blind,eye,ear,deaf,mouth,mute,speak,tongue,tooth,bite,chew,swallow,drink,eat,hungry,thirsty,full,empty,heavy,light,weight,float,sink,drown,swim,fly,fall,drop,break,fix,repair,shatter,crack,split,join,bind,tie,knot,rope,string,thread,needle,sew,stitch,cut,knife,blade,sharp,dull,blunt,hit,strike,punch,kick,push,pull,drag,carry,lift,hold,drop,catch,throw,toss,spin,turn,twist,bend,fold,crease,flat,smooth,rough,bump,hole,gap,space,void,abyss,deep,shallow,surface,edge,center,middle,side,left,right,up,down,north,south,east,west,direction,path,road,street,trail,track,walk,run,sprint,jog,crawl,creep,slide,slip,trip,fall,stand,sit,lie,rest,wait,go,stop,start,finish,end,begin,first,last,next,previous,before,after,early,late,soon,now,then,when,where,why,how,who,what,which,this,that,these,those,it,they,them,we,us,you,me,I,my,mine,yours,theirs,ours,some,all,none,many,few,much,less,more,most,least,big,small,large,tiny,huge,giant,micro,macro,scale,size,measure,weight,length,width,height,depth,volume,mass,density,solid,liquid,gas,plasma,state,change,shift,move,still,calm,storm,wind,rain,snow,ice,cloud,sky,sun,moon,star,planet,space,universe,world,earth,ground,dirt,rock,stone,sand,metal,iron,steel,gold,silver,copper,wood,tree,forest,jungle,desert,ocean,sea,lake,river,stream,water,fire,earth,air,element,nature,city,town,village,building,house,apartment,room,hall,door,gate,fence,wall,roof,window,glass,brick,wood,paint,color,shade,tint,hue,bright,dark,dim,glow,shine,flash,spark,flame,fire,smoke,ash,burn,melt,freeze,chill,shiver,shake,quake,tremble,vibrate,pulse,beat,rhythm,sound,note,music,song,sing,voice,echo,silence,quiet,hush,mute,deaf,blind,sight,vision,look,see,watch,stare,glare,blink,wink,eye,tear,cry,weep,sob,laugh,smile,grin,frown,angry,sad,happy,joy,fear,scared,terror,horror,panic,dread,calm,peace,anger,rage,fury,mad,crazy,insane,sane,mind,brain,thought,think,know,learn,study,read,write,book,page,word,letter,number,math,count,add,subtract,multiply,divide,equal,sum,total,part,whole,piece,slice,cut,break,smash,crash,destroy,build,make,create,form,shape,design,art,draw,paint,picture,image,photo,camera,lens,focus,blur,clear,sharp,dull,bright,dim";
const words = wordBankString.split(",");

const sentences = [
    "I am here.", "Behind you.", "Too loud.", "Look closely.", 
    "It is cold.", "Can you see?", "Do not leave.", "We are waiting.",
    "System glitch.", "Measurement anomaly."
];

// --- HTML ELEMENTS ---
const startBtn = document.getElementById('start-btn');
const startupScreen = document.getElementById('startup-screen');
const terminalContainer = document.getElementById('terminal-container');
const chatFeed = document.getElementById('chat-feed');
const userInput = document.getElementById('user-text');
const sendBtn = document.getElementById('send-btn');
const audioStatus = document.getElementById('audio-status');
const motionStatus = document.getElementById('motion-status');

// --- STATE VARIABLES ---
let cooldown = false; // Prevents spamming output
let lastBeta = 0;     // Stores previous gyroscope tilt

// --- UI FUNCTIONS ---
function printToFeed(sender, text, cssClass) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> ${text}`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight; // Auto-scroll to bottom
}

// User typing logic
function handleUserSend() {
    const text = userInput.value.trim();
    if (text !== "") {
        printToFeed("USER", text, "user");
        userInput.value = "";
    }
}
sendBtn.addEventListener('click', handleUserSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserSend(); });

// Entity logic (generates mix of words and sentences)
function triggerEntity() {
    if (cooldown) return;
    cooldown = true;
    
    // 30% chance for a sentence, 70% chance for 1-3 random words
    let responseText = "";
    if (Math.random() < 0.3) {
        responseText = sentences[Math.floor(Math.random() * sentences.length)];
    } else {
        const wordCount = Math.floor(Math.random() * 3) + 1;
        let chosenWords = [];
        for(let i = 0; i < wordCount; i++) {
            chosenWords.push(words[Math.floor(Math.random() * words.length)]);
        }
        responseText = chosenWords.join(" ");
    }

    printToFeed("ENTITY", responseText.toUpperCase(), "entity");

    // Cooldown for 3 to 8 seconds so it doesn't spam
    setTimeout(() => { cooldown = false; }, Math.random() * 5000 + 3000);
}

// --- SENSOR LOGIC ---

// 1. Audio Level Monitoring (White Noise)
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

            // THRESHOLD TRIGGER: If ambient room volume spikes uncharacteristically
            if (average > 45) { // Adjust this threshold number based on your microphone
                triggerEntity();
            }
            requestAnimationFrame(checkVolume);
        }
        checkVolume();
    } catch (err) {
        printToFeed("SYS", "Audio input denied or unavailable.", "system");
    }
}

// 2. Gyroscope Anomaly Monitoring
function initMotionListener() {
    window.addEventListener('deviceorientation', (event) => {
        if (!event.beta) return; // Ignore if no data
        
        motionStatus.innerText = `MOTION: ${Math.round(event.beta)}`;

        // THRESHOLD TRIGGER: If the phone detects a sudden, unnatural physical tilt/shift
        const difference = Math.abs(event.beta - lastBeta);
        if (difference > 15 && lastBeta !== 0) { // Adjust sensitivity here
            triggerEntity();
        }
        lastBeta = event.beta;
    });
}

// --- STARTUP LOGIC ---
startBtn.addEventListener('click', async () => {
    startupScreen.classList.add('hidden');
    terminalContainer.classList.remove('hidden');

    // iOS 13+ requires explicit permission for device orientation
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') {
                initMotionListener();
            } else {
                printToFeed("SYS", "Motion sensors denied.", "system");
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        // Non-iOS or older devices
        initMotionListener();
    }

    // Initialize microphone
    initAudioListener();
    printToFeed("SYS", "Sensors active. White noise baseline established.", "system");
});
