let gameName = 'Guess the word';
let footerEl = document.querySelector('footer');
let copySpan = document.createElement('span');
copySpan.appendChild(document.createTextNode(`Copyright \u00A9 ${new Date().getFullYear()} ${gameName}`));
footerEl.appendChild(copySpan);
let colors = document.querySelectorAll('.color');
let header = document.querySelector('.container');
let countercontainer = document.querySelector('.counter');
let footer = document.querySelector('footer');
const toggleBtn = document.querySelector('#theme-toggle');
const icon = toggleBtn.querySelector('i');
let control = document.querySelector('.control');
let inputs = document.querySelectorAll('input');
let timer = document.querySelector('#timer');
let noTimer = document.querySelector('#no-timer');
let play = document.querySelector('.play')
let root = document.documentElement;
function updateIcon(isDark) {
    root.style.setProperty('--primary', isDark ? '#f89d0a' : '#f7cf47');
    root.style.setProperty('--secondary', isDark ? '#a44705' : '#f9c073');
    root.style.setProperty('--color', isDark ? '#eee' : '#333');
    root.style.setProperty('--box-shadow', isDark ? '0 0 5px #333' : '0 0px 6px rgba(0,0,0,0.1)');
    root.style.setProperty('--background-color', isDark ? '#333' : '');
    document.querySelectorAll('.in-place').forEach(el => {
        el.style.background = isDark ? '#f89d0a' : '#f7cf47';
    });

    document.querySelectorAll('.not-place').forEach(el => {
        el.style.background = isDark ? '#a44705' : '#f9c073';
    });
    icon.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";
    document.body.style.background = isDark ? '#180f10' : '#eee';
    header.style.background = isDark ? '#333' : 'white';
}
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    updateIcon(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
let savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateIcon(true);
} else {
    updateIcon(false);
}

let numOfLatters = 6;
let numOfTries = 6;
let currentTry = 1;
let numOfHints = 2;
let currentWord = '';
let hintSpan = document.createElement('span');
hintSpan.appendChild(document.createTextNode(numOfHints));
document.querySelector('.hint').appendChild(hintSpan);
const hintBtn = document.querySelector('.hint');

const wordsDatabase = {
    easy: {
    "IPHONE": "Famous smartphone made by Apple\nأشهر موبايل في العالم بتاع شركة أبل",
    "TIKTOK": "Short video platform everyone uses\nمنصة فيديوهات قصيرة مشهورة جداً",
    "GOOGLE": "The most popular search engine\nأشهر محرك بحث في العالم (جوجل)",
    "PLAYER": "Someone who plays sports or games\nالشخص اللي بيلعب رياضة أو جيمز",
    "COFFEE": "A popular caffeinated morning drink\nمشروب الصبح المفضل عشان تفوق",
    "SOCCER": "The world's most popular sport\nكرة القدم، اللعبة الشعبية الأولى",
    "FRIEND": "A person you know well and like\nصديقك اللي بتحبه وبتقعد معاه",
    "SCHOOL": "A place where students go to learn\nالمدرسة اللي بنتعلم فيها",
    "BANANA": "A long yellow fruit monkeys love\nالفاكهة الصفراء اللي القرود بتحبها",
    "DRAGON": "A mythical creature that breathes fire\nالتنين الأسطوري اللي بيطلع نار",
    "GUITAR": "A musical instrument with strings\nآلة الجيتار اللي بنعزف عليها",
    "SMILEY": "A yellow icon that shows happiness\nالإيموجي الضاحك اللي بيعبر عن السعادة",
    "HAMMER": "A tool used to hit nails into wood\nالشاكوش اللي بنستخدمه لدق المسامير",
    "FLOWER": "A beautiful plant with a nice smell\nالوردة اللي ريحتها وشكلها حلو",
    "ORANGE": "A citrus fruit and a bright color\nالبرتقالة أو اللون البرتقالي",
    "DOCTOR": "A person who treats sick people\nالدكتور اللي بيعالج الناس التعبانة",
    "WINDOW": "You look through it to see outside\nالشباك اللي بنبص منه على الشارع",
    "ROCKET": "A vehicle used to travel to space\nالصاروخ اللي بيطلع للفضاء",
    "MARKET": "A place to buy groceries and goods\nالسوق أو الماركت اللي بنشتري منه",
    "BOTTLE": "A container for water or soda\nالازازة اللي بنحط فيها المية",
    "FUTURE": "The time that is yet to come\nالمستقبل اللي لسه جاي",
    "CAMERA": "A device used to take photos\nالكاميرا اللي بنصور بيها",
    "SUNDAY": "The day of the week after Saturday\nيوم الأحد",
    "MONDAY": "The second day of the work week\nيوم الاتنين",
    "FRIDAY": "The last day of the work week\nيوم الجمعة",
    "FATHER": "A male parent in a family\nالأب أو الوالد",
    "MOTHER": "A female parent in a family\nالأم أو الوالدة",
    "BRIDGE": "A structure built to cross water\nالكوبري اللي بنعدي من فوقه",
    "TARGET": "Something you aim at to hit\nالهدف اللي بننشن عليه",
    "POCKET": "Small bag sewn into your clothes\nجيب الهدوم اللي بنشيل فيه الحاجة",
    "PRINCE": "The son of a king or queen\nابن الملك (الأمير)",
    "TICKET": "Required to enter cinema or stadium\nتذكرة دخول السينما أو الاستاد",
    "YELLOW": "The color of the sun and lemons\nاللون الأصفر (لون الشمس والليمون)",
    "SILVER": "A shiny metal used for 2nd place\nمعدن الفضة بتاع المركز التاني",
    "GARDEN": "Area outside with grass and plants\nالحديقة اللي فيها زرع وخضرة",
    "DOLLAR": "The official currency of the USA\nالدولار، عملة أمريكا",
    "TOMATO": "A red fruit used in salads\nالطماطم الحمراء اللي في السلطة",
    "POTATO": "Vegetable used for French fries\nالبطاطس اللي بنحمرها",
    "KITTEN": "A name for a baby cat\nالقطة الصغننة (كِتِن)",
    "RABBIT": "Small animal with long ears\nالأرنب اللي ودانه طويلة",
    "CHERRY": "Small red fruit on top of cakes\nالكرز اللي بيكون فوق التورتة",
    "CHEESE": "Dairy product put on pizza\nالجبنة اللي بنحطها على البيتزا",
    "BUTTER": "Yellow fat used in baking\nالزبدة الصفراء اللي في الأكل",
    "CARROT": "Orange vegetable good for eyes\nالجزر اللي بيقوي النظر",
    "MONKEY": "Animal that swings from trees\nالقرد اللي بيتنطط على الشجر",
    "PLANET": "Earth is one of these in space\nكوكب زي الأرض في الفضاء",
    "ISLAND": "Land surrounded by water\nالجزيرة اللي المية حواليها",
    "CASTLE": "Large building where kings lived\nالقلعة الكبيرة بتاعة الملوك",
    "WINTER": "The coldest season of the year\nفصل الشتاء والبرد",
    "SUMMER": "The hottest season of the year\nفصل الصيف والحر",
    "FOREST": "Large area covered with trees\nالغابة اللي كلها شجر",
    "MUSEUM": "Place for historical objects\nالمتحف اللي فيه الآثار",
    "SQUARE": "Shape with four equal sides\nالمربع اللي أضلاعه قد بعض",
    "PENCIL": "Tool used for writing or drawing\nالقلم الرصاص اللي بنرسم بيه",
    "CLOUDY": "When the sky is full of clouds\nلما الجو يبقى مغيم وكله سحاب",
    "BASKET": "Container for fruits or laundry\nالسبت أو السلة",
    "BRANCH": "Part of a tree with leaves\nفرع الشجرة",
    "DONKEY": "Animal similar to a horse\nالحمار",
    "ENGINE": "The part that moves the car\nالموتور اللي بيمشي العربية",
    "FAMILY": "Group of related people\nالعيلة والقرايب",
    "FARMER": "Person who grows crops\nالفلاح اللي بيزرع الأرض",
    "FINGER": "Part of the hand used to touch\nصابع الإيد",
    "GROUND": "The surface we walk on\nالأرض اللي بنمشي عليها",
    "JACKET": "Worn to keep you warm\nالجاكيت اللي بيدفينا",
    "LADDER": "Used to reach high places\nالسلم اللي بنطلع عليه",
    "LETTER": "Message sent in an envelope\nالجواب اللي بنبعته في ظرف",
    "MIRROR": "Shows your reflection\nالمراية اللي بنشوف فيها نفسنا",
    "NAPKIN": "Used to wipe your mouth\nالمنديل اللي بنمسح بيه بوقنا",
    "NUMBER": "Like one, two, or three\nالرقم أو العدد",
    "OFFICE": "A place where people work\nالمكتب اللي بنشتغل فيه",
    "PARROT": "Bird that can mimic speech\nالببغاء اللي بيقلد الكلام",
    "PEOPLE": "Human beings in general\nالناس أو البشر",
    "PRISON": "Place where criminals go\nالسجن",
    "PUZZLE": "Game that tests your brain\nاللغز أو الفزورة",
    "REASON": "The cause of something\nالسبب أو الحجة",
    "RECIPE": "Instructions for cooking\nوصفة الأكلة أو الطبخة",
    "REPORT": "Document about a topic\nالتقرير المكتوب",
    "SAFETY": "Being safe from danger\nالأمان أو السلامة",
    "SECOND": "A small unit of time\nالثانية اللي بعد الدقيقة",
    "SHADOW": "Dark shape made by light\nالضِل بتاعك",
    "SISTER": "A female sibling\nالأخت",
    "STREET": "Road in a city or town\nالشارع اللي بنمشي فيه",
    "STRONG": "Having a lot of power\nشخص قوي وعنده عضلات",
    "TABLET": "A small touch computer\nالتابلت أو الجهاز اللوحي",
    "THINGS": "Objects in general\nحاجات أو أشياء",
    "THROAT": "Part of the neck for food\nالزور أو الحلق",
    "TOMATO": "Red fruit used in salad\nالطماطم الحمراء",
    "TONGUE": "Used for tasting food\nاللسان اللي بنضوق بيه",
    "ACTIVE": "Always moving or doing things\nشخص نشيط وحركي",
    "ADVICE": "Suggestions to help someone\nالنصيحة اللي بنقدمها",
    "AFRAID": "Feeling fear of something\nخايف أو مرعوب",
    "ANIMAL": "Living thing like a dog\nحيوان زي الكلب أو القطة",
    "ANSWER": "Response to a question\nالإجابة على السؤال",
    "APPEAR": "To come into view\nيظهر أو يبان",
    "AROUND": "On every side of something\nحول أو في كل مكان",
    "ARRIVE": "To reach a destination\nيوصل للمكان",
    "ARTIST": "Person who paints or draws\nالفنان أو الرسام",
    "ASLEEP": "In a state of sleep\nنايم ومش حاسس بحاجة",
    "ATTACK": "To try to hurt someone\nهجوم على حد",
    "AUGUST": "The eighth month of the year\nشهر تمانية (أغسطس)",
    "AUTUMN": "Season when leaves fall\nفصل الخريف",
    "BATTLE": "A fight between armies\nمعركة أو خناقة كبيرة",
    "BEAUTY": "Being very pleasing to see\nالجمال والحلاوة",
    "BEFORE": "Earlier than something else\nقبل كدة",
    "BEHIND": "In back of something\nورا الحاجة",
    "BELIEV": "Short for believe in something\nيصدق أو يؤمن بحاجة",
    "BETTER": "Of a higher quality\nأحسن أو أفضل",
    "BEYOND": "On the farther side\nوراء أو أبعد من",
    "BISHOP": "A high church official\nالأسقف (رتبة دينية)",
    "BORDER": "Line between two countries\nالحدود بين البلاد",
    "BRIGHT": "Filled with light\nمنور أو ساطع",
    "BROKEN": "Damaged or in pieces\nمكسور أو بايظ",
    "BUDGET": "A plan for your money\nالميزانية والمصاريف",
    "CANCER": "A disease or zodiac sign\nبرج السرطان أو مرض وحش",
    "CANVAS": "Cloth used for painting\nلوحة الرسم القماش",
    "CARBON": "Element found in life\nعنصر الكربون",
    "CAREER": "Your long-term job\nالمستقبل المهني أو الوظيفة",
    "CENTER": "The middle of something\nالمركز أو النص",
    "CHANCE": "A possibility to do something\nفرصة ممكن تحصل",
    "CHANGE": "To make something different\nيغير أو يبدل",
    "CHARGE": "To power up a battery\nيشحن الموبايل",
    "CHOICE": "Act of picking something\nاختيارك لحاجة معينة",
    "CHURCH": "Place for Christian worship\nالكنيسة",
    "CIRCLE": "A round shape like a ring\nالدائرة",
    "CLIENT": "Person using a service\nالعميل أو الزبون",
    "CLOSED": "Not open for business\nمقفول",
    "COLUMN": "Vertical pillar or list\nعمود في مبنى أو جدول",
    "COMBAT": "Fighting or fighting back\nقتال أو مواجهة",
    "COMEDY": "Something that makes you laugh\nكوميديا أو حاجة بتضحك",
    "COMMON": "Happening very often\nحاجة عادية ومنتشرة",
    "COOKIE": "A small sweet biscuit\nكوكيز أو بسكويت مسكر",
    "COPPER": "Metal used in wires\nمعدن النحاس",
    "CORNER": "Where two walls meet\nالناصية أو الركن",
    "COUPLE": "Two people together\nاتنين مع بعض أو زوجين",
    "COURSE": "A series of lessons\nكورس أو دورة تعليمية",
    "CREATE": "To make something new\nيبتكر أو يصنع حاجة",
    "CREDIT": "Money from a bank\nكريدت أو رصيد بنكي",
    "CRISIS": "A time of great danger\nأزمة أو مشكلة كبيرة",
    "CUSTOM": "A traditional way of acting\nعادة أو تقليد شعبي",
    "DAMAGE": "Harm caused to something\nضرر أو تلف",
    "DANGER": "Possibility of getting hurt\nخطر",
    "DECIDE": "To make a final choice\nيقرر",
    "DEGREE": "Unit for temperature\nالدرجة (حرارة أو علمية)",
    "DESIGN": "A plan for how it looks\nالتصميم أو شكل الحاجة",
    "DEVICE": "A tool or machine\nجهاز أو آلة",
    "DINNER": "The main meal at night\nالعشاء",
    "DIRECT": "Going in a straight line\nمباشر أو دغري",
    "DOBBYY": "Famous elf from Harry Potter\nدوبي، القزم الشهير في هاري بوتر",
    "DOMAIN": "An area of knowledge\nمجال أو نطاق",
    "DOUBLE": "Two times the amount\nدبل أو ضعف الكمية",
    "DRIVER": "Person who steers a car\nالسواق",
    "DURING": "While something is happening\nخلال أو أثناء",
    "EASILY": "With no effort at all\nبسهولة جداً",
    "EDITOR": "Person who changes videos\nالمحرر أو المونتير",
    "ENERGY": "Power to do work\nالطاقة والقوة",
    "ESCAPE": "To get away from somewhere\nيهرب من مكان",
},
    medium: {
    "GITHUB": "Where developers store their code\nموقع جيتهاب اللي المبرمجين بيرفعوا عليه شغلهم",
    "ADOBE ": "Famous company for design software\nشركة أدوبي الشهيرة ببرامج الفوتوشوب والديزاين",
    "GALAXY": "A huge system of stars like ours\nالمجرة اللي فيها ملايين النجوم والكواكب",
    "PYTHON": "Popular programming language for AI\nلغة برمجة مشهورة جداً في الذكاء الاصطناعي",
    "BROWSE": "To look through websites on internet\nيتصفح المواقع على الإنترنت",
    "SERVER": "A computer that stores website data\nالسيرفر اللي عليه بيانات المواقع",
    "ACTION": "Something done to achieve a goal\nحركة أو فعل عشان توصل لنتيجة",
    "UPDATE": "To bring something up to date\nتحديث البرنامج أو السيستم لآخر نسخة",
    "DELETE": "To remove something completely\nيمسح أو يحذف حاجة خالص",
    "STREAM": "Watch video live on the internet\nالبث المباشر أو الستريم على النت",
    "WIZARD": "A man with magical powers\nالساحر أو المشعوذ في الأساطير",
    "JUNGLE": "Wild forest with many animals\nالغابة أو الأدغال اللي فيها حيوانات مفترسة",
    "BRAZIL": "The country famous for football stars\nالبرازيل بلد الكورة والسامبا",
    "EUROPE": "Continent with France and Germany\nقارة أوروبا اللي فيها الدول المتقدمة",
    "CANADA": "Large country north of the USA\nدولة كندا اللي فوق أمريكا",
    "MEXICO": "Country famous for tacos and spicy food\nالمكسيك بلد التاكو والأكل الحراق",
    "NORWAY": "Nordic country famous for cold weather\nالنرويج بلد التلج والبرد",
    "RUSSIA": "The largest country in the world\nروسيا، أكبر دولة في المساحة",
    "POLAND": "European country, its capital is Warsaw\nدولة بولندا وعاصمتها وارسو",
    "TURKEY": "Country between Europe and Asia\nدولة تركيا اللي في قارتين",
    "LONDON": "The fog city and capital of UK\nمدينة الضباب وعاصمة بريطانيا",
    "ACTIVE": "Full of energy and moving a lot\nشخص نشيط وعنده طاقة دايماً",
    "OBJECT": "A material thing you can touch\nحاجة ملموسة أو جسم معين",
    "MEMORY": "Where your brain stores information\nالذاكرة اللي بنشيل فيها المعلومات",
    "DANGER": "The possibility of getting hurt\nالخطر أو التهديد بالأذى",
    "PUBLIC": "Open to everyone, not private\nحاجة عامة لكل الناس مش خاصة",
    "REPORT": "Document that gives information\nتقرير مكتوب عن موضوع معين",
    "SEARCH": "Looking carefully to find something\nالبحث أو التدوير على حاجة",
    "SELECT": "To choose the best option\nيختار أو يحدد حاجة معينة",
    "SILENT": "Making no noise at all\nساكت وهادي خالص",
    "SIMPLE": "Not difficult to understand\nحاجة بسيطة وسهلة الفهم",
    "SINGLE": "Only one or not married\nحاجة واحدة بس أو شخص أعزب",
    "SKILLS": "Things you are good at doing\nمهاراتك وشطارتك في حاجة معينة",
    "STABLE": "Fixed and not likely to change\nحاجة مستقرة ومش بتتهز",
    "STATUS": "The current state of something\nالحالة أو الوضع الحالي",
    "SYSTEM": "A set of parts working together\nالنظام أو السيستم اللي شغال",
    "THEORY": "An idea to explain something\nالنظرية اللي بتشرح الفكرة",
    "VICTORY": "Winning a game or a war\nالنصر والفوز في المنافسة",
    "ATTACK": "Using force against an enemy\nهجوم على العدو",
    "BATTLE": "A fight between two groups\nمعركة أو خناقة كبيرة",
    "BRIGHT": "Shining with a lot of light\nحاجة منورة أوي أو ذكية",
    "CREDIT": "Money you can use and pay later\nالكريدت أو الفلوس اللي بنستلفها",
    "DESIGN": "How something is planned to look\nالتصميم أو شكل الحاجة",
    "DETAIL": "A small part of something big\nالتفاصيل الصغيرة اللي في الموضوع",
    "DEVICE": "A machine like a phone or tablet\nجهاز أو آلة إلكترونية",
    "EFFECT": "The result of an action\nالتأثير أو النتيجة اللي حصلت",
    "EFFORT": "Trying hard to do something\nالمجهود والتعب عشان تخلص حاجة",
    "ENGINE": "The machine that powers a car\nالمحرك أو الموتور",
    "EXPERT": "Someone with a lot of knowledge\nخبير في مجاله وعارف كل حاجة",
    "FACTOR": "Something that helps produce a result\nعامل مؤثر في النتيجة",
    "FLIGHT": "A journey made by an airplane\nرحلة طيران",
    "GENTLE": "Kind and calm with others\nشخص رقيق وهادي في تعامله",
    "HEALTH": "Being free from illness\nالصحة والعافية",
    "HUNGRY": "Feeling the need for food\nجعان وعاوز يأكل",
    "IMPACT": "A strong effect or hit\nتأثير قوي أو صدمة",
    "INCOME": "The money you earn from work\nالدخل أو المرتب اللي بيدخلك",
    "ISLAND": "Land with water all around it\nالجزيرة اللي المية محاوطاها",
    "LATEST": "The most recent version\nأحدث حاجة نزلت (آخر إصدار)",
    "MANNER": "The way someone acts or speaks\nأسلوب أو طريقة التعامل",
    "MEDIUM": "In the middle, not small or large\nحاجة متوسطة في الحجم أو النوع",
    "METHOD": "A specific way of doing something\nطريقة أو أسلوب تنفيذ حاجة",
    "NATURE": "The world of plants and animals\nالطبيعة والجمال اللي حوالينا",
    "NOTICE": "To see or become aware of\nيلاحظ أو ياخد باله من حاجة",
    "OPTION": "A choice you can make\nاختيار متاح قدامك",
    "PARENT": "A mother or a father\nالوالد أو الوالدة",
    "PERIOD": "A specific length of time\nفترة زمنية معينة",
    "PHRASE": "A small group of words\nجملة أو عبارة قصيرة",
    "PLAYER": "Person who plays in a game\nاللاعب اللي في الجيم",
    "POLICE": "People who keep the city safe\nالشرطة اللي بتحمينا",
    "PROFIT": "Money gained from business\nالمكسب أو الربح من التجارة",
    "PROPER": "Right or correct for the situation\nحاجة مناسبة أو صحيحة",
    "RECORD": "Highest score ever achieved\nالرقم القياسي المكتوب",
    "REGION": "A specific area or part of country\nمنطقة أو إقليم معين",
    "REPAIR": "To fix something that is broken\nيصلح حاجة كانت بايظة",
    "RESULT": "What happens at the end\nالنتيجة النهائية",
    "REVIEW": "To look at and judge something\nمراجعة أو تقييم لحاجة",
    "SAFETY": "Being protected from danger\nالأمان والسلالمة",
    "SCREEN": "The part of TV where you see images\nالشاشة اللي بنشوف عليها",
    "SERIES": "A set of related TV shows\nمسلسل أو مجموعة حلقات",
    "SETTLE": "To solve a problem or live in place\nيستقر أو يحل مشكلة",
    "SIGNAL": "A sign that gives information\nالإشارة أو العلامة",
    "SOURCE": "The place where something starts\nالمصدر أو الأساس",
    "SPEECH": "A talk given to an audience\nخطاب أو كلمة قدام الناس",
    "SPIRIT": "The soul or energy of a person\nالروح أو الطاقة المعنوية",
    "SPREAD": "To open out over a wide area\nينتشر أو يتوزع في مكان",
    "SPRING": "The season when flowers bloom\nفصل الربيع",
    "SQUARE": "Shape with four equal sides\nالمربع",
    "STREET": "A public road in a city\nالشارع اللي بنمشي فيه",
    "STRESS": "Feeling of pressure or worry\nالضغط النفسي أو التوتر",
    "STRIKE": "To hit something or stop working\nيضرب أو يعمل إضراب",
    "STUDIO": "Place where artists or singers work\nالاستوديو بتاع التصوير أو التسجيل",
    "TARGET": "Something you are trying to hit\nالهدف اللي بتنشن عليه",
    "THREAT": "A warning of coming danger\nالتهديد بخطر قريب",
    "TRAVEL": "To go from one place to another\nالسفر والتنقل",
    "UNIQUE": "The only one of its kind\nحاجة فريدة من نوعها ومبتتكررش",
    "VALLEY": "Low land between mountains\nالوادي اللي بين الجبال",
    "VOLUME": "The amount of space or sound\nحجم الصوت أو المساحة",
    "WEALTH": "A large amount of money\nالثروة والفلوس الكتير",
    "WEIGHT": "How heavy someone or something is\nالوزن أو التقل",
    "WRITER": "Person who writes books or stories\nالكاتب أو المؤلف",
    "YELLOW": "The color of a lemon\nاللون الأصفر",
    "ABOARD": "On or into a ship or plane\nعلى متن السفينة أو الطيارة",
    "ADJUST": "To change something to fit better\nيظبط أو يعدل الحاجة عشان تناسبه",
    "ADVICE": "Guidance on what to do\nالنصيحة اللي حد بيدهالك",
    "AMOUNT": "How much of something there is\nكمية أو مقدار الحاجة",
    "ANIMAL": "Living thing that is not human\nحيوان",
    "ANSWER": "What you say to a question\nالإجابة",
    "APPEAR": "To start to be seen\nيظهر أو يبان",
    "AROUND": "On all sides of something\nحول أو حوالين",
    "ARRIVE": "To reach a place\nيوصل للمكان",
    "ARTIST": "Person who creates art\nالفنان",
    "ASPECT": "A particular part or feature\nجانب أو مظهر من الموضوع",
    "ASSIST": "To help someone do something\nيساعد أو يساند حد",
    "ATTEND": "To go to or be present at\nيحضر اجتماع أو مناسبة",
    "AUTHOR": "The writer of a book\nالمؤلف أو الكاتب",
    "BEAUTY": "Being pleasing to look at\nالجمال",
    "BEFORE": "Earlier in time\nقبل كدة",
    "BEHALF": "Representing someone else\nنيابة عن أو بالنيابة عن حد",
    "BEHIND": "At the back of something\nورا الحاجة",
    "BELONG": "To be the property of\nينتمي لـ أو ملك حد",
    "BEYOND": "On the further side of\nوراء أو أبعد من",
    "BOTTLE": "Container for liquids\nالزجاجة",
    "BOTTOM": "The lowest part of something\nالقاع أو الأسفل",
    "BRIDGE": "Path built over water\nالكوبري",
    "BROKEN": "In pieces or not working\nمكسور",
    "BUDGET": "Plan for spending money\nالميزانية",
    "CAMPUS": "The grounds of a university\nالحرم الجامعي",
    "CANCEL": "To stop something planned\nيلغي الموعد أو الطلب",
    "CANCER": "A serious illness\nمرض السرطان",
    "CANYON": "A deep valley with steep sides\nالمنحدر أو الوادي العميق",
    "CARBON": "A chemical element\nالكربون",
    "CASUAL": "Relaxed and not formal\nحاجة كاجوال أو غير رسمية",
    "CAUGHT": "Past tense of catch\nمسك أو قفش",
    "CENTER": "The middle part\nالمركز",
    "CHANCE": "A possibility\nفرصة",
    "CHANGE": "To make different\nتغيير",
    "CHARGE": "To ask for money as price\nتكلفة أو شحن",
    "CHOICE": "Act of choosing\nاختيار",
    "CHURCH": "Place for prayer\nالكنيسة",
    "CIRCLE": "A round shape\nالدائرة",
    "CLIENT": "Customer of a professional\nالعميل",
    "CLOSED": "Not open\nمغلق",
    "COFFEE": "A morning drink\nالقهوة",
    "COLUMN": "Vertical list or pillar\nالعمود",
    "COMMON": "Happening often\nشائع أو منتشر",
    "COMPLY": "To follow the rules\nيلتزم بالقوانين",
    "CORNER": "Where two lines meet\nالركن",
    "COSTLY": "Expensive\nغالي ومكلف",
    "COUNTY": "Area of a state\nالمقاطعة أو المحافظة",
    "COUPLE": "Two of something\nزوج أو اتنين",
    "CREATE": "To make something\nيصنع أو يبتكر",
    "CUSTOM": "A traditional habit\nعادة أو تقليد"
},
  hard: {
    "SYMBOL": "A sign that represents an idea\nالرمز أو العلامة اللي بتعبر عن فكرة أو معنى",
    "THEORY": "A set of ideas to explain something\nالنظرية اللي بتشرح ظاهرة أو فكرة علمية",
    "SOURCE": "The place where something begins\nالمصدر أو الأساس اللي بتطلع منه الحاجة",
    "STATUS": "The current condition of something\nالحالة أو الوضع الحالي لحاجة معينة",
    "RECENT": "Happening or starting a short time ago\nحاجة لسه حاصلة قريب أو حديثة",
    "SEVERE": "Something very intense or strict\nحاجة شديدة أو قاسية وصعبة جداً",
    "SELECT": "To choose carefully from a group\nيختار أو يحدد بدقة من وسط كذا حاجة",
    "STABLE": "Fixed and not likely to change\nحاجة مستقرة ومبتتغيرش بسهولة",
    "STAGES": "Steps in a process or development\nمراحل أو خطوات في عملية معينة",
    "SPIRIT": "The non-physical part of a person\nالروح أو الطاقة المعنوية للشخص",
    "STRUCK": "Past tense of hitting something hard\nاتخبط أو اتضرب بقوة",
    "SOUGHT": "Past tense of searching for something\nبحث أو دوّر على حاجة كان محتاجها",
    "SUBMIT": "To give something to be processed\nيسلم أو يقدم طلب أو بحث للمراجعة",
    "SUDDEN": "Happening quickly and unexpectedly\nحاجة حصلت فجأة ومن غير توقع",
    "SUFFER": "To experience something bad or painful\nبيعاني من حاجة أو بيمر بوقت صعب",
    "SUMMIT": "The highest point of a mountain\nقمة الجبل أو أعلى نقطة في الحاجة",
    "SURVEY": "A set of questions to gather data\nاستطلاع رأي أو مسح لجمع معلومات",
    "SWITCH": "To change from one thing to another\nيبدل أو يغير من وضع لوضع تاني",
    "THRONE": "The special chair for a king\nعرش الملك اللي بيقعد عليه",
    "THREAT": "A warning of potential danger\nالتهديد أو التحذير من خطر جاي",
    "TARGET": "An objective or result to achieve\nالهدف اللي بنسعى إننا نوصل له",
    "VALLEY": "Low land between hills or mountains\nالوادي اللي بيكون بين الجبال",
    "VOLUME": "The amount of space or sound level\nحجم الحاجة أو مستوى الصوت",
    "VISION": "The ability to see or plan future\nالرؤية أو القدرة على التخطيط للمستقبل",
    "VICTIM": "Person harmed as result of crime\nالضحية اللي وقع عليها الضرر",
    "WEALTH": "A large amount of money or assets\nالثروة والفلوس الكتير اللي عند حد",
    "WEIGHT": "How heavy something or someone is\nالوزن أو الثقل بتاع الحاجة",
    "WRITER": "A person who creates books or poems\nالكاتب أو المؤلف اللي بيكتب قصص",
    "WONDER": "To feel curiosity or surprise\nيتعجب أو يتساءل بخصوص حاجة",
    "YEARLY": "Happening once every single year\nحاجة سنوية بتحصل كل سنة مرة",
    "YELLOW": "A bright color like sun or lemon\nاللون الأصفر الساطع",
    "ABOARD": "On or into a ship, train, or plane\nعلى متن السفينة أو القطر أو الطيارة",
    "ABSENT": "Not present in a place or event\nغايب أو مش موجود في المكان",
    "ABSORB": "To take in liquid or information\nيمتص السوائل أو يستوعب المعلومات",
    "ACCENT": "A way of pronouncing a language\nاللهجة أو طريقة نطق الكلام",
    "ACCEPT": "To agree to receive something\nيقبل أو يوافق على حاجة معينة",
    "ACCESS": "The right or ability to enter\nالدخول أو الوصول لمكان أو معلومة",
    "ACCUSE": "To say someone did something bad\nيتهم حد إنه عمل حاجة غلط",
    "ADJUST": "To change something slightly to fit\nيظبط أو يعدل الحاجة عشان تناسبه",
    "ADVICE": "An opinion about what to do\nالنصيحة اللي بتتقدم لشخص محتاجها",
    "AGENCY": "A business that provides a service\nوكالة أو شركة بتقدم خدمات معينة",
    "AGENDA": "A list of items to be discussed\nجدول الأعمال أو المواضيع اللي هتتناقش",
    "ALMOST": "Very nearly but not completely\nتقريباً أو قرب يخلص بس لسه",
    "ALWAYS": "At all times or on all occasions\nدايماً وفي كل وقت",
    "AMOUNT": "A quantity of something\nالكمية أو المقدار بتاع الحاجة",
    "ANNUAL": "Occurring once every year\nحاجة سنوية بتحصل بانتظام",
    "ANSWER": "A spoken or written reaction\nالإجابة أو الرد على السؤال",
    "ANYONE": "Any person at all\nأي حد أو أي شخص مهما كان",
    "APPEAR": "To start to be seen or present\nيظهر أو يبان فجأة",
    "AROUND": "Located or living nearby\nحول أو في المنطقة اللي حواليك",
    "ARRIVE": "To reach a place at the end\nيوصل للمكان المقصود",
    "ARTIST": "A person who creates paintings\nالفنان أو الرسام اللي بيبدع",
    "ASPECT": "A particular part or feature\nجانب أو مظهر من مظاهر الموضوع",
    "ASSERT": "To state a fact confidently\nيؤكد أو يجزم بحقيقة معينة",
    "ASSESS": "To evaluate or judge something\nيقيم أو يدرس حالة الحاجة",
    "ASSIGN": "To give someone a specific task\nيكلف حد بمهمة أو شغلانة معينة",
    "ASSIST": "To help someone in their work\nيساعد أو يساند حد في اللي بيعمله",
    "ASSUME": "To think something is true\nيفترض أو يتوقع إن الحاجة دي صح",
    "ASSURE": "To tell someone confidently\nيؤكد لشخص أو يطمنه بخصوص حاجة",
    "ATTACK": "An aggressive act against enemy\nالهجوم على العدو بقوة",
    "ATTEND": "To be present at an event\nيحضر اجتماع أو حفلة أو مناسبة",
    "AUTHOR": "The writer of a book or report\nالمؤلف أو كاتب الكتاب",
    "BARELY": "Only just or almost not\nبالعافية أو يادوبك حصل",
    "BEAUTY": "A combination of qualities\nالجمال أو الحلاوة في الشكل والروح",
    "BECOME": "To begin to be something\nيصبح أو يتحول لحاجة تانية",
    "BEFORE": "During the period of time\nقبل كدة أو في وقت سابق",
    "BEHALF": "In the interest of someone\nبالنيابة عن أو لمصلحة حد تاني",
    "BEHAVE": "To act in a specified way\nيتصرف أو يسلك سلوك معين",
    "BEHIND": "At or to the far side of\nورا الحاجة أو في ضهرها",
    "BELIEF": "An acceptance that is true\nالاعتقاد أو الإيمان بصدق حاجة",
    "BELONG": "To be a member of a group\nينتمي لـ أو يكون جزء من مجموعة",
    "BENIGN": "Gentle and kindly; not harmful\nحاجة حميدة أو مش مؤذية وهادية",
    "BEYOND": "At or to the further side\nوراء أو أبعد من الحدود المعروفة",
    "BISHOP": "A senior member of the clergy\nالأسقف (رتبة دينية عالية)",
    "BORDER": "The edge or boundary of area\nالحدود اللي بين البلاد أو المناطق",
    "BOTTLE": "A container with a narrow neck\nالزجاجة اللي بنحط فيها سوايل",
    "BOTTOM": "The lowest point of something\nالقاع أو أوطى نقطة في الحاجة",
    "BRANCH": "A part of a tree or business\nفرع الشجرة أو فرع من شركة",
    "BREATH": "The air taken into the lungs\nالنفس اللي بنطلعه وندخله",
    "BRIDGE": "A path built over an obstacle\nالكوبري اللي بنعدي من فوقه",
    "BRIGHT": "Giving out or reflecting light\nمنور أوي أو شخص ذكي جداً",
    "BROKEN": "Damaged and no longer working\nحاجة مكسورة أو بايظة خالص",
    "BUDGET": "A financial plan for spending\nالميزانية أو خطة المصاريف",
    "BURDEN": "A heavy load or responsibility\nالعبء أو الحمل التقيل على الشخص",
    "BUREAU": "An office or department\nمكتب أو مصلحة حكومية معينة",
    "BUTTON": "A small disk on a garment\nالزرار اللي في القميص أو الجاكيت",
    "CAMERA": "Device for recording images\nالكاميرا اللي بنصور بيها",
    "CAMPUS": "The grounds of a university\nالحرم الجامعي اللي فيه الكليات",
    "CANCEL": "To decide that event won't happen\nيلغي الموعد أو المشوار",
    "CANCER": "A serious medical condition\nمرض السرطان أو برج السرطان",
    "CANDID": "Truthful and straightforward\nشخص صريح ودوغري في كلامه",
    "CANVAS": "Strong cloth used for painting\nلوحة القماش اللي الرسام بيلون عليها",
    "CANYON": "A deep gorge with a river\nالمنحدر أو الوادي العميق وسط الجبال",
    "CARBON": "A chemical element in all life\nعنصر الكربون الكيميائي المهم",
    "CAREER": "An occupation for a long period\nالمستقبل المهني أو الوظيفة الدايمة",
    "CASUAL": "Relaxed and unconcerned\nحاجة كاجوال أو غير رسمية وبسيطة",
    "CAUGHT": "Past tense of catching something\nمسك أو قفش الحاجة وهي طايرة",
    "CAVEAT": "A warning or specific condition\nتحذير أو شرط لازم تاخد بالك منه",
    "CENTER": "The middle point of something\nالمركز أو السنتر بتاع الحاجة",
    "CHANCE": "A possibility of something\nفرصة ممكن تحصل وممكن لا",
    "CHANGE": "To make or become different\nتغيير أو تبديل في الحال",
    "CHARGE": "To demand an amount as price\nتكلفة أو شحن للبطارية",
    "CHARITY": "Giving help to those in need\nالأعمال الخيرية ومساعدة المحتاجين",
    "CHOICE": "An act of selecting options\nالاختيار بين كذا حاجة متاحة",
    "CHURCH": "A building used for worship\nالكنيسة",
    "CIRCLE": "A perfectly round shape\nالدائرة",
    "CLIENT": "A person using services\nالعميل أو الزبون بتاع الشركة",
    "CLOSED": "Not open for business\nمقفول ومش شغال",
    "CLOSER": "A short distance away\nأقرب شوية من الأول",
    "COFFEE": "A popular caffeinated drink\nالقهوة المشروب المفضل للتركيز",
    "COLUMN": "A vertical pillar or list\nالعمود اللي شايل المبنى أو عمود جدول",
    "COMBAT": "Fighting between armed forces\nالقتال أو العراك المسلح",
    "COMEDY": "Entertainment that is funny\nالكوميديا أو الحاجات اللي بتضحك",
    "COMMIT": "To carry out a mistake or crime\nيرتكب غلطة أو يلتزم بمهمة",
    "COMMON": "Occurring or found often\nحاجة شائعة ومنتشرة بين الناس",
    "COMPLY": "To act in accordance with rules\nيلتزم أو ينفذ القوانين المطلوبة",
    "CONVEY": "To transport or communicate\nيوصل معلومة أو ينقل رسالة لحد",
    "COPPER": "A reddish-brown metal\nمعدن النحاس",
    "CORNER": "The place where two sides meet\nالركن أو الناصية",
    "COSTLY": "Costing a lot of money\nغالي ومكلف جداً",
    "COUNTY": "A political area of a country\nالمقاطعة أو المحافظة",
    "COUPLE": "Two people or things together\nزوج أو اتنين مع بعض",
    "COURSE": "A series of lectures or lessons\nكورس أو دورة تدريبية لتعلم حاجة",
    "CREATE": "To bring something into life\nيصنع أو يبدع حاجة مكنتش موجودة",
    "CREDIT": "The ability to borrow money\nالكريدت أو الرصيد البنكي",
    "CRISIS": "A time of intense difficulty\nالأزمة أو الورطة الكبيرة",
    "CRITIC": "Person who judges merits\nالناقد اللي بيقيم الأعمال الفنية",
    "CUSTOM": "A traditional way of behaving\nالعادة أو التقليد اللي بنعمله",
    "DAMAGE": "Physical harm caused to object\nالضرر أو التلف اللي حصل للحاجة",
    "DANGER": "The possibility of suffering\nالخطر أو التهديد بالأذى",
    "DEALER": "A person who buys and sells\nالتاجر أو البياع اللي بيتعامل في صنف",
    "DECIDE": "To make a final choice\nيقرر أو يحسم أمره",
    "DEGREE": "A unit of measurement\nالدرجة (حرارة أو شهادة علمية)",
    "DEMAND": "An insistent request for info\nالطلب أو الأمر بتنفيذ حاجة",
    "DESIGN": "A plan or drawing produced\nالتصميم أو الشكل الهندسي للحاجة",
    "DESIRE": "A strong feeling of wanting\nالرغبة أو الشوق الشديد لحاجة",
    "DETAIL": "An individual small item\nالتفاصيل الصغيرة اللي في الموضوع",
    "DEVICE": "A tool made for a purpose\nالجهاز أو الآلة الإلكترونية",
    "DIFFER": "To be unlike or dissimilar\nيختلف أو يكون غير الحاجة التانية",
    "DINNER": "The main meal of the day\nالعشاء",
    "DIRECT": "Moving in a straight line\nمباشر أو دغري من غير لف ودوران",
    "DOMAIN": "An area of territory or web\nالنطاق أو المجال (زي دومين المواقع)",
    "DOUBLE": "Two times the amount\nالضعف أو حاجة مكررة مرتين",
    "DRIVEN": "Operated or moved by something\nمدفوع بـ أو كان بيسوق العربية",
    "DRIVER": "A person who drives a vehicle\nالسواق",
    "DURING": "Throughout the course of time\nخلال أو في وقت حدوث الحاجة",
    "EASILY": "Without any great effort\nبسهولة ومن غير تعب خالص",
    "EDITOR": "Person who changes text or film\nالمحرر أو المونتير اللي بيعدل الشغل",
    "EFFECT": "A change which is a result\nالتأثير أو النتيجة اللي حصلت",
    "EFFORT": "A vigorous attempt to do task\nالمجهود والتعب المبذول",
}
};
let guessedLetters = [];
let correctLetters = [];
let wrongLetters = [];
let hintUsed = false;
let Diff;
let inputcontainer;
let btnAdd = document.querySelector('.btn-add');
function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;

    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '14px',
        fontFamily: 'sans-serif',
        zIndex: '1000',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        transition: 'opacity 0.5s ease'
    });


    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}
btnAdd.addEventListener('click', function() {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.42);
        display: flex; align-items: center; justify-content: center; z-index: 2000;
    `;

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.cssText = `
        backdrop-filter: blur(15px);
        padding: 20px; 
        width: 500px;
        max-width: 90%;
        text-align: center; 
        font-family: sans-serif;
        border-radius: 15px; 
        box-shadow: var(--box-shadow);
        background: rgba(255, 255, 255, 0.1);
    `;

    const title = document.createElement("h3");
    title.textContent = "Add New Word 📝";
    title.style.color = "var(--color)";
    modal.appendChild(title);

    const wordInput = document.createElement("input");
    wordInput.type = "text";
    wordInput.placeholder = "The word (6 letters)";
    wordInput.maxLength = 6;
    styleInput(wordInput);
    modal.appendChild(wordInput);

    const difficultyInput = document.createElement('input');
    difficultyInput.type = 'text';
    difficultyInput.placeholder = 'Difficulty (e: easy, m: medium, h: hard)';
    styleInput(difficultyInput);
    modal.appendChild(difficultyInput);

    const note = document.createElement("p");
    note.textContent = "⚠️ Note: Use '\n' to separate English and Arabic hints.";
    note.style.cssText = 'font-size:18px;color:var(--accent);font-weight:bold;';
    modal.appendChild(note);

    const example = document.createElement("p");
    example.textContent = "Example: Big House \n بيت كبير";
    example.style.cssText = 'font-size:18px;font-weight:bold;color:var(--color)';
    modal.appendChild(example);

    const hintInput = document.createElement("textarea");
    hintInput.placeholder = "hint here...";
    styleInput(hintInput);
    hintInput.style.height = "80px";
    hintInput.style.resize = "none";
    hintValue = hintInput.value.trim();
    modal.appendChild(hintInput);
    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.gap = "10px";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save Word";
    saveBtn.style.cssText = "flex: 2; background: var(--primary); color: #fff; border: none; padding: 10px; border-radius: 5px; cursor: pointer; font-weight: bold;";
 
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.cssText = "flex: 1; background: var(--accent); color: #fff; border: none; padding: 10px; border-radius: 5px; cursor: pointer;";

    btnContainer.appendChild(saveBtn);
    btnContainer.appendChild(cancelBtn);
    modal.appendChild(btnContainer);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    cancelBtn.onclick = () => overlay.remove();

   saveBtn.onclick = () => {
    let word = wordInput.value.trim().toUpperCase();
    let diffInput = difficultyInput.value.trim().toLowerCase();
    let hint = hintInput.value.trim();

    [wordInput, difficultyInput, hintInput].forEach(el => {
        el.classList.remove("co-wrong");
    });
    const wordRegex = /^[A-Z]{6}$/;
    if (!wordRegex.test(word)) {
        showToast("Word must be exactly 6 English letters!");
        wordInput.classList.add("wrong");
        return;
    }
let finalDiff = "";

if (diffInput === "easy" || diffInput === "e") finalDiff = "easy";
else if (diffInput === "medium" || diffInput === "m") finalDiff = "medium";
else if (diffInput === "hard" || diffInput === "h") finalDiff = "hard";

if (!finalDiff) {
    showToast("Difficulty must be: easy, medium, or hard (or e/m/h)");
    difficultyInput.classList.add("wrong");
    return;
}
    const hasEnglish = /[A-Za-z]/.test(hint);
    const hasArabic = /[\u0600-\u06FF]/.test(hint);
    const hasNewline = hint.includes(`\n`);

    if (!(hasEnglish && hasArabic && hasNewline) || !(hasEnglish || hasArabic)) {
        showToast("Hint must contain English + Arabic separated by new line if you want to use both AND must contain at least one of them[[Arabic] OR [English]]");
        hintInput.style.borderColor = "red";
        return;
    }

    
    let processedHint = hint.replace(/\\n/g, "\n");;

    if (typeof wordsDatabase !== 'undefined') {
        wordsDatabase[finalDiff][word] = processedHint;

        const MAX_WORDS = 2000;
        let savedWords = JSON.parse(localStorage.getItem('customWords')) || [];
        let existingIndex = savedWords.findIndex(entry => entry.word === word && entry.difficulty === finalDiff);
        if (existingIndex !== -1) {
            savedWords[existingIndex] = { word: word, hint: processedHint, difficulty: finalDiff };
        } else {
            if (savedWords.length >= MAX_WORDS) {
                savedWords.shift();
            }
            savedWords.push({ word: word, hint: processedHint, difficulty: finalDiff });
        }

        localStorage.setItem('customWords', JSON.stringify(savedWords));

        showToast(`Success: "${word}" added to ${finalDiff}! ✅`);
        let newWordEntry = document.createElement("p");
        newWordEntry.textContent = `${processedHint}`;
        newWordEntry.style.cssText = "color: var(--color); font-weight: bold;font-size: 1.2rem; margin-top: 10px;";
        document.querySelector(".info-about").appendChild(newWordEntry);
        overlay.remove();
    }
};

    function styleInput(el) {
        el.style.cssText = `
            width: 100%; padding: 12px; margin: 10px 0;
            border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box;
            background: rgba(255, 255, 255, 0.2); color: var(--color);
            outline: none;
        `;
    }
});
function genrateInput() {
    inputcontainer = document.querySelector('.input');
    for (let i = 1; i <= numOfTries; i++) {
        let createDiv = document.createElement('div');
        createDiv.classList.add(`try-${i}`);
        if (i !== 1) createDiv.classList.add('disabled');
        inputcontainer.appendChild(createDiv);
        for (let j = 0; j < numOfLatters; j++) {
            let createInput = document.createElement('input');
            createInput.setAttribute('maxlength', '1');
            createInput.id = `try-${i}-letter-${j + 1}`;
            if (i !== 1) createInput.disabled = true;
            createDiv.appendChild(createInput);
        }
    }
const allInputs = document.querySelectorAll('.input input');

allInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
        this.value = this.value.toUpperCase();
        if (this.value !== "" && allInputs[index + 1]) {
            if (!allInputs[index + 1].parentElement.classList.contains('disabled')) {
                allInputs[index + 1].focus();
            }
        }
    });
    input.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" && index < allInputs.length - 1) {
            if (!allInputs[index + 1].parentElement.classList.contains('disabled')) {
                allInputs[index + 1].focus();
            }
        }
        else if (e.key === "ArrowLeft" && index > 0) {
            if (!allInputs[index - 1].parentElement.classList.contains('disabled')) {
                allInputs[index - 1].focus();
            }
        } 
        else if (e.key === "Backspace") {
            if (this.value === "" && index > 0) {
                if (!allInputs[index - 1].parentElement.classList.contains('disabled')) {
                    allInputs[index - 1].focus();
                }
            }
        }
    });
});
}
window.onload = function () {
    genrateInput();
    loadCustomWordsFromStorage();
};

function loadCustomWordsFromStorage() {
    let savedWords = JSON.parse(localStorage.getItem('customWords')) || [];
    savedWords.forEach(entry => {
        if (
            entry.word && entry.hint && entry.difficulty &&
            wordsDatabase[entry.difficulty] !== undefined
        ) {
            wordsDatabase[entry.difficulty][entry.word] = entry.hint;
        }
    });
}
let timerInterval;
let counterArray = [];
let counterIndex = 0;
let counter = document.querySelector('.inputs-container');
function startMyTimer(seconds) {
    let counter = document.querySelector('.inputs-container');
    clearInterval(timerInterval);
    let timeLeft = seconds;
    timerInterval = setInterval(() => {
        counterArray.push(timeLeft);
        timeLeft--;
        counterIndex++;
        if (counter) counter.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            popfail();
        }
    }, 1000);
}
function startGame(withTimer) {
    function createPop() {
        let overlay = document.createElement("div");
        overlay.style.cssText = `
        position: fixed;
        inset:0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9998;
    `;

        let popup = document.createElement("div");
        popup.className = 'chosen-diff';
        popup.style.cssText = "z-index: 9999; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); backdrop-filter:blur(15px); padding:40px; border:1px solid #ddd; text-align:center; width:auto; font-family:Cairo, Arial; border-radius: 8px;";


    let title = document.createElement('h2');
    title.textContent = 'Choose difficulty';
    popup.appendChild(title);
    let esaybtn = document.createElement('button');
    esaybtn.textContent = 'Easy';
    esaybtn.id = 'easy';
    esaybtn.className = 'btn-dif';
    let mediumbtn = document.createElement('button');
    mediumbtn.textContent = 'Medium';
    mediumbtn.id = 'medium';
    mediumbtn.className = 'btn-dif';
    let hardbtn = document.createElement('button');
    hardbtn.textContent = 'Hard';
    hardbtn.id = 'hard';
    hardbtn.className = 'btn-dif';
    popup.appendChild(esaybtn);
    popup.appendChild(mediumbtn);
    popup.appendChild(hardbtn);
    let closen = document.createElement('span');
    closen.textContent = 'X';
    closen.id = 'close';
    closen.style.cssText = 'position:absolute; top:-10px; right:-10px; background:#9d0f19; color:white; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold;';
    popup.appendChild(closen);
    let choseLang = document.createElement('div');
    choseLang.className = 'lang-select';
    choseLang.style.cssText = 'position:absolute; top:10px; right:10px; background:#9d0f19; color:white; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold;';
    let icon = document.createElement('i');
    icon.className = 'fa-solid fa-language';
    icon.style.cssText = 'color:white;';
    choseLang.appendChild(icon);
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        document.body.style.overflow = "hidden";

        function removeAll() {
            popup.remove();
            overlay.remove();
            document.body.style.overflow = "auto";
        }
        let countercontainer = document.querySelector('.counter');
        const diffBtns = popup.querySelectorAll('.btn-dif');
        diffBtns.forEach(btn => {
            btn.onclick = function () {
                diffBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (inputcontainer.children[0]) {
                    inputcontainer.children[0].children[0].focus();
                }
                Diff = btn.id;
                hintBtn.addEventListener('click', handlehint);
                pickNewWord();
                if (withTimer) {
                    if (Diff === 'easy') startMyTimer(241);
                    else if (Diff === 'medium') startMyTimer(121);
                    else if (Diff === 'hard') startMyTimer(61);
                    countercontainer.style.display = 'block';

                }
                removeAll();
                play.style.display = 'none';
    ;

                let input = document.querySelectorAll('input')
                if (input.className !== 'disabled') {
                    input.forEach(input => input.style.pointerEvents = 'all');
                }
            };
            
        });
        let close = document.getElementById("close").onclick = removeAll;
        overlay.onclick = removeAll;
        if (close || overlay) {
            play.style.display = 'block';
        }

    }
    createPop();
}


noTimer.addEventListener('click', () => {
    startGame(false)
});

timer.addEventListener('click', () => {
    startGame(true);   
});
let input = document.createElement("div");
input.className = 'input-container';
input.style.cssText = `display: flex;
    display: flex;
    position: relative;
    border-radius: 15px;
    width: 500px;
    font-weight: bold;
    max-width: 100%;`;
    let userInput = document.createElement("input");
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('placeholder', 'your name');
    userInput.style.cssText = `
    border: 2px solid var(--primary);
    border-right: none;
    pointer-events: all;
    border-radius: 15px 0 0 15px;
    padding:20px;
    text-align:start;
    width: calc(100% - 130px);
    color: #333;
    
    ;
        `;
    input.appendChild(userInput);
    let submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.style.cssText =`    
    width: 130px;
    background-color: var(--primary);
    color:var(--color);
    padding: 10px 20px;
    border: 1px solid var(--primary);
    border-radius: 0 15px 15px 0;
    border-left: none;
    text-transform: uppercase;
    cursor: pointer;`;
    input.appendChild(submit);
function saveUser(user,time){
    let leaders = JSON.parse(localStorage.getItem('leaders')) || [];
    let result ={
       name:user.trim(),
        time:time
    }
    let userIndex = leaders.findIndex( user =>user.name === result.name);
    if(userIndex !== -1){
      if(result.time < leaders[userIndex].time){
        leaders[userIndex] = result.time;
      }
    }
    else{
      leaders.push(result);
    }
    leaders.sort((a,b) => a.time - b.time);
    leaders = leaders.slice(0,5);
    localStorage.setItem('leaders', JSON.stringify(leaders));

    }

let close = document.createElement("button");
close.appendChild(document.createTextNode("X"));
close.style.cssText = "position:absolute; top:-10px; right:-10px; background:#9d0f19; color:white; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold;";
function createWinPop() {
    let overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed; inset:0; background:rgba(0, 0, 0, 0.6); z-index:9998; backdrop-filter:blur(5px);";
    let winAudio = new Audio('mixkit-cheering-crowd-loud-whistle-610.mp3');
    winAudio.play();
    let popup = document.createElement("div");
    clearInterval(timerInterval);
    popup.className = 'win-popup';
    popup.style.cssText = "z-index:9999; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); backdrop-filter:blur(15px);width:500px;max-width: 90%; background:rgba(255,255,255,0.1); padding:40px; text-align:center; border-radius:15px; color:var(--color); border:1px solid var(--primary);";
    let winH2 = document.createElement('h2');
    let winIcon1 = document.createElement('i');
    winIcon1.className = 'fa-solid fa-trophy';
    winH2.appendChild(winIcon1);
    winH2.appendChild(document.createTextNode(' You Win! '));
    let winIcon2 = document.createElement('i');
    winIcon2.className = 'fa-solid fa-trophy';
    winH2.appendChild(winIcon2);
    popup.appendChild(winH2);
    let winP1 = document.createElement('p');
    winP1.appendChild(document.createTextNode('you get the word in:'));
    let winStrong1 = document.createElement('strong');
    winStrong1.style.cssText = 'color:var(--primary)';
    winStrong1.appendChild(document.createTextNode((counterIndex || '') + ' s'));
    winP1.appendChild(winStrong1);
    popup.appendChild(winP1);
    let winP2 = document.createElement('p');
    winP2.appendChild(document.createTextNode('The word was: '));
    let winStrong2 = document.createElement('strong');
    winStrong2.style.cssText = 'color:var(--primary)';
    winStrong2.appendChild(document.createTextNode(currentWord));
    winP2.appendChild(winStrong2);
    popup.appendChild(winP2);

 if(counterIndex){
       popup.appendChild(input);

 }
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    document.body.style.overflow = "hidden";
    popup.appendChild(close);
    function removeWin() {
        popup.remove();
        overlay.remove();
        document.body.style.overflow = "auto";
        location.reload();

    }
        submit.addEventListener("click", function () {
            if (userInput.value.trim() !== "") {
                saveUser(userInput.value.trim,counterIndex);
            }

    });
    overlay.addEventListener('click', removeWin);
    close.addEventListener('click', removeWin);
}
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.load-hidden');

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('load-show');
        }, index * 100);
    });
});

function pickNewWord() {
    let wordsArray = Object.keys(wordsDatabase[Diff]);
    currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    randomHint = wordsDatabase[Diff][currentWord];
    let hintText = document.querySelector('#hint-text');
    hintText.textContent = randomHint;
}
let failclose = document.createElement("button");
failclose.appendChild(document.createTextNode("X"));
failclose.style.cssText = "position:absolute; top:-10px; right:-10px; background:#9d0f19; color:white; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold;";
function popfail() {
    let overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed; inset:0; background:rgba(0, 0, 0, 0.6); z-index:9998; backdrop-filter:blur(5px);";
   let loseAudio = new Audio('universfield-game-over-deep-male-voice-clip-352695.mp3');
    loseAudio.play()
    let popup = document.createElement("div");
    popup.classList.add('fail-popup');
    popup.style.cssText = "z-index:9999; position:fixed;max-width:500px; top:50%; left:50%; transform:translate(-50%, -50%); backdrop-filter:blur(15px); background:rgba(255,255,255,0.1); padding:40px; text-align:center; border-radius:15px; color:var(--color); border:2px solid var(--accent);";
    let failH2 = document.createElement('h2');
    let failIcon1 = document.createElement('i');
    failIcon1.className = 'fa-solid fa-skull-crossbones';
    failH2.appendChild(failIcon1);
    failH2.appendChild(document.createTextNode(' Game Over! '));
    let failIcon2 = document.createElement('i');
    failIcon2.className = 'fa-solid fa-skull-crossbones';
    failH2.appendChild(failIcon2);
    popup.appendChild(failH2);
    let failP = document.createElement('p');
    failP.appendChild(document.createTextNode('The word was: '));
    let failStrong = document.createElement('strong');
    failStrong.style.cssText = 'color:var(--accent)';
    failStrong.appendChild(document.createTextNode(currentWord));
    failP.appendChild(failStrong);
    popup.appendChild(failP);
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    document.body.style.overflow = "hidden";
    popup.appendChild(failclose);
    function removeWin() {
        popup.remove();
        overlay.remove();
        document.body.style.overflow = "auto";
        location.reload();

    }
    overlay.addEventListener('click', removeWin);
    failclose.addEventListener('click', removeWin);
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuess);
function handleGuess() {
    const currentInputs = document.querySelectorAll(`.try-${currentTry} input`);
    let anyLetterEntered = false;
    currentInputs.forEach((input, index) => {
        const letter = input.value.toUpperCase();
        const correctLetter = currentWord[index];

if (letter !== "") {
            anyLetterEntered = true;
            input.classList.remove('in-place', 'not-place', 'co-wrong');

            if (letter === correctLetter) {
                input.classList.add('in-place');
            } else if (currentWord.includes(letter)) {
                input.classList.add('not-place');
            } else {
                input.classList.add('co-wrong');
            }
        }
    });

    if (!anyLetterEntered) return;

    let isAllCorrect = Array.from(currentInputs).every((inp, idx) => inp.value.toUpperCase() === currentWord[idx]);

    if (isAllCorrect) {
        createWinPop();
    } else {
        let isRowFull = Array.from(currentInputs).every(inp => inp.value !== "");
        if (isRowFull) {
            let oldRow = document.querySelector(`.try-${currentTry}`);
            oldRow.classList.add('disabled');
            oldRow.querySelectorAll('input').forEach(input => input.disabled = true);

            currentTry++;
            const nextRow = document.querySelector(`.try-${currentTry}`);
            if (nextRow) {
                clearInterval(timerInterval);
                nextRow.classList.remove('disabled');
                nextRow.querySelectorAll('input').forEach(input => input.disabled = false);
                nextRow.querySelectorAll('input')[0].focus();
       }
        else if (!nextRow ) {
        popfail();
}
        }
    }
}
const guessBtn = document.querySelector('.check');
function handlehint() {
    if (numOfHints > 0) {
        numOfHints--;
      hintBtn.textContent = `Hint ${numOfHints}`;
    }
        
        if (numOfHints === 0) {
            hintBtn.disabled = true;
        }

        const enableInput = document.querySelectorAll('input:not([disabled])');
        let emptyInputs = Array.from(enableInput).filter(input => input.value === "");
        
        if (emptyInputs.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyInputs.length);
            const randomInput = emptyInputs[randomIndex];
            const inputIndex = Array.from(enableInput).indexOf(randomInput);
            if (inputIndex !== -1) {
                randomInput.value = currentWord[inputIndex].toUpperCase();
                randomInput.classList.add('in-place');
                randomInput.disabled = true;
            }
        }
    }
  let currentTime = [] ;

function showIntro() {
    let overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed; inset:0; background:rgba(0,0,0,0.40); z-index:10000; display:flex; align-items:center; justify-content:center;";

    let box = document.createElement("div");
    box.classList.add("box");
    let header = document.createElement('h2');
    header.textContent = 'Welcome!';
    header.style.cssText = 'margin-top:0; color:var(--primary);font-weight:bold;';
    box.appendChild(header);
    let p = document.createElement('p');
    p.textContent = 'You have 6 tries to guess the correct word.';
    p.style.cssText = 'font-size:18px;font-weight:700;color:var(--color);';
    box.appendChild(p);
    let p2 = document.createElement('p');
    p2.textContent = 'Choose a difficulty level to start playing.';
    p2.style.cssText = 'color:var(--color);font-weight:bold;font-size:1rem;';
    box.appendChild(p2);
    let p3 = document.createElement('p');
    p3.textContent = 'Note: Once you complete a row, it will be locked and you cannot edit it. Check your letters carefully!';
    p3.style.cssText = 'color:var(--primary); font-weight:bold; font-size:1rem; margin-top:10px;';
    box.appendChild(p3);
    let btn = document.createElement('button');
    btn.id = 'close-intro';
    btn.textContent = 'Start Game';
    btn.style.cssText = 'color:var(--color);background:var(--primary); border:none; padding:12px 25px; cursor:pointer; font-weight:bold; border-radius:5px; font-size:16px; margin-top:10px;';
    box.appendChild(btn);

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    let infoClose = document.getElementById("close-intro");
    infoClose.onclick = () => overlay.remove();
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}
let leaderclose = document.createElement("button");
leaderclose.appendChild(document.createTextNode("X"));
leaderclose.style.cssText = "position:absolute; top:-10px; right:-10px; background:#9d0f19; color:white; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold;";
function leaderPOP() {
    let overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed; inset:0; background:rgba(0, 0, 0, 0.6); z-index:9998; backdrop-filter:blur(5px);";

    let leaders = JSON.parse(localStorage.getItem('leaders')) || [];
    let popup = document.createElement("div");
    popup.className = 'leader-popup';
    popup.style.cssText = "z-index:9999; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); backdrop-filter:blur(15px); background:rgba(255,255,255,0.1); padding:40px; text-align:center; border-radius:15px; color:var(--color); border:1px solid var(--primary);";

let leaderTitle = document.createElement('h2');
leaderTitle.appendChild(document.createTextNode('Leaderboard'));
leaderTitle.style.cssText = "  font-size: clamp(1.688rem, 2vw + 1rem, 2.063rem); font-weight:bold; color:var(--color);";
let iconTitle = document.createElement('i');
iconTitle.className = 'fa-solid fa-crown';
iconTitle.style.cssText = "color:var(--primary);";
leaderTitle.appendChild(iconTitle);
popup.appendChild(leaderTitle);
    let ul = document.createElement('ul');
    ul.style.cssText = "list-style:none; padding:0; margin:0;font-weight:bold;";

    if (leaders.length === 0) {
      let not = document.createElement('li');
      not.style.cssText = 'padding:10px; color:var(--accent);font-size: 25px;';
      not.textContent = 'No records yet!';
      let note = document.createElement('p');
note.style.cssText = ` 
    color: var(--primary); 
    padding: 10px; 
    font-size: 18px; 
    font-weight: bold;
    border-radius: 5px; 
    margin: 10px 0;
    border-left: 5px solid var(--primary);
    text-align: center;
    font-weight: bold;
`;
let inNote = document.createElement('i');
inNote.className = 'fa-solid fa-circle-info';
inNote.style.cssText = 'color:var(--primary);';
note.appendChild(inNote);
note.appendChild(document.createTextNode(' Note: Records are only saved when playing with the Timer!'));    
popup.appendChild(note);
      ul.appendChild(not);
    } else {
                    let catagory = document.createElement('li');
            catagory.className = 'player-catagory';
            catagory.style.borderBottom = '2px solid var(--primary)';
            let userRank = document.createElement('span');
            userRank.textContent=`Rank`
            catagory.appendChild(userRank);
            let userName = document.createElement('span');
            userName.textContent=`Name`
            catagory.appendChild(userName);
            let userTime = document.createElement('span');
            userTime.textContent=`Time`
            catagory.appendChild(userTime);
            ul.appendChild(catagory);

            
        leaders.forEach((entry, index) => {
            let li = document.createElement('li');

            li.className = 'player-row';
            let icon = document.createElement('i');
            icon.className = 'fa-solid fa-crown';
            icon.style.cssText = " margin-left:10px;";
            li.appendChild(icon);
            let rank = document.createElement('span');
            rank.className = 'rank';
            rank.appendChild(document.createTextNode(index + 1));
            li.appendChild(rank);
            let name = document.createElement('span');
            name.className = 'name';
            name.appendChild(document.createTextNode(entry.name));
            li.appendChild(name);
            let time = document.createElement('span');
            time.className = 'time';
            time.appendChild(document.createTextNode(entry.time + 's'));
            li.appendChild(time);
            ul.appendChild(li);
if (index === 0) {
        icon.style.color = 'var(--primary)';
    } else if (index === 1) {
     icon.style.color = '#C0C0C0';
    } else if (index === 2) {
       icon.style.color = '#CD7F32';
    } else {
       icon.style.display = 'none';
    }
    li.appendChild(icon);
});
    }

    popup.appendChild(ul);
    popup.appendChild(leaderclose);

    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    document.body.style.overflow = "hidden";

    function removeLeader() {
        popup.remove();
        overlay.remove();
        document.body.style.overflow = "auto";
    }
    overlay.addEventListener('click', removeLeader);
    leaderclose.addEventListener('click', removeLeader);
}

let leaderBtn = document.querySelector('.btn-leader');
leaderBtn.addEventListener('click', leaderPOP);
let gameInfo = document.querySelector('.game-info');

if (gameInfo) {
    gameInfo.addEventListener('click', showIntro);
}
