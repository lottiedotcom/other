// Strict 500-Word Themed Dictionary
const wordBankString = "specimen,clinic,pulse,sterile,ward,wire,circuit,terminal,proxy,signal,static,noise,glitch,host,entity,cold,dark,behind,look,see,hide,energy,propagate,node,root,soil,monstera,decay,stem,water,vein,blood,bone,breath,freeze,burn,ash,dust,ghost,spirit,frequency,loud,quiet,whisper,scream,talk,listen,door,window,wall,floor,ceiling,house,room,home,mobile,clean,dirt,wash,glass,mirror,reflect,shadow,shape,figure,man,woman,child,boy,girl,tall,short,fast,slow,now,later,soon,never,always,time,clock,hour,minute,second,day,week,month,year,past,future,present,memory,forget,remember,mind,brain,thought,idea,dream,nightmare,awake,tired,exhausted,rest,bed,pillow,blanket,computer,screen,keyboard,mouse,phone,device,power,battery,charge,plug,cable,cord,connection,lost,found,seek,search,find,reveal,secret,truth,lie,false,true,real,fake,illusion,vision,sight,blind,eye,ear,deaf,mouth,mute,speak,tongue,tooth,bite,chew,swallow,drink,eat,hungry,thirsty,full,empty,heavy,light,weight,float,sink,drown,swim,fly,fall,drop,break,fix,repair,shatter,crack,split,join,bind,tie,knot,rope,string,thread,needle,sew,stitch,cut,knife,blade,sharp,dull,blunt,hit,strike,punch,kick,push,pull,drag,carry,lift,hold,catch,throw,toss,spin,turn,twist,bend,fold,crease,flat,smooth,rough,bump,hole,gap,space,void,abyss,deep,shallow,surface,edge,center,middle,side,left,right,up,down,north,south,east,west,direction,path,road,street,trail,track,walk,sprint,jog,crawl,creep,slide,slip,trip,stand,sit,wait,go,start,finish,end,begin,first,last,next,previous,before,after,early,late,when,where,why,how,who,what,which,this,that,these,those,it,they,them,we,us,you,me,I,my,mine,yours,theirs,ours,some,all,none,many,few,much,less,more,most,least,big,small,large,tiny,huge,giant,micro,macro,scale,size,measure,length,width,height,depth,volume,mass,density,solid,liquid,gas,plasma,state,change,shift,move,still,calm,storm,wind,rain,snow,ice,cloud,sky,sun,moon,star,planet,universe,world,earth,ground,rock,stone,sand,metal,iron,steel,gold,silver,copper,wood,tree,forest,jungle,desert,ocean,sea,lake,river,stream,element,nature,city,town,village,building,apartment,hall,gate,fence,roof,brick,paint,color,shade,tint,hue,bright,dim,glow,shine,flash,spark,flame,smoke,melt,chill,shiver,shake,quake,tremble,vibrate,beat,rhythm,sound,note,music,song,sing,voice,echo,silence,hush,watch,stare,glare,blink,wink,tear,cry,weep,sob,laugh,smile,grin,frown,angry,sad,happy,joy,fear,scared,terror,horror,panic,dread,peace,anger,rage,fury,mad,crazy,insane,sane,think,know,learn,study,read,write,book,page,word,letter,number,math,count,add,subtract,multiply,divide,equal,sum,total,part,whole,piece,slice,smash,crash,destroy,build,make,create,form,design,art,draw,picture,image,photo,camera,lens,focus,blur,clear,server,domain,network,wave,transmit,receive,broadcast,channel,station,radio,antenna,radar,sonar,scope,monitor,display,pixel,byte,data,file,folder,directory,system,error,fault,bug,virus,infection,symptom,cure,medicine,pill,drug,dose,inject,syringe,artery,muscle,flesh,tissue,cell,gene,dna,born,die,death,life,live,survive,perish,rot,spoil,ruin,waste,trash,garbage,scrap,dustbin,cinder,ember,coal,fuel,gasoline,oil,grease,slick,glide,friction,rub,scrape,scratch,itch,tickle,pinch,squeeze,press,crush,grind,mill,powder,grain,seed,spore,pollen,flower,bloom,petal,thorn,bush,shrub,vine,weed,grass,lawn,meadow,field,farm,crop,harvest,gather,collect,hoard,save,spend,buy,sell,trade,barter,value,price,cost,cheap,dear,rich,poor,wealth,money,coin,bill,bank,store,shop,market,goods,wares,item,thing,object,tool,weapon,gun,bow,arrow,shield,armor,helmet,suit,clothes,shirt,pants,shoe,boot,glove,hat,coat,dress,skirt,fabric,cloth,silk,cotton,wool,leather,skin,fur,hair,feather,scale,shell,horn,claw,fang,beak,wing,tail,fin,web,nest,hive,den,cave,burrow,pit,trench,ditch,canal,pipe,tube,hose,pump,valve,seal,gasket,joint,hinge,lock,key,knob,handle,lever,switch,button,dial,gauge,meter,ruler,compass,map,chart,graph,line,point,dot,curve,angle,corner,border,limit,bound,range,area,zone,region,sector,district,county,nation,country,guard,patrol,police,law,rule,order,chaos,mess,tidy,neat,filthy,pure,foul,sweet,sour,bitter,salt,spicy,bland,taste,smell,odor,scent,perfume,stink,reek";
const words = wordBankString.split(",");

const startBtn = document.getElementById('start-btn');
const startupScreen = document.getElementById('startup-screen');
const terminalContainer = document.getElementById('terminal-container');
const chatFeed = document.getElementById('chat-feed');
const userInput = document.getElementById('user-text');
const sendBtn = document.getElementById('send-btn');

const canvas = document.getElementById('scrying-pool');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// --- CORE VARIABLES ---
let isActive = false;
let isListening = false;
let listenStartTime = 0;
let currentSeed = 0;

// --- DIRECT OUTPUT ---
function printToFeed(sender, text, cssClass) {
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString([], {hour12: false});
    li.innerHTML = `[${time}] <span class="${cssClass}">[${sender}]</span> ${text}`;
    chatFeed.appendChild(li);
    chatFeed.scrollTop = chatFeed.scrollHeight; 
}

// --- CALL AND RESPONSE ---
function handleUserSend() {
    const text = userInput.value.trim();
    if (text !== "") {
        printToFeed("USER", text, "user");
        userInput.value = "";
        
        currentSeed = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        isListening = true;
        listenStartTime = Date.now();
    }
}

sendBtn.addEventListener('click', handleUserSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserSend(); });

// --- SCRYING POOL (SHAPE DETECTION) ---
function runScryingPool() {
    if (!isActive) return requestAnimationFrame(runScryingPool);

    // Generate strict black and white static
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() < 0.5 ? 0 : 255;
        data[i] = val;     
        data[i+1] = val;   
        data[i+2] = val;   
        data[i+3] = 255;   
    }
    ctx.putImageData(imageData, 0, 0);

    // Only process shape locking if actively listening
    if (isListening) {
        // 60-second timeout window
        if (Date.now() - listenStartTime > 60000) {
            isListening = false;
        } else {
            // Check a central 16x16 block of pixels for density
            let darkPixelCount = 0;
            const checkArea = ctx.getImageData(24, 24, 16, 16).data;
            
            for (let i = 0; i < checkArea.length; i += 4) {
                if (checkArea[i] === 0) darkPixelCount++;
            }

            // If an unnatural cluster forms (e.g., over 85% of the block is pure black)
            if (darkPixelCount > (256 * 0.85)) {
                let index = (currentSeed + darkPixelCount + Math.floor(Math.random() * 500)) % words.length;
                printToFeed("ENTITY", words[index].toUpperCase(), "entity");
                isListening = false; // Close the channel until spoken to again
            }
        }
    }

    setTimeout(() => { requestAnimationFrame(runScryingPool); }, 50); // 20fps processing
}

// --- INITIALIZATION ---
startBtn.addEventListener('click', () => {
    startupScreen.classList.add('hidden');
    terminalContainer.classList.remove('hidden');
    isActive = true;
    requestAnimationFrame(runScryingPool);
});

