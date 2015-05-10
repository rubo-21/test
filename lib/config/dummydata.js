'use strict';

var mongoose = require('mongoose'),
  Word = mongoose.model('Word'),
  User = mongoose.model('User'),
  Counter = mongoose.model('Counter'),
  Story = mongoose.model('Story'),
  _ = require('lodash');

/**
 * Populate database with sample application data
 */


var wordsData = [
  {
    simplifiedChar: '我',
    traditionalChar: '我',
    //can be word, phrase, idiom or conversation
    category: 'word',
    heteronyms: [
      {
        pinyin: 'wǒ',
        definition: 'I',

        audioSrc: '我_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['你', '他', '爸']
      }
    ]
  },
  {
    simplifiedChar: '你',
    traditionalChar: '你',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'nǐ',
        definition: 'you (casual)',

        audioSrc: '你_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['我', '他', '是']
      }
    ]
  },
  {
    simplifiedChar: '男',
    traditionalChar: '男',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'nán',
        definition: 'male',

        audioSrc: '男_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['女', '妈', '爸']
      }
    ]
  },
  {
    simplifiedChar: '女',
    traditionalChar: '女',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'nǚ',
        definition: 'female',

        audioSrc: '女_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['大', '他', '男']
      }
    ]
  },
  {
    simplifiedChar: '一',
    traditionalChar: '一',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'yī',
        definition: 'one',

        audioSrc: '一_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['二', '三', '五']
      }
    ]
  },
  {
    simplifiedChar: '二',
    traditionalChar: '二',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'èr',
        definition: 'two',

        audioSrc: '二_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['一', '十', '七']
      }
    ]
  },
  {
    simplifiedChar: '三',
    traditionalChar: '三',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'sān',
        definition: 'three',

        audioSrc: '三_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['六', '八', '十']
      }
    ]
  },
  {
    simplifiedChar: '四',
    traditionalChar: '四',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'sì',
        definition: 'four',

        audioSrc: '四_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['一', '九', '三']
      }
    ]
  },
  {
    simplifiedChar: '五',
    traditionalChar: '五',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'wǔ',
        definition: 'five',

        audioSrc: '五_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['六', '二', '七']
      }
    ]
  },
  {
    simplifiedChar: '六',
    traditionalChar: '六',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'liù',
        definition: 'six',

        audioSrc: '六_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['一', '四', '九']
      }
    ]
  },
  {
    simplifiedChar: '七',
    traditionalChar: '七',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'qī',
        definition: 'seven',

        audioSrc: '七_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['十', '五', '三']
      }
    ]
  },
  {
    simplifiedChar: '八',
    traditionalChar: '八',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'bā',
        definition: 'eight',

        audioSrc: '八_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['七', '十', '二']
      }
    ]
  },
  {
    simplifiedChar: '九',
    traditionalChar: '九',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'jiǔ',
        definition: 'nine',

        audioSrc: '九_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['六', '一', '八']
      }
    ]
  },
  {
    simplifiedChar: '十',
    traditionalChar: '十',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'shí',
        definition: 'ten',

        audioSrc: '十_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['四', '六', '三']
      }
    ]
  },
  {
    simplifiedChar: '耳',
    traditionalChar: '耳',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'ěr',
        definition: 'ear',

        audioSrc: '耳_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['目', '头', '口']
      }
    ]
  },
  {
    simplifiedChar: '目',
    traditionalChar: '目',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'mù',
        definition: 'eye',

        audioSrc: '目_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['耳', '口', '手']
      }
    ]
  },
  {
    simplifiedChar: '口',
    traditionalChar: '口',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'kǒu',
        definition: 'mouth',

        audioSrc: '口_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['手', '耳', '头']
      }
    ]
  },
  {
    simplifiedChar: '手',
    traditionalChar: '手',
    category: 'word',
    heteronyms: [
      {
        pinyin: 'shǒu',
        definition: 'hand',

        audioSrc: '手_0',
        explainerImagesSrc: [],
        'questionsWordRecognition': ['口', '目', '耳']
      }
    ]
  },
  {
    "simplifiedChar":"大",
    "traditionalChar":"大",
    "category":"word",
    "heteronyms":[
      {
        "pinyin":"dà",
        "definition": "big",
        "audioSrc":"大_0",
        "explainerImagesSrc":[],
        'questionsWordRecognition': ['小', '他', '上']
      }
    ]
  },
  {"simplifiedChar":"小","traditionalChar":"小","category":"word","heteronyms":[{"pinyin":"xiǎo","definition":"small","audioSrc":"小_0","explainerImagesSrc":[], 'questionsWordRecognition': ['大', '上', '下']}]}
  , {"simplifiedChar":"回家","traditionalChar":"回家","category":"phrase","heteronyms":[{"pinyin":"huí jiā","definition":"to go home","audioSrc":"回家_0","explainerImagesSrc":[], 'questionsWordRecognition': ['白天', '太阳', '衣服']}]}
  , {"simplifiedChar":"白天","traditionalChar":"白天","category":"phrase","heteronyms":[{"pinyin":"bái tiān","definition":"day","audioSrc":"白天_0","explainerImagesSrc":[], 'questionsWordRecognition': ['黑夜', '天空', '白云']}]}
  , {"simplifiedChar":"黑","traditionalChar":"黑","category":"word","heteronyms":[{"pinyin":"hēi","definition":"black","audioSrc":"黑_0","explainerImagesSrc":['黑_0'], 'questionsWordRecognition': ['白', '橙', '红']}]}
  , {"simplifiedChar":"看","traditionalChar":"看","category":"word","heteronyms":[{"pinyin":"kàn","definition":"look","audioSrc":"看_0","explainerImagesSrc":[], 'questionsWordRecognition': ['见', '上', '下']}]}
  , {"simplifiedChar":"上","traditionalChar":"上","category":"word","heteronyms":[{"pinyin":"shàng","definition":"above","audioSrc":"上_0","explainerImagesSrc":[], 'questionsWordRecognition': ['下', '左', '右']}]}
  , {"simplifiedChar":"下","traditionalChar":"下","category":"word","heteronyms":[{"pinyin":"xià","definition":"below","audioSrc":"下_0","explainerImagesSrc":[], 'questionsWordRecognition': ['上', '来', '去']}]}
  , {"simplifiedChar":"左","traditionalChar":"左","category":"word","heteronyms":[{"pinyin":"zuǒ","definition":"left","audioSrc":"左_0","explainerImagesSrc":[], 'questionsWordRecognition': ['上', '拉', '右']}]}
  , {"simplifiedChar":"右","traditionalChar":"右","category":"word","heteronyms":[{"pinyin":"yòu","definition":"right","audioSrc":"右_0","explainerImagesSrc":[], 'questionsWordRecognition': ['哥', '下', '左']}]}
  , {"simplifiedChar":"头","traditionalChar":"頭","category":"word","heteronyms":[{"pinyin":"tóu","definition":"head","audioSrc":"头_0","explainerImagesSrc":[], 'questionsWordRecognition': ['耳', '口', '目']}]}
  , {"simplifiedChar":"耳朵","traditionalChar":"耳朵","category":"phrase","heteronyms":[{"pinyin":"ěr duo","definition":"ear","audioSrc":"耳朵_0","explainerImagesSrc":[], 'questionsWordRecognition': ['双手', '衣服', '白天']}]}
  , {"simplifiedChar":"红","traditionalChar":"紅","category":"word","heteronyms":[{"pinyin":"hóng","definition":"red","audioSrc":"红_0","explainerImagesSrc":[], 'questionsWordRecognition': ['黑', '白', '橙']}]}
  , {"simplifiedChar":"圆","traditionalChar":"圓","category":"word","heteronyms":[{"pinyin":"yuán","definition":"round","audioSrc":"圆_0","explainerImagesSrc":[], 'questionsWordRecognition': ['是', '来', '去']}]}
  , {"simplifiedChar":"是","traditionalChar":"是","category":"word","heteronyms":[{"pinyin":"shì","definition":"is, am","audioSrc":"是_0","explainerImagesSrc":[], 'questionsWordRecognition': ['来', '他', '这']}]}
  , {"simplifiedChar":"来","traditionalChar":"來","category":"word","heteronyms":[{"pinyin":"lái","definition":"to come","audioSrc":"来_0","explainerImagesSrc":[], 'questionsWordRecognition': ['去', '拉', '左']}]}
  , {"simplifiedChar":"去","traditionalChar":"去","category":"word","heteronyms":[{"pinyin":"qù","definition":"to go","audioSrc":"去_0","explainerImagesSrc":[], 'questionsWordRecognition': ['来', '大', '左']}]}
  , {"simplifiedChar":"天空","traditionalChar":"天空","category":"phrase","heteronyms":[{"pinyin":"tiān kōng","definition":"sky","audioSrc":"天空_0","explainerImagesSrc":['天空_0'], 'questionsWordRecognition': ['黑夜', '白云', '今天']}]}
  , {"simplifiedChar":"太阳","traditionalChar":"太陽","category":"phrase","heteronyms":[{"pinyin":"tài yáng","definition":"sun","audioSrc":"太阳_0","explainerImagesSrc":[], 'questionsWordRecognition': ['月亮', '白云', '可以']}]}
  , {"simplifiedChar":"白云","traditionalChar":"白雲","category":"phrase","heteronyms":[{"pinyin":"bái yún","definition":"white clouds","audioSrc":"白云_0","explainerImagesSrc":['白云_0'], 'questionsWordRecognition': ['天空', '黑夜', '白天']}]}
  , {"simplifiedChar":"月亮","traditionalChar":"月亮","category":"phrase","heteronyms":[{"pinyin":"yuè liàng","definition":"moon","audioSrc":"月亮_0","explainerImagesSrc":[], 'questionsWordRecognition': ['太阳', '白云', '尾巴']}]}
  , {"simplifiedChar":"他","traditionalChar":"他","category":"word","heteronyms":[{"pinyin":"tā","definition":"he","audioSrc":"他_0","explainerImagesSrc":[], 'questionsWordRecognition': ['你', '我', '左']}]}
  , {"simplifiedChar":"她","traditionalChar":"她","category":"word","heteronyms":[{"pinyin":"tā","definition":"she","audioSrc":"她_0","explainerImagesSrc":[], 'questionsWordRecognition': ['你', '我', '左']}]}
  , {"simplifiedChar":"爸","traditionalChar":"爸","category":"word","heteronyms":[{"pinyin":"bà","definition":"father","audioSrc":"爸_0","explainerImagesSrc":[], 'questionsWordRecognition': ['妈', '哥', '左']}]}
  , {"simplifiedChar":"妈","traditionalChar":"媽","category":"word","heteronyms":[{"pinyin":"mā","definition":"mother","audioSrc":"妈_0","explainerImagesSrc":[], 'questionsWordRecognition': ['爸', '下', '哥']}]}
  , {"simplifiedChar":"哥","traditionalChar":"哥","category":"word","heteronyms":[{"pinyin":"gē","definition":"elder brother","audioSrc":"哥_0","explainerImagesSrc":[], 'questionsWordRecognition': ['爸', '白', '妈']}]}
  , {"simplifiedChar":"白","traditionalChar":"白","category":"word","heteronyms":[{"pinyin":"bái","definition":"white","audioSrc":"白_0","explainerImagesSrc":['白_0'], 'questionsWordRecognition': ['红', '黑', '橙']}]}
  , {"simplifiedChar":"只","traditionalChar":"只","category":"word","heteronyms":[{"pinyin":"zhǐ","definition":"a measure word for objects likes animals, ships, etc","audioSrc":"只_0","explainerImagesSrc":[], 'questionsWordRecognition': ['用', '上', '是']}]}
  , {"simplifiedChar":"用","traditionalChar":"用","category":"word","heteronyms":[{"pinyin":"yòng","definition":"to use","audioSrc":"用_0","explainerImagesSrc":[], 'questionsWordRecognition': ['亮', '下', '头']}]}
  , {"simplifiedChar":"衣服","traditionalChar":"衣服","category":"phrase","heteronyms":[{"pinyin":"yī fu","definition":"clothes","audioSrc":"衣服_0","explainerImagesSrc":[], 'questionsWordRecognition': ['开心', '左边', '回家']}]}
  , {"simplifiedChar":"长","traditionalChar":"長","category":"word","heteronyms":[{"pinyin":"cháng","definition":"long","audioSrc":"长_0","explainerImagesSrc":[], 'questionsWordRecognition': ['件', '红', '来']}]}
  , {"simplifiedChar":"件","traditionalChar":"件","category":"word","heteronyms":[{"pinyin":"jiàn","definition":"a piece","audioSrc":"件_0","explainerImagesSrc":[], 'questionsWordRecognition': ['去', '左', '圆']}]}
  , {"simplifiedChar":"开心","traditionalChar":"開心","category":"phrase","heteronyms":[{"pinyin":"kāi xīn","definition":"happy","audioSrc":"开心_0","explainerImagesSrc":[], 'questionsWordRecognition': ['生气', '担心', '看见']}]}
  , {"simplifiedChar":"生气","traditionalChar":"生氣","category":"phrase","heteronyms":[{"pinyin":"shēng qì","definition":"angry","audioSrc":"生气_0","explainerImagesSrc":[], 'questionsWordRecognition': ['开心', '担心', '大声']}]}
  , {"simplifiedChar":"尾巴","traditionalChar":"尾巴","category":"phrase","heteronyms":[{"pinyin":"wěi ba","definition":"tail","audioSrc":"尾巴_0","explainerImagesSrc":[], 'questionsWordRecognition': ['嘴巴', '吐出', '安全']}]}
  , {"simplifiedChar":"拉","traditionalChar":"拉","category":"word","heteronyms":[{"pinyin":"lā","definition":"to pull","audioSrc":"拉_0","explainerImagesSrc":[], 'questionsWordRecognition': ['找', '跳', '这']}]}
  , {"simplifiedChar":"拉来拉去","traditionalChar":"拉來拉去","category":"idiom","heteronyms":[{"pinyin":"lā lái lā qù","definition":"to pull here and there","audioSrc":"拉来拉去_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"东张西望","traditionalChar":"東張西望","category":"idiom","heteronyms":[{"pinyin":"dōng zhāng xī wàng","definition":"to look around","audioSrc":"东张西望_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"大惊失色","traditionalChar":"大驚失色","category":"idiom","heteronyms":[{"pinyin":"dà jīng shī sè","definition":"to be very startled","audioSrc":"大惊失色_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"满头大汗","traditionalChar":"滿頭大汗","category":"idiom","heteronyms":[{"pinyin":"mǎn tóu dà hàn","definition":"to sweat profusely","audioSrc":"满头大汗_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"气喘吁吁","traditionalChar":"氣喘吁吁","category":"idiom","heteronyms":[{"pinyin":"qì chuǎn xū xū","definition":"to pant or breathe heavily","audioSrc":"气喘吁吁_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"异口同声","traditionalChar":"異口同聲","category":"idiom","heteronyms":[{"pinyin":"yì kǒu tóng shēng","definition":"when different people say the same thing","audioSrc":"异口同声_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"目瞪口呆","traditionalChar":"目瞪口呆","category":"idiom","heteronyms":[{"pinyin":"mù dèng kǒu dāi","definition":"to be dumbstruck or shocked","audioSrc":"目瞪口呆_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"黑夜","traditionalChar":"黑夜","category":"phrase","heteronyms":[{"pinyin":"hēi yè","definition":"night","audioSrc":"黑夜_0","explainerImagesSrc":[], 'questionsWordRecognition': ['白天', '坐下', '不仅']}]}
  , {"simplifiedChar":"找","traditionalChar":"找","category":"word","heteronyms":[{"pinyin":"zhǎo","definition":"to find","audioSrc":"找_0","explainerImagesSrc":[], 'questionsWordRecognition': ['跳', '拉', '去']}]}
  , {"simplifiedChar":"亮","traditionalChar":"亮","category":"word","heteronyms":[{"pinyin":"liàng","definition":"to glow","audioSrc":"亮_0","explainerImagesSrc":[], 'questionsWordRecognition': ['们', '不', '妈']}]}
  , {"simplifiedChar":"看见","traditionalChar":"看見","category":"phrase","heteronyms":[{"pinyin":"kàn jian","definition":"to see","audioSrc":"看见_0","explainerImagesSrc":[], 'questionsWordRecognition': ['偷看', '出现', '扫地']}]}
  , {"simplifiedChar":"左边","traditionalChar":"左邊","category":"phrase","heteronyms":[{"pinyin":"zuǒ biān","definition":"left side","audioSrc":"左边_0","explainerImagesSrc":[], 'questionsWordRecognition': ['右边', '大声', '小声']}]}
  , {"simplifiedChar":"右边","traditionalChar":"右邊","category":"phrase","heteronyms":[{"pinyin":"yòu biān","definition":"right side","audioSrc":"右边_0","explainerImagesSrc":[], 'questionsWordRecognition': ['左边', '分开', '双手']}]}
  , {"simplifiedChar":"大声","traditionalChar":"大聲","category":"phrase","heteronyms":[{"pinyin":"dà shēng","definition":"loudly","audioSrc":"大声_0","explainerImagesSrc":[], 'questionsWordRecognition': ['小声', '坐下', '大海']}]}
  , {"simplifiedChar":"小声","traditionalChar":"小聲","category":"phrase","heteronyms":[{"pinyin":"xiǎo shēng","definition":"softly","audioSrc":"小声_0","explainerImagesSrc":[], 'questionsWordRecognition': ['大声', '小船', '做事']}]}
  , {"simplifiedChar":"双手","traditionalChar":"雙手","category":"phrase","heteronyms":[{"pinyin":"shuāng shǒu","definition":"both hands","audioSrc":"双手_0","explainerImagesSrc":[], 'questionsWordRecognition': ['尾巴', '这里', '快乐']}]}
  , {"simplifiedChar":"分开","traditionalChar":"分開","category":"phrase","heteronyms":[{"pinyin":"fēn kāi","definition":"to separate or split","audioSrc":"分开_0","explainerImagesSrc":[], 'questionsWordRecognition': ['回家', '长大', '不仅']}]}
  , {"simplifiedChar":"坐下","traditionalChar":"坐下","category":"phrase","heteronyms":[{"pinyin":"zuò xià","definition":"to sit","audioSrc":"坐下_0","explainerImagesSrc":[], 'questionsWordRecognition': ['下雨', '出现', '看见']}]}
  , {"simplifiedChar":"走","traditionalChar":"走","category":"word","heteronyms":[{"pinyin":"zǒu","definition":"to walk","audioSrc":"走_0","explainerImagesSrc":[], 'questionsWordRecognition': ['跳', '拉', '去']}]}
  , {"simplifiedChar":"可以","traditionalChar":"可以","category":"phrase","heteronyms":[{"pinyin":"kě yǐ","definition":"can do, possible","audioSrc":"可以_0","explainerImagesSrc":[], 'questionsWordRecognition': ['不仅', '长大', '这里']}]}
  , {"simplifiedChar":"不仅","traditionalChar":"不僅","category":"phrase","heteronyms":[{"pinyin":"bù jǐn","definition":"not only (used as a connecting phrase)","audioSrc":"不仅_0","explainerImagesSrc":[], 'questionsWordRecognition': ['回家', '害怕', '吹向']}]}
  , {"simplifiedChar":"森林","traditionalChar":"森林","category":"phrase","heteronyms":[{"pinyin":"sēn lín","definition":"forest","audioSrc":"森林_0","explainerImagesSrc":[], 'questionsWordRecognition': ['坐下', '双手', '左边']}]}
  , {"simplifiedChar":"独一无二","traditionalChar":"獨一無二","category":"idiom","heteronyms":[{"pinyin":"dú yī wú èr","definition":"to be very unique","audioSrc":"独一无二_0","explainerImagesSrc":[]}]}
  , {"simplifiedChar":"这","traditionalChar":"這","category":"word","heteronyms":[{"pinyin":"zhè","definition":"this","audioSrc":"这_0","explainerImagesSrc":[], 'questionsWordRecognition': ['是', '我', '来']}]}
  , {"simplifiedChar":"里","traditionalChar":"裡","category":"word","heteronyms":[{"pinyin":"lǐ","definition":"here","audioSrc":"里_0","explainerImagesSrc":[], 'questionsWordRecognition': ['这', '拉', '是']}]}
  , {"simplifiedChar":"有","traditionalChar":"有","category":"word","heteronyms":[{"pinyin":"yǒu","definition":"have","audioSrc":"有_0","explainerImagesSrc":[], 'questionsWordRecognition': ['我', '你', '这']}]}
  , {"simplifiedChar":"们","traditionalChar":"們","category":"word","heteronyms":[{"pinyin":"mén","definition":"they (when used with 他)","audioSrc":"们_0","explainerImagesSrc":[], 'questionsWordRecognition': ['在', '他', '用']}]}
  , {"simplifiedChar":"坐","traditionalChar":"坐","category":"word","heteronyms":[{"pinyin":"zuò","definition":"to sit","audioSrc":"坐_0","explainerImagesSrc":[], 'questionsWordRecognition': ['跳', '走', '去']}]}
  , {"simplifiedChar":"不","traditionalChar":"不","category":"word","heteronyms":[{"pinyin":"bù","definition":"no","audioSrc":"不_0","explainerImagesSrc":[], 'questionsWordRecognition': ['哭', '小', '是']}]}
  , {"simplifiedChar":"在","traditionalChar":"在","category":"word","heteronyms":[{"pinyin":"zài","definition":"on","audioSrc":"在_0","explainerImagesSrc":[], 'questionsWordRecognition': ['里', '们', '这']}]}
  , {"simplifiedChar":"哭","traditionalChar":"哭","category":"word","heteronyms":[{"pinyin":"kū","definition":"to cry","audioSrc":"哭_0","explainerImagesSrc":[], 'questionsWordRecognition': ['吃', '找', '跳']}]}
  , {"simplifiedChar":"熊猫","traditionalChar":"熊貓","category":"phrase","heteronyms":[{"pinyin":"xióng māo","definition":"panda","audioSrc":"熊猫_0","explainerImagesSrc":[], 'questionsWordRecognition': ['西瓜', '苹果', '南瓜']}]}
  , {"simplifiedChar":"大海","traditionalChar":"大海","category":"phrase","heteronyms":[{"pinyin":"dà hǎi","definition":"sea","audioSrc":"大海_0","explainerImagesSrc":[], 'questionsWordRecognition': ['大声', '小船', '出现']}]}
  , {"simplifiedChar":"小船","traditionalChar":"小船","category":"phrase","heteronyms":[{"pinyin":"xiǎo chuán","definition":"small boat","audioSrc":"小船_0","explainerImagesSrc":[], 'questionsWordRecognition': ['小声', '大海', '淋湿']}]}
  , {"simplifiedChar":"出现","traditionalChar":"出現","category":"phrase","heteronyms":[{"pinyin":"chū xiàn","definition":"to appear","audioSrc":"出现_0","explainerImagesSrc":[], 'questionsWordRecognition': ['声音', '做事', '每年']}]}
  , {"simplifiedChar":"声音","traditionalChar":"聲音","category":"phrase","heteronyms":[{"pinyin":"shēng yīn","definition":"a sound or voice","audioSrc":"声音_0","explainerImagesSrc":[], 'questionsWordRecognition': ['大声', '小声', '蛋糕']}]}
  , {"simplifiedChar":"这里","traditionalChar":"這裡","category":"phrase","heteronyms":[{"pinyin":"zhè lǐ","definition":"here","audioSrc":"这里_0","explainerImagesSrc":[], 'questionsWordRecognition': ['左边', '喜欢', '宝石']}]}
  , {"simplifiedChar":"做事","traditionalChar":"做事","category":"phrase","heteronyms":[{"pinyin":"zuò shì","definition":"work","audioSrc":"做事_0","explainerImagesSrc":[], 'questionsWordRecognition': ['发抖', '努力', '面前']}]}
  , {"simplifiedChar":"扫地","traditionalChar":"掃地","category":"phrase","heteronyms":[{"pinyin":"sǎo dì","definition":"to sweep the floor","audioSrc":"扫地_0","explainerImagesSrc":[], 'questionsWordRecognition': ['煮饭', '安全', '坐下']}]}
  , {"simplifiedChar":"煮饭","traditionalChar":"煮飯","category":"phrase","heteronyms":[{"pinyin":"zhǔ fàn","definition":"to cook","audioSrc":"煮饭_0","explainerImagesSrc":[], 'questionsWordRecognition': ['扫地', '长大', '美丽']}]}
  , {"simplifiedChar":"洗","traditionalChar":"洗","category":"word","heteronyms":[{"pinyin":"xǐ","definition":"to wash","audioSrc":"洗_0","explainerImagesSrc":[], 'questionsWordRecognition': ['扔', '找', '捡']}]}
  , {"simplifiedChar":"日","traditionalChar":"日","category":"word","heteronyms":[{"pinyin":"rì","definition":"calendar (when paired as 日历)","audioSrc":"日_0","explainerImagesSrc":[], 'questionsWordRecognition': ['亮', '节', '爱']}]}
  , {"simplifiedChar":"历","traditionalChar":"歷","category":"word","heteronyms":[{"pinyin":"lì","definition":"calendar (when paired as 日历)","audioSrc":"历_0","explainerImagesSrc":[], 'questionsWordRecognition': ['亲', '节', '去']}]}
  , {"simplifiedChar":"母","traditionalChar":"母","category":"word","heteronyms":[{"pinyin":"mǔ","definition":"mother","audioSrc":"母_0","explainerImagesSrc":[], 'questionsWordRecognition': ['亲', '节', '妈']}]}
  , {"simplifiedChar":"亲","traditionalChar":"親","category":"word","heteronyms":[{"pinyin":"qīn","definition":"relative, mother (when paired as 母亲)","audioSrc":"亲_0","explainerImagesSrc":[], 'questionsWordRecognition': ['爸', '妈', '母']}]}
  , {"simplifiedChar":"节","traditionalChar":"節","category":"word","heteronyms":[{"pinyin":"jié","definition":"festival, mother's day (when paired as 母亲节)","audioSrc":"节_0","explainerImagesSrc":[], 'questionsWordRecognition': ['母', '亲', '去']}]}
  , {"simplifiedChar":"每年","traditionalChar":"每年","category":"phrase","heteronyms":[{"pinyin":"měi nián","definition":"every year","audioSrc":"每年_0","explainerImagesSrc":[], 'questionsWordRecognition': ['长大', '花朵', '蛋糕']}]}
  , {"simplifiedChar":"母亲","traditionalChar":"母親","category":"phrase","heteronyms":[{"pinyin":"mǔ qīn","definition":"mother","audioSrc":"母亲_0","explainerImagesSrc":[], 'questionsWordRecognition': ['左边', '这里', '扫地']}]}
  , {"simplifiedChar":"快乐","traditionalChar":"快樂","category":"phrase","heteronyms":[{"pinyin":"kuài lè","definition":"to be happy, can be used as a greeting when paired with an event (母亲节快乐)","audioSrc":"快乐_0","explainerImagesSrc":[], 'questionsWordRecognition': ['飞快', '沙发', '不仅']}]}
  , {"simplifiedChar":"长大","traditionalChar":"長大","category":"phrase","heteronyms":[{"pinyin":"zhǎng dà","definition":"to grow up","audioSrc":"长大_0","explainerImagesSrc":[], 'questionsWordRecognition': ['出现', '喜欢', '每年']}]}
  , {"simplifiedChar":"花朵","traditionalChar":"花朵","category":"phrase","heteronyms":[{"pinyin":"huā duǒ","definition":"flower","audioSrc":"花朵_0","explainerImagesSrc":[], 'questionsWordRecognition': ['苹果', '南瓜', '番茄']}]}
  , {"simplifiedChar":"蛋糕","traditionalChar":"蛋糕","category":"phrase","heteronyms":[{"pinyin":"dàn gāo","definition":"cake","audioSrc":"蛋糕_0","explainerImagesSrc":[], 'questionsWordRecognition': ['苹果', '南瓜', '西瓜']}]}
  , {"simplifiedChar":"爱","traditionalChar":"愛","category":"word","heteronyms":[{"pinyin":"ài","definition":"love","audioSrc":"爱_0","explainerImagesSrc":[], 'questionsWordRecognition': ['灯', '母', '灰']}]}
  , {"simplifiedChar":"都","traditionalChar":"都","category":"word","heteronyms":[{"pinyin":"dōu","definition":"when used with 什么..., implies a generalisation","audioSrc":"都_0","explainerImagesSrc":[], 'questionsWordRecognition': ['亲', '拉', '这']}]}
  , {"simplifiedChar":"今天","traditionalChar":"今天","category":"phrase","heteronyms":[{"pinyin":"jīn tiān","definition":"today","audioSrc":"今天_0","explainerImagesSrc":[], 'questionsWordRecognition': ['礼物', '美丽', '花盆']}]}
  , {"simplifiedChar":"礼物","traditionalChar":"禮物","category":"phrase","heteronyms":[{"pinyin":"lǐ wù","definition":"gift","audioSrc":"礼物_0","explainerImagesSrc":[], 'questionsWordRecognition': ['花盆', '美丽', '今天']}]}
  , {"simplifiedChar":"美丽","traditionalChar":"美麗","category":"phrase","heteronyms":[{"pinyin":"měi lì","definition":"pretty","audioSrc":"美丽_0","explainerImagesSrc":[], 'questionsWordRecognition': ['花朵', '母亲', '每年']}]}
  , {"simplifiedChar":"喜欢","traditionalChar":"喜歡","category":"phrase","heteronyms":[{"pinyin":"xǐ huān","definition":"to like","audioSrc":"喜欢_0","explainerImagesSrc":[], 'questionsWordRecognition': ['美丽', '宝石', '害怕']}]}
  , {"simplifiedChar":"宝石","traditionalChar":"寶石","category":"phrase","heteronyms":[{"pinyin":"bǎo shí","definition":"gem","audioSrc":"宝石_0","explainerImagesSrc":[], 'questionsWordRecognition': ['美丽', '飞快', '橙色']}]}
  , {"simplifiedChar":"沙发","traditionalChar":"沙發","category":"phrase","heteronyms":[{"pinyin":"shā fā","definition":"sofa","audioSrc":"沙发_0","explainerImagesSrc":[], 'questionsWordRecognition': ['花盆', '宝石', '灰尘']}]}
  , {"simplifiedChar":"花盆","traditionalChar":"花盆","category":"phrase","heteronyms":[{"pinyin":"huā pén","definition":"flower pot","audioSrc":"花盆_0","explainerImagesSrc":[], 'questionsWordRecognition': ['地图', '快乐', '母亲']}]}
  , {"simplifiedChar":"吹","traditionalChar":"吹","category":"word","heteronyms":[{"pinyin":"chuī","definition":"to blow","audioSrc":"吹_0","explainerImagesSrc":[], 'questionsWordRecognition': ['风', '吐', '吸']}]}
  , {"simplifiedChar":"灯","traditionalChar":"燈","category":"word","heteronyms":[{"pinyin":"dēng","definition":"lamp","audioSrc":"灯_0","explainerImagesSrc":[], 'questionsWordRecognition': ['晒', '雷', '耳']}]}
  , {"simplifiedChar":"灰","traditionalChar":"灰","category":"word","heteronyms":[{"pinyin":"huī","definition":"grey","audioSrc":"灰_0","explainerImagesSrc":[], 'questionsWordRecognition': ['左', '这', '目']}]}
  , {"simplifiedChar":"风","traditionalChar":"風","category":"word","heteronyms":[{"pinyin":"fēng","definition":"wind","audioSrc":"风_0","explainerImagesSrc":[], 'questionsWordRecognition': ['用', '口', '去']}]}
  , {"simplifiedChar":"东","traditionalChar":"東","category":"word","heteronyms":[{"pinyin":"dōng","definition":"east","audioSrc":"东_0","explainerImagesSrc":[], 'questionsWordRecognition': ['南', '西', '北']}]}
  , {"simplifiedChar":"南","traditionalChar":"南","category":"word","heteronyms":[{"pinyin":"nán","definition":"south","audioSrc":"南_0","explainerImagesSrc":[], 'questionsWordRecognition': ['东', '西', '北']}]}
  , {"simplifiedChar":"西","traditionalChar":"西","category":"word","heteronyms":[{"pinyin":"xī","definition":"west","audioSrc":"西_0","explainerImagesSrc":[], 'questionsWordRecognition': ['东', '南', '北']}]}
  , {"simplifiedChar":"北","traditionalChar":"北","category":"word","heteronyms":[{"pinyin":"běi","definition":"north","audioSrc":"北_0","explainerImagesSrc":[], 'questionsWordRecognition': ['西', '南', '东']}]}
  , {"simplifiedChar":"地图","traditionalChar":"地圖","category":"phrase","heteronyms":[{"pinyin":"dì tú","definition":"map","audioSrc":"地图_0","explainerImagesSrc":[], 'questionsWordRecognition': ['先生', '告诉', '淘气']}]}
  , {"simplifiedChar":"先生","traditionalChar":"先生","category":"phrase","heteronyms":[{"pinyin":"xiān shēng","definition":"mister","audioSrc":"先生_0","explainerImagesSrc":[], 'questionsWordRecognition': ['地图', '熊猫', '礼物']}]}
  , {"simplifiedChar":"告诉","traditionalChar":"告訴","category":"phrase","heteronyms":[{"pinyin":"gào sù","definition":"to tell","audioSrc":"告诉_0","explainerImagesSrc":[], 'questionsWordRecognition': ['淘气', '面前', '番茄']}]}
  , {"simplifiedChar":"淘气","traditionalChar":"淘氣","category":"phrase","heteronyms":[{"pinyin":"táo qì","definition":"naughty","audioSrc":"淘气_0","explainerImagesSrc":[], 'questionsWordRecognition': ['先生', '美丽', '宝石']}]}
  , {"simplifiedChar":"面前","traditionalChar":"面前","category":"phrase","heteronyms":[{"pinyin":"miàn qián","definition":"in front of","audioSrc":"面前_0","explainerImagesSrc":[], 'questionsWordRecognition': ['左边', '旁边', '蛋糕']}]}
  , {"simplifiedChar":"吹向","traditionalChar":"吹向","category":"phrase","heteronyms":[{"pinyin":"chuī xiàng","definition":"to blow towards","audioSrc":"吹向_0","explainerImagesSrc":[], 'questionsWordRecognition': ['番茄', '声音', '出现']}]}
  , {"simplifiedChar":"大风","traditionalChar":"大風","category":"phrase","heteronyms":[{"pinyin":"dà fēng","definition":"strong wind","audioSrc":"大风_0","explainerImagesSrc":[], 'questionsWordRecognition': ['回家', '大海', '小船']}]}
  , {"simplifiedChar":"好玩","traditionalChar":"好玩","category":"phrase","heteronyms":[{"pinyin":"hǎo wán","definition":"fun","audioSrc":"好玩_0","explainerImagesSrc":[], 'questionsWordRecognition': ['旁边', '力气', '到达']}]}
  , {"simplifiedChar":"旁边","traditionalChar":"旁邊","category":"phrase","heteronyms":[{"pinyin":"páng biān","definition":"side","audioSrc":"旁边_0","explainerImagesSrc":[], 'questionsWordRecognition': ['好玩', '大风', '雨水']}]}
  , {"simplifiedChar":"灰尘","traditionalChar":"灰塵","category":"phrase","heteronyms":[{"pinyin":"huī chén","definition":"dust","audioSrc":"灰尘_0","explainerImagesSrc":[], 'questionsWordRecognition': ['旁边', '出发', '告诉']}]}
  , {"simplifiedChar":"全身","traditionalChar":"全身","category":"phrase","heteronyms":[{"pinyin":"quán shēn","definition":"the whole body","audioSrc":"全身_0","explainerImagesSrc":[], 'questionsWordRecognition': ['打雷', '沙发', '礼物']}]}
  , {"simplifiedChar":"出发","traditionalChar":"出發","category":"phrase","heteronyms":[{"pinyin":"chū fā","definition":"to set out","audioSrc":"出发_0","explainerImagesSrc":[], 'questionsWordRecognition': ['出现', '到达', '漂来']}]}
  , {"simplifiedChar":"力气","traditionalChar":"力氣","category":"phrase","heteronyms":[{"pinyin":"lì qi","definition":"strength, physical effort","audioSrc":"力气_0","explainerImagesSrc":[], 'questionsWordRecognition': ['用力', '生气', '不仅']}]}
  , {"simplifiedChar":"害怕","traditionalChar":"害怕","category":"phrase","heteronyms":[{"pinyin":"hài pà","definition":"afraid","audioSrc":"害怕_0","explainerImagesSrc":[], 'questionsWordRecognition': ['担心', '努力', '愿意']}]}
  , {"simplifiedChar":"飞快","traditionalChar":"飛快","category":"phrase","heteronyms":[{"pinyin":"fēi kuài","definition":"to be very fast","audioSrc":"飞快_0","explainerImagesSrc":[], 'questionsWordRecognition': ['飞来', '乌云', '害怕']}]}
  , {"simplifiedChar":"乌云","traditionalChar":"烏雲","category":"phrase","heteronyms":[{"pinyin":"wū yún","definition":"dark clouds","audioSrc":"乌云_0","explainerImagesSrc":[], 'questionsWordRecognition': ['萝卜', '白天', '黑夜']}]}
  , {"simplifiedChar":"打雷","traditionalChar":"打雷","category":"phrase","heteronyms":[{"pinyin":"dǎ léi","definition":"thunder","audioSrc":"打雷_0","explainerImagesSrc":[], 'questionsWordRecognition': ['下雨', '长大', '雨水']}]}
  , {"simplifiedChar":"淋湿","traditionalChar":"淋濕","category":"phrase","heteronyms":[{"pinyin":"lín shī","definition":"to be drenched","audioSrc":"淋湿_0","explainerImagesSrc":[], 'questionsWordRecognition': ['雨水', '打雷', '下雨']}]}
  , {"simplifiedChar":"雨水","traditionalChar":"雨水","category":"phrase","heteronyms":[{"pinyin":"yǔ shuǐ","definition":"rain","audioSrc":"雨水_0","explainerImagesSrc":[], 'questionsWordRecognition': ['白天', '淋湿', '下雨']}]}
  , {"simplifiedChar":"下雨","traditionalChar":"下雨","category":"phrase","heteronyms":[{"pinyin":"xià yǔ","definition":"raining","audioSrc":"下雨_0","explainerImagesSrc":[], 'questionsWordRecognition': ['黑夜', '淋湿', '雨水']}]}
  , {"simplifiedChar":"晒","traditionalChar":"曬","category":"word","heteronyms":[{"pinyin":"shài","definition":"exposed to the sun, dry","audioSrc":"晒_0","explainerImagesSrc":[], 'questionsWordRecognition': ['南', '拔', '雷']}]}
  , {"simplifiedChar":"雷","traditionalChar":"雷","category":"word","heteronyms":[{"pinyin":"léi","definition":"thunder","audioSrc":"雷_0","explainerImagesSrc":[], 'questionsWordRecognition': ['北', '吓', '鸟']}]}
  , {"simplifiedChar":"岛","traditionalChar":"島","category":"word","heteronyms":[{"pinyin":"dǎo","definition":"island","audioSrc":"岛_0","explainerImagesSrc":['岛_0'], 'questionsWordRecognition': ['扔', '捡', '雷']}]}
  , {"simplifiedChar":"扔","traditionalChar":"扔","category":"word","heteronyms":[{"pinyin":"rēng","definition":"throw","audioSrc":"扔_0","explainerImagesSrc":[], 'questionsWordRecognition': ['岛', '捡', '东']}]}
  , {"simplifiedChar":"捡","traditionalChar":"撿","category":"word","heteronyms":[{"pinyin":"jiǎn","definition":"to pick up","audioSrc":"捡_0","explainerImagesSrc":[], 'questionsWordRecognition': ['南', '扔', '鸟']}]}
  , {"simplifiedChar":"番茄","traditionalChar":"番茄","category":"phrase","heteronyms":[{"pinyin":"fān qié","definition":"tomato","audioSrc":"番茄_0","explainerImagesSrc":['番茄_0'], 'questionsWordRecognition': ['远处', '南瓜', '萝卜']}]}
  , {"simplifiedChar":"鸟","traditionalChar":"鳥","category":"word","heteronyms":[{"pinyin":"niǎo","definition":"bird","audioSrc":"鸟_0","explainerImagesSrc":['鸟_0'], 'questionsWordRecognition': ['扔', '捡', '雷']}]}
  , {"simplifiedChar":"到达","traditionalChar":"到達","category":"phrase","heteronyms":[{"pinyin":"dào dá","definition":"to reach (a destination)","audioSrc":"到达_0","explainerImagesSrc":[], 'questionsWordRecognition': ['远处', '番茄', '漂来']}]}
  , {"simplifiedChar":"开始","traditionalChar":"開始","category":"phrase","heteronyms":[{"pinyin":"kāi shǐ","definition":"to begin","audioSrc":"开始_0","explainerImagesSrc":[], 'questionsWordRecognition': ['远处', '番茄', '淋湿']}]}
  , {"simplifiedChar":"漂来","traditionalChar":"漂來","category":"phrase","heteronyms":[{"pinyin":"piāo lái","definition":"to drift towards","audioSrc":"漂来_0","explainerImagesSrc":[], 'questionsWordRecognition': ['远处', '打雷', '到达']}]}
  , {"simplifiedChar":"远处","traditionalChar":"遠處","category":"phrase","heteronyms":[{"pinyin":"yuǎn chù","definition":"in the distance","audioSrc":"远处_0","explainerImagesSrc":[], 'questionsWordRecognition': ['乌云', '开始', '到达']}]}
  , {"simplifiedChar":"南瓜","traditionalChar":"南瓜","category":"phrase","heteronyms":[{"pinyin":"nán guā","definition":"pumkin","audioSrc":"南瓜_0","explainerImagesSrc":['南瓜_0'],"questionsWordRecognition":['番茄', '萝卜', '花朵']}]}
  , {"simplifiedChar":"吃","traditionalChar":"吃","category":"word","heteronyms":[{"pinyin":"chī","definition":"to eat","audioSrc":"吃_0","explainerImagesSrc":["吃_0"],"questionsWordRecognition":['摘', '菜', '扔']}]}
  , {"simplifiedChar":"摘","traditionalChar":"摘","category":"word","heteronyms":[{"pinyin":"zhāi","definition":"to pluck/pick","audioSrc":"摘_0","explainerImagesSrc":[],"questionsWordRecognition":['吃', '捡', '扔']}]}
  , {"simplifiedChar":"比","traditionalChar":"比","category":"word","heteronyms":[{"pinyin":"bǐ","definition":"than (used for comparison)","audioSrc":"比_0","explainerImagesSrc":[],"questionsWordRecognition":['大', '小', '吃']}]}
  , {"simplifiedChar":"菜","traditionalChar":"菜","category":"word","heteronyms":[{"pinyin":"cài","definition":"vegetables","audioSrc":"菜_0","explainerImagesSrc":["菜_0"],"questionsWordRecognition":['岛', '鸟', '风']}]}
  , {"simplifiedChar":"努力","traditionalChar":"努力","category":"phrase","heteronyms":[{"pinyin":"nǔ lì","definition":"to put in effort","audioSrc":"努力_0","explainerImagesSrc":[],"questionsWordRecognition":['发抖', '愿意', '用力']}]}
  , {"simplifiedChar":"发抖","traditionalChar":"發抖","category":"phrase","heteronyms":[{"pinyin":"fā dǒu","definition":"to shiver","audioSrc":"发抖_0","explainerImagesSrc":["发抖_0"],"questionsWordRecognition":['努力', '出发', '下雨']}]}
  , {"simplifiedChar":"吓","traditionalChar":"嚇","category":"word","heteronyms":[{"pinyin":"xià","definition":"to scare","audioSrc":"吓_0","explainerImagesSrc":[],"questionsWordRecognition":['上', '摘', '吃']}]}
  , {"simplifiedChar":"愿意","traditionalChar":"願意","category":"phrase","heteronyms":[{"pinyin":"yuàn yì","definition":"to be willing","audioSrc":"愿意_0","explainerImagesSrc":[],"questionsWordRecognition":['漂来', '远处', '发抖']}]}
  , {"simplifiedChar":"很多","traditionalChar":"很多","category":"phrase","heteronyms":[{"pinyin":"hěn duō","definition":"many","audioSrc":"很多_0","explainerImagesSrc":[],"questionsWordRecognition":['用力', '努力', '拔出']}]}
  , {"simplifiedChar":"拔","traditionalChar":"拔","category":"word","heteronyms":[{"pinyin":"bá","definition":"to pull","audioSrc":"拔_0","explainerImagesSrc":[],"questionsWordRecognition":['摘', '吃', '上']}]}
  , {"simplifiedChar":"用力","traditionalChar":"用力","category":"phrase","heteronyms":[{"pinyin":"yòng lì","definition":"to exert oneself pyhsically","audioSrc":"用力_0","explainerImagesSrc":[],"questionsWordRecognition":['很多', '努力', '发抖']}]}
  , {"simplifiedChar":"拔出","traditionalChar":"拔出","category":"phrase","heteronyms":[{"pinyin":"bá chū","definition":"to pull","audioSrc":"拔出_0","explainerImagesSrc":[],"questionsWordRecognition":['办法', '想出', '愿意']}]}
  , {"simplifiedChar":"萝卜","traditionalChar":"蘿蔔","category":"phrase","heteronyms":[{"pinyin":"luó bo","definition":"carrot","audioSrc":"萝卜_0","explainerImagesSrc":['萝卜_0'],"questionsWordRecognition":['番茄', '南瓜', '花朵']}]}
  , {"simplifiedChar":"办法","traditionalChar":"辦法","category":"phrase","heteronyms":[{"pinyin":"bàn fǎ","definition":"plan","audioSrc":"办法_0","explainerImagesSrc":[],"questionsWordRecognition":['想出', '漂来', '拔出']}]}
  , {"simplifiedChar":"想出","traditionalChar":"想出","category":"phrase","heteronyms":[{"pinyin":"xiǎng chū","definition":"to think of","audioSrc":"想出_0","explainerImagesSrc":[],"questionsWordRecognition":['办法', '到达', '出现']}]}
  , {"simplifiedChar":"入","traditionalChar":"入","category":"word","heteronyms":[{"pinyin":"rù","definition":"to enter","audioSrc":"入_0","explainerImagesSrc":[],"questionsWordRecognition":['吐', '吸', '吃']}]}
  , {"simplifiedChar":"吐","traditionalChar":"吐","category":"word","heteronyms":[{"pinyin":"tǔ","definition":"to spit","audioSrc":"吐_0","explainerImagesSrc":[],"questionsWordRecognition":['入', '吓', '吃']}]}
  , {"simplifiedChar":"吸","traditionalChar":"吸","category":"word","heteronyms":[{"pinyin":"xī","definition":"to absorb","audioSrc":"吸_0","explainerImagesSrc":[],"questionsWordRecognition":['摘', '吓', '比']}]}
  , {"simplifiedChar":"嘴巴","traditionalChar":"嘴巴","category":"phrase","heteronyms":[{"pinyin":"zuǐ ba","definition":"mouth","audioSrc":"嘴巴_0","explainerImagesSrc":[],"questionsWordRecognition":['水果', '远处', '漂来']}]}
  , {"simplifiedChar":"水果","traditionalChar":"水果","category":"phrase","heteronyms":[{"pinyin":"shuǐ guǒ","definition":"fruits","audioSrc":"水果_0","explainerImagesSrc":["水果_0"],"questionsWordRecognition":['漂来', '吐出', '远处']}]}
  , {"simplifiedChar":"吐出","traditionalChar":"吐出","category":"phrase","heteronyms":[{"pinyin":"tú chū","definition":"to spit out","audioSrc":"吐出_0","explainerImagesSrc":[],"questionsWordRecognition":['拔出', '用力', '草屋']}]}
  , {"simplifiedChar":"安全","traditionalChar":"安全","category":"phrase","heteronyms":[{"pinyin":"ān quán","definition":"to be safe","audioSrc":"安全_0","explainerImagesSrc":[],"questionsWordRecognition":['拔出', '用力', '嘴巴']}]}
  , {"simplifiedChar":"草屋","traditionalChar":"草屋","category":"phrase","heteronyms":[{"pinyin":"cǎo wū","definition":"a hut made of hay","audioSrc":"草屋_0","explainerImagesSrc":["草屋_0"],"questionsWordRecognition":['嘴巴', '淋湿', '办法']}]}
  , {"simplifiedChar":"木屋","traditionalChar":"木屋","category":"phrase","heteronyms":[{"pinyin":"mù wū","definition":"wooden house","audioSrc":"木屋_0","explainerImagesSrc":["木屋_0"],"questionsWordRecognition":['草屋', '拔出', '发抖']}]}
  , {"simplifiedChar":"树","traditionalChar":"樹","category":"word","heteronyms":[{"pinyin":"shù","definition":"tree","audioSrc":"树_0","explainerImagesSrc":["树_0"],"questionsWordRecognition":['吸', '摘', '躲']}]}
  , {"simplifiedChar":"苹果","traditionalChar":"蘋果","category":"phrase","heteronyms":[{"pinyin":"píng guǒ","definition":"apple","audioSrc":"苹果_0","explainerImagesSrc":["苹果_0"],"questionsWordRecognition":['香蕉', '南瓜', '西瓜']}]}
  , {"simplifiedChar":"西瓜","traditionalChar":"西瓜","category":"phrase","heteronyms":[{"pinyin":"xī guā","definition":"watermelon","audioSrc":"西瓜_0","explainerImagesSrc":["西瓜_0"],"questionsWordRecognition":['香蕉', '南瓜', '苹果']}]}
  , {"simplifiedChar":"香蕉","traditionalChar":"香蕉","category":"phrase","heteronyms":[{"pinyin":"xiāng jiāo","definition":"banana","audioSrc":"香蕉_0","explainerImagesSrc":["香蕉_0"],"questionsWordRecognition":['番茄', '南瓜', '萝卜']}]}
  , {"simplifiedChar":"偷看","traditionalChar":"偷看","category":"phrase","heteronyms":[{"pinyin":"tōu kàn","definition":"to steal a glance","audioSrc":"偷看_0","explainerImagesSrc":[],"questionsWordRecognition":['树下', '漂来', '吐出']}]}
  , {"simplifiedChar":"悄悄","traditionalChar":"悄悄","category":"phrase","heteronyms":[{"pinyin":"qiāo qiāo","definition":"underneath a tree","audioSrc":"悄悄_0","explainerImagesSrc":[],"questionsWordRecognition":['偷看', '愿意', '花朵']}]}
  , {"simplifiedChar":"树下","traditionalChar":"樹下","category":"phrase","heteronyms":[{"pinyin":"shù xià","definition":"underneath a tree","audioSrc":"树下_0","explainerImagesSrc":[],"questionsWordRecognition":['悄悄', '想出', '办法']}]}
  , {"simplifiedChar":"躲","traditionalChar":"躲","category":"word","heteronyms":[{"pinyin":"duǒ","definition":"to hide","audioSrc":"躲_0","explainerImagesSrc":[],"questionsWordRecognition":['吸', '吐', '树']}]}
  , {"simplifiedChar":"抓住","traditionalChar":"抓住","category":"phrase","heteronyms":[{"pinyin":"zhuā zhù","definition":"to grab","audioSrc":"抓住_0","explainerImagesSrc":[],"questionsWordRecognition":['拔出', '想出', '偷看']}]}
  , {"simplifiedChar":"橙","traditionalChar":"橙","category":"word","heteronyms":[{"pinyin":"chéng","definition":"orange (can refer to either colour or the fruit)","audioSrc":"橙_0","explainerImagesSrc":['橙_0'],"questionsWordRecognition":['红', '黑', '白']}]}
  , {"simplifiedChar":"跳","traditionalChar":"跳","category":"word","heteronyms":[{"pinyin":"tiào","definition":"to jump","audioSrc":"跳_0","explainerImagesSrc":[],"questionsWordRecognition":['走', '跑', '看']}]}
  , {"simplifiedChar":"飞来","traditionalChar":"飛來","category":"phrase","heteronyms":[{"pinyin":"fēi lái","definition":"to fly over","audioSrc":"飞来_0","explainerImagesSrc":[],"questionsWordRecognition":['飞快', '漂来', '树下']}]}
  , {"simplifiedChar":"马上","traditionalChar":"馬上","category":"phrase","heteronyms":[{"pinyin":"mǎ shàng","definition":"immediately","audioSrc":"马上_0","explainerImagesSrc":[],"questionsWordRecognition":['飞来', '拔出', '用力']}]}
  , {"simplifiedChar":"互相","traditionalChar":"互相","category":"phrase","heteronyms":[{"pinyin":"hù xiāng","definition":"to each other","audioSrc":"互相_0","explainerImagesSrc":[],"questionsWordRecognition":['草屋', '努力', '下雨']}]}
  , {"simplifiedChar":"吸进","traditionalChar":"吸進","category":"phrase","heteronyms":[{"pinyin":"xī jìn","definition":"to suck in","audioSrc":"吸进_0","explainerImagesSrc":[],"questionsWordRecognition":['吐出', '互相', '花朵']}]}
  , {"simplifiedChar":"担心","traditionalChar":"擔心","category":"phrase","heteronyms":[{"pinyin":"dān xīn","definition":"to worry","audioSrc":"担心_0","explainerImagesSrc":[],"questionsWordRecognition":['开心', '橙色', '苹果']}]}
  , {"simplifiedChar":"橙色","traditionalChar":"橙色","category":"phrase","heteronyms":[{"pinyin":"chéng sè","definition":"orange (colour)","audioSrc":"橙色_0","explainerImagesSrc":['橙色_0'],"questionsWordRecognition":['西瓜', '淋湿', '每年']}]}
  , {"simplifiedChar":"狗","traditionalChar":"狗","category":"word","heteronyms":[{"pinyin":"gǒu","definition":"dog","audioSrc":"狗_0","explainerImagesSrc":['狗_0'],"questionsWordRecognition":['猪', '羊', '鸡']}]}
  , {"simplifiedChar":"猪","traditionalChar":"豬","category":"word","heteronyms":[{"pinyin":"zhū","definition":"pig","audioSrc":"猪_0","explainerImagesSrc":['猪_0'],"questionsWordRecognition":['狗', '羊', '鸡']}]}
  , {"simplifiedChar":"羊","traditionalChar":"羊","category":"word","heteronyms":[{"pinyin":"yáng","definition":"sheep","audioSrc":"羊_0","explainerImagesSrc":['羊_0'],"questionsWordRecognition":['狗', '鸟', '鸡']}]}
  , {"simplifiedChar":"蛋","traditionalChar":"蛋","category":"word","heteronyms":[{"pinyin":"dàn","definition":"egg","audioSrc":"蛋_0","explainerImagesSrc":['蛋_0'],"questionsWordRecognition":['跳', '树', '橙']}]}
  , {"simplifiedChar":"鸡","traditionalChar":"雞","category":"word","heteronyms":[{"pinyin":"jī","definition":"chicken","audioSrc":"鸡_0","explainerImagesSrc":['鸡_0'],"questionsWordRecognition":['狗', '鸟', '猪']}]}
  , {"simplifiedChar":"叼走","traditionalChar":"叼走","category":"phrase","heteronyms":[{"pinyin":"diāo zǒu","definition":"to carry off (in one's mouth)","audioSrc":"叼走_0","explainerImagesSrc":[],"questionsWordRecognition":['飞来', '羊群', '安全']}]}
  , {"simplifiedChar":"喂鸡","traditionalChar":"喂雞","category":"phrase","heteronyms":[{"pinyin":"wèi jī","definition":"to feed chickens","audioSrc":"喂鸡_0","explainerImagesSrc":[],"questionsWordRecognition":['小狗', '马上', '互相']}]}
  , {"simplifiedChar":"小狗","traditionalChar":"小狗","category":"phrase","heteronyms":[{"pinyin":"xiǎo gǒu","definition":"puppy","audioSrc":"小狗_0","explainerImagesSrc":['小狗_0'],"questionsWordRecognition":['叼走', '担心', '嘴巴']}]}
  , {"simplifiedChar":"羊群","traditionalChar":"羊群","category":"phrase","heteronyms":[{"pinyin":"yáng qún","definition":"a flock of sheep","audioSrc":"羊群_0","explainerImagesSrc":['羊群_0'],"questionsWordRecognition":['喂鸡', '小狗', '抓住']}]}
  , {"simplifiedChar":"咬","traditionalChar":"咬","category":"word","heteronyms":[{"pinyin":"yǎo","definition":"to bite","audioSrc":"咬_0","explainerImagesSrc":[],"questionsWordRecognition":['口', '吸', '吓']}]}
  , {"simplifiedChar":"坏","traditionalChar":"壞","category":"word","heteronyms":[{"pinyin":"huài","definition":"to be spoilt (object)","audioSrc":"坏_0","explainerImagesSrc":[],"questionsWordRecognition":['比', '树', '灯']}]}
  , {"simplifiedChar":"扇","traditionalChar":"扇","category":"word","heteronyms":[{"pinyin":"shān","definition":"to fan (verb; can also refer to a physical fan)","audioSrc":"扇_0","explainerImagesSrc":[],"questionsWordRecognition":['马', '吃', '都']}]}
  , {"simplifiedChar":"牛","traditionalChar":"牛","category":"word","heteronyms":[{"pinyin":"niú","definition":"cow","audioSrc":"牛_0","explainerImagesSrc":['牛_0'],"questionsWordRecognition":['狗', '猪', '马']}]}
  , {"simplifiedChar":"马","traditionalChar":"馬","category":"word","heteronyms":[{"pinyin":"mǎ","definition":"horse","audioSrc":"马_0","explainerImagesSrc":['马_0'],"questionsWordRecognition":['牛', '羊', '狗']}]}
  , {"simplifiedChar":"保护","traditionalChar":"保護","category":"phrase","heteronyms":[{"pinyin":"bǎo hù","definition":"to protect","audioSrc":"保护_0","explainerImagesSrc":[],"questionsWordRecognition":['农场', '动物', '西瓜']}]}
  , {"simplifiedChar":"农场","traditionalChar":"農場","category":"phrase","heteronyms":[{"pinyin":"nóng cháng","definition":"farm","audioSrc":"农场_0","explainerImagesSrc":['农场_0'],"questionsWordRecognition":['担心', '害怕', '很多']}]}
  , {"simplifiedChar":"动物","traditionalChar":"動物","category":"phrase","heteronyms":[{"pinyin":"dòng wù","definition":"animals","audioSrc":"动物_0","explainerImagesSrc":[],"questionsWordRecognition":['互相', '飞来', '保护']}]}
  , {"simplifiedChar":"掉","traditionalChar":"掉","category":"word","heteronyms":[{"pinyin":"diào","definition":"to drop","audioSrc":"掉_0","explainerImagesSrc":[],"questionsWordRecognition":['咬', '坏', '躲']}]}
  , {"simplifiedChar":"狼","traditionalChar":"狼","category":"word","heteronyms":[{"pinyin":"láng","definition":"wolf","audioSrc":"狼_0","explainerImagesSrc":["狼_0"],"questionsWordRecognition":['猫', '狗', '鸡']}]}
  , {"simplifiedChar":"猫","traditionalChar":"貓","category":"word","heteronyms":[{"pinyin":"māo","definition":"cat","audioSrc":"猫_0","explainerImagesSrc":["猫_0"],"questionsWordRecognition":['狗', '猪', '羊']}]}
  , {"simplifiedChar":"破","traditionalChar":"破","category":"word","heteronyms":[{"pinyin":"pò","definition":"to break","audioSrc":"破_0","explainerImagesSrc":[],"questionsWordRecognition":['掉', '坏', '咬']}]}
  , {"simplifiedChar":"葫芦","traditionalChar":"葫蘆","category":"phrase","heteronyms":[{"pinyin":"hú lu","definition":"gourd","audioSrc":"葫芦_0","explainerImagesSrc":[],"questionsWordRecognition":['番茄', '木屋', '水果']}]}
  , {"simplifiedChar":"冒出","traditionalChar":"冒出","category":"phrase","heteronyms":[{"pinyin":"mào chū","definition":"to emit","audioSrc":"冒出_0","explainerImagesSrc":[],"questionsWordRecognition":['叼走', '抓住', '吐出']}]}
  , {"simplifiedChar":"厉害","traditionalChar":"厲害","category":"phrase","heteronyms":[{"pinyin":"lì hai","definition":"to be powerful","audioSrc":"厉害_0","explainerImagesSrc":[],"questionsWordRecognition":['用力', '淘气', '面前']}]}
  , {"simplifiedChar":"摔破","traditionalChar":"摔破","category":"phrase","heteronyms":[{"pinyin":"shuāi pò","definition":"to break","audioSrc":"摔破_0","explainerImagesSrc":[],"questionsWordRecognition":['厉害', '葫芦', '打雷']}]}
  , {"simplifiedChar":"冰","traditionalChar":"冰","category":"word","heteronyms":[{"pinyin":"bīng","definition":"ice","audioSrc":"冰_0","explainerImagesSrc":['冰_0'],"questionsWordRecognition":['堆', '漂', '羊']}]}
  , {"simplifiedChar":"堆","traditionalChar":"堆","category":"word","heteronyms":[{"pinyin":"duī","definition":"to pile up","audioSrc":"堆_0","explainerImagesSrc":[],"questionsWordRecognition":['拔', '跳', '躲']}]}
  , {"simplifiedChar":"漂","traditionalChar":"漂","category":"word","heteronyms":[{"pinyin":"piāo","definition":"to drift","audioSrc":"漂_0","explainerImagesSrc":[],"questionsWordRecognition":['坏', '狗', '冰']}]}
  , {"simplifiedChar":"玩球","traditionalChar":"玩球","category":"phrase","heteronyms":[{"pinyin":"wán qiú","definition":"to play with a ball","audioSrc":"玩球_0","explainerImagesSrc":[],"questionsWordRecognition":['西瓜', '美丽', '礼物']}]}
  , {"simplifiedChar":"雪人","traditionalChar":"雪人","category":"phrase","heteronyms":[{"pinyin":"xuě rén","definition":"snowman","audioSrc":"雪人_0","explainerImagesSrc":['雪人_0'],"questionsWordRecognition":['冰雪', '开始', '互相']}]}
  , {"simplifiedChar":"乘船","traditionalChar":"乘船","category":"phrase","heteronyms":[{"pinyin":"chéng chuán","definition":"to take a board","audioSrc":"乘船_0","explainerImagesSrc":[],"questionsWordRecognition":['漂来', '橙色', '到达']}]}
  , {"simplifiedChar":"冰雪","traditionalChar":"冰雪","category":"phrase","heteronyms":[{"pinyin":"bīng xuě","definition":"ice and snow","audioSrc":"冰雪_0","explainerImagesSrc":['冰雪_0'],"questionsWordRecognition":['雪人', '寒冷', '担心']}]}
  , {"simplifiedChar":"地方","traditionalChar":"地方","category":"phrase","heteronyms":[{"pinyin":"dì fāng","definition":"place","audioSrc":"地方_0","explainerImagesSrc":[],"questionsWordRecognition":['葫芦', '马上', '小狗']}]}
  , {"simplifiedChar":"寒冷","traditionalChar":"寒冷","category":"phrase","heteronyms":[{"pinyin":"hán lěng","definition":"very cold","audioSrc":"寒冷_0","explainerImagesSrc":[],"questionsWordRecognition":['冰雪', '雪人', '保护']}]}
  , {"simplifiedChar":"冰淇淋","traditionalChar":"冰淇淋","category":"phrase","heteronyms":[{"pinyin":"bīng qí lín","definition":"ice cream","audioSrc":"冰淇淋_0","explainerImagesSrc":['冰淇淋_0'],"questionsWordRecognition":['冰雪', '三只熊', '担心']}]}
  , {"simplifiedChar":"熊","traditionalChar":"熊","category":"word","heteronyms":[{"pinyin":"xióng","definition":"bear","audioSrc":"熊_0","explainerImagesSrc":[],"questionsWordRecognition":['狗', '马', '羊']}]}
  , {"simplifiedChar":"碗","traditionalChar":"碗","category":"word","heteronyms":[{"pinyin":"wǎn","definition":"bowl","audioSrc":"碗_0","explainerImagesSrc":[],"questionsWordRecognition":['破', '猫', '躲']}]}
  , {"simplifiedChar":"企鹅","traditionalChar":"企鵝","category":"phrase","heteronyms":[{"pinyin":"qǐ é","definition":"penguin","audioSrc":"企鹅_0","explainerImagesSrc":['企鹅_0'],"questionsWordRecognition":['小狗', '雪人', '苹果']}]}
  , {"simplifiedChar":"冰屋","traditionalChar":"冰屋","category":"phrase","heteronyms":[{"pinyin":"bīng wū","definition":"igloo","audioSrc":"冰屋_0","explainerImagesSrc":['冰屋_0'],"questionsWordRecognition":['雪人', '保护', '飞来']}]}
  , {"simplifiedChar":"吃光","traditionalChar":"吃光","category":"phrase","heteronyms":[{"pinyin":"chī guāng","definition":"to finish eating","audioSrc":"吃光_0","explainerImagesSrc":[],"questionsWordRecognition":['冰屋', '美丽', '农场']}]}
  , {"simplifiedChar":"走进","traditionalChar":"走進","category":"phrase","heteronyms":[{"pinyin":"zǒu jìn","definition":"to walk into","audioSrc":"走进_0","explainerImagesSrc":[],"questionsWordRecognition":['羊群', '叼走', '吃光']}]}  
  , {"simplifiedChar":"云","traditionalChar":"雲","category":"word","heteronyms":[{"pinyin":"yún","definition":"clouds","audioSrc":"云_0","explainerImagesSrc":['云_0'],"questionsWordRecognition":['冷', '碗', '破']}]}
  , {"simplifiedChar":"冰冻","traditionalChar":"冰凍","category":"phrase","heteronyms":[{"pinyin":"bīng dòng","definition":"frozen","audioSrc":"冰冻_0","explainerImagesSrc":[],"questionsWordRecognition":['冰雪', '冰块', '小狗']}]}
  , {"simplifiedChar":"冰块","traditionalChar":"冰塊","category":"phrase","heteronyms":[{"pinyin":"bīng kuài","definition":"ice block","audioSrc":"冰块_0","explainerImagesSrc":[],"questionsWordRecognition":['冰雪', '雪人', '保护']}]}
  , {"simplifiedChar":"冷","traditionalChar":"冷","category":"word","heteronyms":[{"pinyin":"lěng","definition":"cold","audioSrc":"冷_0","explainerImagesSrc":[],"questionsWordRecognition":['云', '羊', '树']}]}
  , {"simplifiedChar":"三只熊","traditionalChar":"三子熊","category":"phrase","heteronyms":[{"pinyin":"sān zhī xióng","definition":"cold","audioSrc":"三子熊_0","explainerImagesSrc":[],"questionsWordRecognition":['冰淇淋', '抓住', '动物']}]}
  , {"simplifiedChar":"发现","traditionalChar":"發現","category":"phrase","heteronyms":[{"pinyin":"fā xiàn","definition":"to discover","audioSrc":"发现_0","explainerImagesSrc":[],"questionsWordRecognition":['出现', '雪人', '用力']}]}
  , {"simplifiedChar":"回来","traditionalChar":"回來","category":"phrase","heteronyms":[{"pinyin":"huí lai","definition":"to return","audioSrc":"回来_0","explainerImagesSrc":[],"questionsWordRecognition":['回家', '葫芦', '飞来']}]}
  , {"simplifiedChar":"空碗","traditionalChar":"空碗","category":"phrase","heteronyms":[{"pinyin":"kōng wǎn","definition":"empty bowl","audioSrc":"空碗_0","explainerImagesSrc":[],"questionsWordRecognition":['天空', '西瓜', '羊群']}]}
  , {"simplifiedChar":"冰山","traditionalChar":"冰山","category":"phrase","heteronyms":[{"pinyin":"bīng shān","definition":"ice mountain","audioSrc":"冰山_0","explainerImagesSrc":[],"questionsWordRecognition":['冰屋', '冰块', '火球']}]}
  , {"simplifiedChar":"化","traditionalChar":"化","category":"word","heteronyms":[{"pinyin":"huà","definition":"(when used with 融化) to melt","audioSrc":"化_0","explainerImagesSrc":[],"questionsWordRecognition":['破', '冷', '坏']}]}
  , {"simplifiedChar":"巨人","traditionalChar":"巨人","category":"phrase","heteronyms":[{"pinyin":"jù rén","definition":"giant","audioSrc":"巨人_0","explainerImagesSrc":[],"questionsWordRecognition":['高大', '雪人', '西瓜']}]}
  , {"simplifiedChar":"火","traditionalChar":"火","category":"word","heteronyms":[{"pinyin":"huǒ","definition":"fire","audioSrc":"火_0","explainerImagesSrc":['火_0'],"questionsWordRecognition":['长', '马', '树']}]}
  , {"simplifiedChar":"高大","traditionalChar":"高大","category":"phrase","heteronyms":[{"pinyin":"gāo dà","definition":"large","audioSrc":"高大_0","explainerImagesSrc":[],"questionsWordRecognition":['雪人', '巨人', '漂来']}]}
  , {"simplifiedChar":"变成","traditionalChar":"變成","category":"phrase","heteronyms":[{"pinyin":"biàn chéng","definition":"to change into","audioSrc":"变成_0","explainerImagesSrc":[],"questionsWordRecognition":['出现', '冰雪', '开始']}]}
  , {"simplifiedChar":"火球","traditionalChar":"火球","category":"phrase","heteronyms":[{"pinyin":"huǒ qiú","definition":"fireball","audioSrc":"火球_0","explainerImagesSrc":[],"questionsWordRecognition":['冰雪', '马上', '小狗']}]}
  , {"simplifiedChar":"山坡","traditionalChar":"山坡","category":"phrase","heteronyms":[{"pinyin":"shān pō","definition":"slope of a hill or mountain","audioSrc":"山坡_0","explainerImagesSrc":[],"questionsWordRecognition":['小狗', '桥边', '橙色']}]}
  , {"simplifiedChar":"桥","traditionalChar":"橋","category":"word","heteronyms":[{"pinyin":"qiáo","definition":"bridge","audioSrc":"桥_0","explainerImagesSrc":['桥_0'],"questionsWordRecognition":['冷', '碗', '破']}]}
  , {"simplifiedChar":"跑","traditionalChar":"跑","category":"word","heteronyms":[{"pinyin":"pǎo","definition":"run","audioSrc":"跑_0","explainerImagesSrc":[],"questionsWordRecognition":['跳', '跟', '走']}]}
  , {"simplifiedChar":"跟","traditionalChar":"跟","category":"word","heteronyms":[{"pinyin":"gēn","definition":"to follow","audioSrc":"跟_0","explainerImagesSrc":[],"questionsWordRecognition":['跑', '跳', '火']}]}
  , {"simplifiedChar":"查看","traditionalChar":"查看","category":"phrase","heteronyms":[{"pinyin":"chá kàn","definition":"to investigate","audioSrc":"查看_0","explainerImagesSrc":[],"questionsWordRecognition":['桥边', '靠近', '企鹅']}]}
  , {"simplifiedChar":"桥边","traditionalChar":"橋邊","category":"phrase","heteronyms":[{"pinyin":"qiáo biān","definition":"side of a bridge","audioSrc":"桥边_0","explainerImagesSrc":[],"questionsWordRecognition":['靠近', '小狗', '查看']}]}
  , {"simplifiedChar":"爬山","traditionalChar":"爬山","category":"phrase","heteronyms":[{"pinyin":"pá shān","definition":"mountain climbing","audioSrc":"爬山_0","explainerImagesSrc":[],"questionsWordRecognition":['桥边', '雪人', '用力']}]}
  , {"simplifiedChar":"靠近","traditionalChar":"靠近","category":"phrase","heteronyms":[{"pinyin":"kào jìn","definition":"to approach","audioSrc":"靠近_0","explainerImagesSrc":[],"questionsWordRecognition":['爬山', '桥边', '出现']}]}
  , {"simplifiedChar":"出去","traditionalChar":"出去","category":"phrase","heteronyms":[{"pinyin":"chū qù","definition":"to go out or get out","audioSrc":"出去_0","explainerImagesSrc":[],"questionsWordRecognition":['抓住', '动物', '小狗']}]}
  , {"simplifiedChar":"抬","traditionalChar":"抬","category":"word","heteronyms":[{"pinyin":"tái","definition":"to lift","audioSrc":"抬_0","explainerImagesSrc":[],"questionsWordRecognition":['手', '飞', '冷']}]}
  , {"simplifiedChar":"脚","traditionalChar":"腳","category":"word","heteronyms":[{"pinyin":"jiǎo","definition":"leg","audioSrc":"脚_0","explainerImagesSrc":[],"questionsWordRecognition":['口', '手', '耳']}]}
  , {"simplifiedChar":"踢","traditionalChar":"踢","category":"word","heteronyms":[{"pinyin":"tī","definition":"to kick","audioSrc":"踢_0","explainerImagesSrc":[],"questionsWordRecognition":['走', '跳', '飞']}]}
  , {"simplifiedChar":"飞","traditionalChar":"飛","category":"word","heteronyms":[{"pinyin":"fēi","definition":"to fly","audioSrc":"飞_0","explainerImagesSrc":[],"questionsWordRecognition":['走', '跳', '踢']}]}
  , {"simplifiedChar":"消失","traditionalChar":"消失","category":"phrase","heteronyms":[{"pinyin":"xiāo shī","definition":"to disappear","audioSrc":"消失_0","explainerImagesSrc":[],"questionsWordRecognition":['闪开', '小狗', '西瓜']}]}
  , {"simplifiedChar":"竹棍","traditionalChar":"竹棍","category":"phrase","heteronyms":[{"pinyin":"zhú gùn","definition":"bamboo rod","audioSrc":"竹棍_0","explainerImagesSrc":[],"questionsWordRecognition":['闪开', '靠近', '冰雪']}]}
  , {"simplifiedChar":"闪开","traditionalChar":"閃開","category":"phrase","heteronyms":[{"pinyin":"shǎn kāi","definition":"to evade","audioSrc":"闪开_0","explainerImagesSrc":[],"questionsWordRecognition":['消失', '竹棍', '桥边']}]}
  , {"simplifiedChar":"妹","traditionalChar":"妹","category":"word","heteronyms":[{"pinyin":"mèi","definition":"younger sister","audioSrc":"妹_0","explainerImagesSrc":[],"questionsWordRecognition":['哥', '我', '他']}]}
  , {"simplifiedChar":"我们","traditionalChar":"我們","category":"phrase","heteronyms":[{"pinyin":"wǒ men","definition":"we","audioSrc":"我们_0","explainerImagesSrc":[],"questionsWordRecognition":['它们', '你们', '闪开']}]}
  , {"simplifiedChar":"它们","traditionalChar":"它們","category":"phrase","heteronyms":[{"pinyin":"tā men","definition":"they","audioSrc":"它们_0","explainerImagesSrc":[],"questionsWordRecognition":['我们', '你们', '小狗']}]}
  , {"simplifiedChar":"你们","traditionalChar":"你們","category":"phrase","heteronyms":[{"pinyin":"nǐ men","definition":"you","audioSrc":"你们_0","explainerImagesSrc":[],"questionsWordRecognition":['它们', '我们', '马上']}]}
  , {"simplifiedChar":"问","traditionalChar":"問","category":"word","heteronyms":[{"pinyin":"wèn","definition":"ask","audioSrc":"问_0","explainerImagesSrc":[],"questionsWordRecognition":['长', '走', '飞']}]}
  , {"simplifiedChar":"开","traditionalChar":"開","category":"word","heteronyms":[{"pinyin":"kāi","definition":"to open","audioSrc":"开_0","explainerImagesSrc":[],"questionsWordRecognition":['问', '口', '飞']}]}
  , {"simplifiedChar":"门","traditionalChar":"門","category":"word","heteronyms":[{"pinyin":"mén","definition":"door","audioSrc":"门_0","explainerImagesSrc":[],"questionsWordRecognition":['问', '飞', '口']}]}
  , {"simplifiedChar":"书包","traditionalChar":"書包","category":"phrase","heteronyms":[{"pinyin":"shū bāo","definition":"school bag","audioSrc":"书包_0","explainerImagesSrc":[],"questionsWordRecognition":['出现', '面包', '鼻子']}]}
  , {"simplifiedChar":"好香","traditionalChar":"好香","category":"phrase","heteronyms":[{"pinyin":"hǎo xiāng","definition":"agreeable aroma","audioSrc":"好香_0","explainerImagesSrc":[],"questionsWordRecognition":['西瓜', '马上', '它们']}]}
  , {"simplifiedChar":"面包","traditionalChar":"面包","category":"phrase","heteronyms":[{"pinyin":"miàn bāo","definition":"bread","audioSrc":"面包_0","explainerImagesSrc":['面包_0'],"questionsWordRecognition":['苹果', '水果', '小狗']}]}
  , {"simplifiedChar":"鼻子","traditionalChar":"鼻子","category":"phrase","heteronyms":[{"pinyin":"bí zǐ","definition":"nose","audioSrc":"鼻子_0","explainerImagesSrc":['鼻子_0'],"questionsWordRecognition":['嘴巴', '面包', '闪开']}]}
  , {"simplifiedChar":"个","traditionalChar":"個","category":"word","heteronyms":[{"pinyin":"gè","definition":"piece","audioSrc":"个_0","explainerImagesSrc":[],"questionsWordRecognition":['子', '果', '七']}]}
  , {"simplifiedChar":"子","traditionalChar":"子","category":"word","heteronyms":[{"pinyin":"zǐ","definition":"seed or small thing","audioSrc":"子_0","explainerImagesSrc":[],"questionsWordRecognition":['个', '七', '踢']}]}
  , {"simplifiedChar":"果","traditionalChar":"果","category":"word","heteronyms":[{"pinyin":"guǒ","definition":"fruit","audioSrc":"果_0","explainerImagesSrc":['果_0'],"questionsWordRecognition":['脚', '个', '妹']}]}
  , {"simplifiedChar":"下去","traditionalChar":"下去","category":"phrase","heteronyms":[{"pinyin":"xià qu","definition":"go down","audioSrc":"下去_0","explainerImagesSrc":[],"questionsWordRecognition":['坐下', '果子', '嘴巴']}]}
  , {"simplifiedChar":"果子","traditionalChar":"果子","category":"phrase","heteronyms":[{"pinyin":"guǒ zi","definition":"fruit","audioSrc":"果子_0","explainerImagesSrc":['果子_0'],"questionsWordRecognition":['竹棍', '闪开', '好香']}]}
  , {"simplifiedChar":"长手","traditionalChar":"長手","category":"phrase","heteronyms":[{"pinyin":"cháng shǒu","definition":"long hands; 長 is an adjective meaning long","audioSrc":"长手_0","explainerImagesSrc":['长手_0'],"questionsWordRecognition":['长大', '马上', '果子']}]}
  , {"simplifiedChar":"太","traditionalChar":"太","category":"word","heteronyms":[{"pinyin":"tài","definition":"extremely","audioSrc":"太_0","explainerImagesSrc":[],"questionsWordRecognition":['大', '好', '小']}]}
  , {"simplifiedChar":"好","traditionalChar":"好","category":"word","heteronyms":[{"pinyin":"hǎo","definition":"good","audioSrc":"好_0","explainerImagesSrc":[],"questionsWordRecognition":['太', '问', '小']}]}
  , {"simplifiedChar":"包子","traditionalChar":"包子","category":"phrase","heteronyms":[{"pinyin":"bāo zi","definition":"bun","audioSrc":"包子_0","explainerImagesSrc":[],"questionsWordRecognition":['听见', '苹果', '我们']}]}
  , {"simplifiedChar":"听见","traditionalChar":"聽見","category":"phrase","heteronyms":[{"pinyin":"tīng jiàn","definition":"to hear","audioSrc":"听见_0","explainerImagesSrc":[],"questionsWordRecognition":['看见', '小狗', '闪开']}]}
  , {"simplifiedChar":"要","traditionalChar":"要","category":"word","heteronyms":[{"pinyin":"yào","definition":"want","audioSrc":"要_0","explainerImagesSrc":[],"questionsWordRecognition":['小', '太', '长']}]}
  , {"simplifiedChar":"不见","traditionalChar":"不見","category":"phrase","heteronyms":[{"pinyin":"bù jiàn","definition":"to be missing","audioSrc":"不见_0","explainerImagesSrc":[],"questionsWordRecognition":['听见', '马上', '冰雪']}]}
  , {"simplifiedChar":"这是","traditionalChar":"這是","category":"phrase","heteronyms":[{"pinyin":"zhè shì","definition":"this is","audioSrc":"这是_0","explainerImagesSrc":[],"questionsWordRecognition":['那是', '不见', '我们']}]}
  , {"simplifiedChar":"那是","traditionalChar":"那是","category":"phrase","heteronyms":[{"pinyin":"nà shì","definition":"that is","audioSrc":"那是_0","explainerImagesSrc":[],"questionsWordRecognition":['这是', '包子', '我们']}]}
  , {"simplifiedChar":"正在","traditionalChar":"正在","category":"phrase","heteronyms":[{"pinyin":"zhèng zài","definition":"currently","audioSrc":"正在_0","explainerImagesSrc":[],"questionsWordRecognition":['看书', '木屋', '不见']}]}
  , {"simplifiedChar":"看书","traditionalChar":"看書","category":"phrase","heteronyms":[{"pinyin":"kàn shū","definition":"to read","audioSrc":"看书_0","explainerImagesSrc":[],"questionsWordRecognition":['正在', '今天', '嘴巴']}]}
  , {"simplifiedChar":"多","traditionalChar":"多","category":"word","heteronyms":[{"pinyin":"duō","definition":"plenty","audioSrc":"多_0","explainerImagesSrc":[],"questionsWordRecognition":['口', '家', '看']}]}
  , {"simplifiedChar":"家","traditionalChar":"家","category":"word","heteronyms":[{"pinyin":"jiā","definition":"home","audioSrc":"家_0","explainerImagesSrc":[],"questionsWordRecognition":['里', '多', '个']}]}
  , {"simplifiedChar":"大家","traditionalChar":"大家","category":"phrase","heteronyms":[{"pinyin":"dà jiā","definition":"everyone","audioSrc":"大家_0","explainerImagesSrc":[],"questionsWordRecognition":['朋友', '回家', '自己']}]}
  , {"simplifiedChar":"朋友","traditionalChar":"朋友","category":"phrase","heteronyms":[{"pinyin":"péng yǒu","definition":"friends","audioSrc":"朋友_0","explainerImagesSrc":[],"questionsWordRecognition":['大家', '今天', '嘴巴']}]}
  , {"simplifiedChar":"出","traditionalChar":"出","category":"word","heteronyms":[{"pinyin":"chū","definition":"to leave or go out","audioSrc":"出_0","explainerImagesSrc":[],"questionsWordRecognition":['回', '里', '家']}]}
  , {"simplifiedChar":"回","traditionalChar":"回","category":"word","heteronyms":[{"pinyin":"huí","definition":"to come in","audioSrc":"回_0","explainerImagesSrc":[],"questionsWordRecognition":['出', '看', '见']}]}
  , {"simplifiedChar":"见","traditionalChar":"見","category":"word","heteronyms":[{"pinyin":"jiàn","definition":"see","audioSrc":"见_0","explainerImagesSrc":[],"questionsWordRecognition":['看', '回', '出']}]}
  , {"simplifiedChar":"好吃","traditionalChar":"好吃","category":"phrase","heteronyms":[{"pinyin":"hǎo chī","definition":"delicious","audioSrc":"好吃_0","explainerImagesSrc":[],"questionsWordRecognition":['回家', '回来', '不见']}]}
  , {"simplifiedChar":"自己","traditionalChar":"自己","category":"phrase","heteronyms":[{"pinyin":"zì jǐ","definition":"oneself or our","audioSrc":"自己_0","explainerImagesSrc":[],"questionsWordRecognition":['好吃', '回家', '回来']}]}
  , {"simplifiedChar":"巴","traditionalChar":"巴","category":"word","heteronyms":[{"pinyin":"bā","definition":"mouth (when used with 嘴巴)","audioSrc":"巴_0","explainerImagesSrc":[],"questionsWordRecognition":['玩', '狗', '他']}]}
  , {"simplifiedChar":"玩","traditionalChar":"玩","category":"word","heteronyms":[{"pinyin":"wàn","definition":"to play","audioSrc":"玩_0","explainerImagesSrc":[],"questionsWordRecognition":['里', '巴', '狗']}]}
  , {"simplifiedChar":"他们","traditionalChar":"他們","category":"phrase","heteronyms":[{"pinyin":"tā men","definition":"they","audioSrc":"他们_0","explainerImagesSrc":[],"questionsWordRecognition":['起来', '地方', '好玩']}]}
  , {"simplifiedChar":"起来","traditionalChar":"起來","category":"phrase","heteronyms":[{"pinyin":"qǐ lái","definition":"to get up","audioSrc":"起来_0","explainerImagesSrc":[],"questionsWordRecognition":['地方', '好玩', '不见']}]}
  , {"simplifiedChar":"花","traditionalChar":"花","category":"word","heteronyms":[{"pinyin":"huā","definition":"flower","audioSrc":"花_0","explainerImagesSrc":['花_0'],"questionsWordRecognition":['天', '树', '狗']}]}
  , {"simplifiedChar":"天","traditionalChar":"天","category":"word","heteronyms":[{"pinyin":"tiān","definition":"sky","audioSrc":"天_0","explainerImagesSrc":['天_0'],"questionsWordRecognition":['白', '看', '口']}]}
  , {"simplifiedChar":"花园","traditionalChar":"花園","category":"phrase","heteronyms":[{"pinyin":"huā yuán","definition":"garden","audioSrc":"花园_0","explainerImagesSrc":['花园_0'],"questionsWordRecognition":['白天', '天空', '回家']}]}
  , {"simplifiedChar":"地","traditionalChar":"地","category":"word","heteronyms":[{"pinyin":"dì","definition":"ground","audioSrc":"地_0","explainerImagesSrc":[],"questionsWordRecognition":['鱼', '看', '见']}]}
  , {"simplifiedChar":"雨","traditionalChar":"雨","category":"word","heteronyms":[{"pinyin":"yǔ","definition":"rain","audioSrc":"雨_0","explainerImagesSrc":[],"questionsWordRecognition":['地', '出', '口']}]}
  , {"simplifiedChar":"鱼","traditionalChar":"魚","category":"word","heteronyms":[{"pinyin":"yú","definition":"fish","audioSrc":"鱼_0","explainerImagesSrc":['鱼_0'],"questionsWordRecognition":['地', '家', '白']}]}
  , {"simplifiedChar":"东西","traditionalChar":"東西","category":"phrase","heteronyms":[{"pinyin":"dōng xī","definition":"something","audioSrc":"东西_0","explainerImagesSrc":[],"questionsWordRecognition":['天空', '小鸟', '嘴巴']}]}
  , {"simplifiedChar":"小鸟","traditionalChar":"小鳥","category":"phrase","heteronyms":[{"pinyin":"xiǎo niǎo","definition":"bird","audioSrc":"小鸟_0","explainerImagesSrc":['小鸟_0'],"questionsWordRecognition":['朋友', '鱼儿', '冰雪']}]}
  , {"simplifiedChar":"鱼儿","traditionalChar":"魚兒","category":"phrase","heteronyms":[{"pinyin":"yú er","definition":"a young fish (anthropomorphic usage)","audioSrc":"鱼儿_0","explainerImagesSrc":[],"questionsWordRecognition":['听见', '包子', '东西']}]}
  , {"simplifiedChar":"舌","traditionalChar":"舌","category":"word","heteronyms":[{"pinyin":"shé","definition":"tongue","audioSrc":"舌_0","explainerImagesSrc":[],"questionsWordRecognition":['头', '上', '下']}]}
  , {"simplifiedChar":"地面","traditionalChar":"地面","category":"phrase","heteronyms":[{"pinyin":"dì miàn","definition":"ground","audioSrc":"地面_0","explainerImagesSrc":[],"questionsWordRecognition":['小鸟', '不见', '嘴巴']}]}
  , {"simplifiedChar":"舌头","traditionalChar":"舌頭","category":"phrase","heteronyms":[{"pinyin":"shé tou","definition":"tongue","audioSrc":"舌头_0","explainerImagesSrc":[],"questionsWordRecognition":['地面', '草地', '白天']}]}
  , {"simplifiedChar":"草地","traditionalChar":"草地","category":"phrase","heteronyms":[{"pinyin":"cǎo dì","definition":"grassland or lawn","audioSrc":"草地_0","explainerImagesSrc":[],"questionsWordRecognition":['地面', '好玩', '天空']}]}
  , {"simplifiedChar":"你好","traditionalChar":"你好","category":"phrase","heteronyms":[{"pinyin":"nǐ hǎo","definition":"how are you?","audioSrc":"你好_0","explainerImagesSrc":[],"questionsWordRecognition":['说话', '不见', '东西']}]}
  , {"simplifiedChar":"几只羊","traditionalChar":"幾隻羊","category":"phrase","heteronyms":[{"pinyin":"jǐ zhī yáng","definition":"sheep (a few)","audioSrc":"几只羊_0","explainerImagesSrc":[],"questionsWordRecognition":['三只熊', '冰淇淋', '听见']}]}
  , {"simplifiedChar":"说话","traditionalChar":"說話","category":"phrase","heteronyms":[{"pinyin":"shuō huà","definition":"to speak","audioSrc":"说话_0","explainerImagesSrc":[],"questionsWordRecognition":['嘴巴', '还好', '白天']}]}
  , {"simplifiedChar":"还好","traditionalChar":"還好","category":"phrase","heteronyms":[{"pinyin":"hái hǎo","definition":"are you okay? (when used as 你还好吗?)","audioSrc":"还好_0","explainerImagesSrc":[],"questionsWordRecognition":['说话', '回家', '草地']}]}
];

//clear old words, then add back
Word.find({}).remove(function() {
  Word.create(wordsData, function() {
    console.log('finished adding words');
  });
});

var storiesData = [
  {
    title: 'The Four Friends',
    chineseTitle: '四个小朋友',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    //order to be displayed among all the bokos
    index: 0,
    termIndex: 0,
    description: 'Meet Jack, a young magician, and his magical friends. What adventures await them?',
    //the same word can have multiple meanings; meaningIndex differentiates between them
    keywordsTaught: {
      elementary: [{simplifiedChar: '我', meaningIndex: 0}, {simplifiedChar: '你', meaningIndex: 0}, {simplifiedChar: '男', meaningIndex: 0}, {simplifiedChar: '女', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '我', meaningIndex: 0}, {simplifiedChar: '你', meaningIndex: 0}, {simplifiedChar: '他', meaningIndex: 0},
        {simplifiedChar: '女', meaningIndex: 0}, {simplifiedChar: '男', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'c6gdk50ybs',
        elementary: 'rmvcz7j0jk',
        intermediate: '1uhfp6b0i3'
      }
    },
    thumbnailsSrc: ['jaf_0_0.jpg']
  },
  {
    title: 'The Magic Competition',
    chineseTitle: '变魔术',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    index: 1,
    termIndex: 1,
    description: 'Jack wants to beat his older brother in a competition to magically transform Snowball, their toy rabbit. Who will prevail?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '一', meaningIndex: 0}, {simplifiedChar: '二', meaningIndex: 0}, {simplifiedChar: '三', meaningIndex: 0}, {simplifiedChar: '四', meaningIndex: 0}, {simplifiedChar: '五', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '爸', meaningIndex: 0}, {simplifiedChar: '妈', meaningIndex: 0}, {simplifiedChar: '哥', meaningIndex: 0},
        {simplifiedChar: '白', meaningIndex: 0}, {simplifiedChar: '只', meaningIndex: 0}, {simplifiedChar: '用', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'vgm765razy',
        elementary: 'ltepgbvblw',
        intermediate: '0cb87ds59a'
      }
    },
    thumbnailsSrc: ['jaf_0_1.jpg']
  },
  {
    title: 'The Mysterious Voice',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    chineseTitle: '谁在说话',
    index: 2,
    termIndex: 2,
    description: 'Jack is interrupted by a strange voice while he is practising...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '六', meaningIndex: 0}, {simplifiedChar: '七', meaningIndex: 0}, {simplifiedChar: '八', meaningIndex: 0}, {simplifiedChar: '九', meaningIndex: 0}, {simplifiedChar: '十', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '衣服', meaningIndex: 0}, {simplifiedChar: '长', meaningIndex: 0}, {simplifiedChar: '件', meaningIndex: 0},
        {simplifiedChar: '开心', meaningIndex: 0}, {simplifiedChar: '生气', meaningIndex: 0}]

    },
    codes: {
      englishSubtitles: {
        nursery: '5pnmb6q8x7',
        elementary: 'cquikq485a',
        intermediate: '6hea9qpnbn'
      }
    },
    thumbnailsSrc: ['jaf_0_2.jpg']
  },
  {
    title: 'Into The Hat We Go',
    chineseTitle: '杰杰不见了',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    index: 3,
    termIndex: 3,
    description: 'Snowball the Rabbit comes to life! Jack is stunned when his toy rabbit steals his wand...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '耳', meaningIndex: 0}, {simplifiedChar: '目', meaningIndex: 0}, {simplifiedChar: '口', meaningIndex: 0}, {simplifiedChar: '手', meaningIndex: 0}, {simplifiedChar: '大', meaningIndex: 0}, {simplifiedChar: '小', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '耳朵', meaningIndex: 0}, {simplifiedChar: '尾巴', meaningIndex: 0}, {simplifiedChar: '手', meaningIndex: 0},
        {simplifiedChar: '看', meaningIndex: 0}, {simplifiedChar: '拉', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'rcmv99e0oc',
        elementary: 'h9cpgk7i5m',
        intermediate: 'itp97s6t2l'
      }
    },
    thumbnailsSrc: ['jaf_0_3.jpg']
  },
  {
    title: 'Green Eyes',
    chineseTitle: '绿眼睛',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    index: 4,
    termIndex: 4,
    description: 'Jack and Snowball fall into a dark cave and notice a pair of green eyes in the dark... Is it friend or foe?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '回家', meaningIndex: 0}, {simplifiedChar: '白天', meaningIndex: 0}, {simplifiedChar: '黑', meaningIndex: 0}, {simplifiedChar: '看', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '黑夜', meaningIndex: 0}, {simplifiedChar: '白天', meaningIndex: 0}, {simplifiedChar: '回家', meaningIndex: 0},
       {simplifiedChar: '找', meaningIndex: 0}, {simplifiedChar: '亮', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'qk2gg3myvr',
        elementary: 'x607u83arf',
        intermediate: 'dudpdrgupq'
      }
    },
    thumbnailsSrc: ['jaf_0_4.jpg']
  },
  {
    title: 'The Imposter Rabbit',
    chineseTitle: '谁是玉玉',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    index: 5,
    termIndex: 5,
    description: 'Jack is shocked to see a rabbit that looks like Snowball and claims to be the real Snowball. What will he do?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '上', meaningIndex: 0}, {simplifiedChar: '下', meaningIndex: 0}, {simplifiedChar: '左', meaningIndex: 0}, {simplifiedChar: '右', meaningIndex: 0}, {simplifiedChar: '看', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '看见', meaningIndex: 0}, {simplifiedChar: '左边', meaningIndex: 0}, {simplifiedChar: '右边', meaningIndex: 0},
       {simplifiedChar: '大声', meaningIndex: 0}, {simplifiedChar: '小声', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'o97zwc4tgz',
        elementary: 'zw9j8iir04',
        intermediate: 'o8ogauqauj'
      }
    },
    thumbnailsSrc: ['jaf_0_5.jpg']
  },
  {
    title: 'The Reveal',
    chineseTitle: '你是谁',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    index: 6,
    termIndex: 6,
    description: 'Jack is having trouble deciding who is the real Snowball. Can you help him?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '头', meaningIndex: 0}, {simplifiedChar: '手', meaningIndex: 0}, {simplifiedChar: '耳朵', meaningIndex: 0}, {simplifiedChar: '红', meaningIndex: 0}, {simplifiedChar: '圆', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '双手', meaningIndex: 0}, {simplifiedChar: '用力', meaningIndex: 0}, {simplifiedChar: '分开', meaningIndex: 0},
        {simplifiedChar: '坐下', meaningIndex: 0}, {simplifiedChar: '走', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'ft0cc4vnk1',
        elementary: 'wnfmtmayr0',
        intermediate: 'mdi55r6d0s'
      }
    },
    thumbnailsSrc: ['jaf_0_6.jpg']
  },
  {
    title: 'The Fairy Appears',
    chineseTitle: '小机灵',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    index: 7,
    termIndex: 7,
    description: 'Ling the Fairy shows herself and claims to be able to bring Jack home. Who is she and what are her intentions?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '你', meaningIndex: 0}, {simplifiedChar: '我', meaningIndex: 0}, {simplifiedChar: '是', meaningIndex: 0}, {simplifiedChar: '来', meaningIndex: 0}, {simplifiedChar: '去', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '我', meaningIndex: 0}, {simplifiedChar: '你', meaningIndex: 0}, {simplifiedChar: '可以', meaningIndex: 0},
       {simplifiedChar: '不仅', meaningIndex: 0}, {simplifiedChar: '拉', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '6r5jl3cw1v',
        elementary: '0yp1jyqthl',
        intermediate: 'ciiawh7atv'
      }
    },
    thumbnailsSrc: ['jaf_0_7.jpg']
  },
  {
    title: 'Where Will They Go',
    chineseTitle: '去哪里',
    term: 'How Jack Arrived In The Fantasy World',
    termId: 'jaf_0',
    index: 8,
    termIndex: 8,
    description: 'Ling tells Jack a story of her past, and asks Jack and Snowball to follow her through a portal. Meanwhile, a mysterious ship appears...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '天空', meaningIndex: 0}, {simplifiedChar: '太阳', meaningIndex: 0}, {simplifiedChar: '白云', meaningIndex: 0}, {simplifiedChar: '月亮', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '天空', meaningIndex: 0}, {simplifiedChar: '太阳', meaningIndex: 0}, {simplifiedChar: '白云', meaningIndex: 0}, {simplifiedChar: '月亮', meaningIndex: 0}, {simplifiedChar: '森林', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'q6wz4d54et',
        elementary: 'l5sfqgn8di',
        intermediate: 'ips7paylj7'
      }
    },
    thumbnailsSrc: ['jaf_0_8.jpg']
  },
  {
    title: 'Pirate Bamboo',
    chineseTitle: '海盗熊猫',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 9,
    termIndex: 0,
    description: 'Jack and his friends emerge from the portal but they seem to be in the wrong place. Who will they meet?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '这', meaningIndex: 0}, {simplifiedChar: '里', meaningIndex: 0}, {simplifiedChar: '有', meaningIndex: 0}, {simplifiedChar: '他', meaningIndex: 0}, {simplifiedChar: '们', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '熊猫', meaningIndex: 0}, {simplifiedChar: '大海', meaningIndex: 0}, {simplifiedChar: '小船', meaningIndex: 0}, {simplifiedChar: '出现', meaningIndex: 0}, {simplifiedChar: '声音', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'swtla48f8i',
        elementary: 'q6l48k61lv',
        intermediate: 'xf88hddk38'
      },
      noSubtitles: {
        nursery: 'rubvv3ml6g',
        elementary: 'xhzx9v5hfi',
        intermediate: 'oljmfl9tq0'
      }
    },
    thumbnailsSrc: ['jaf_1_0.jpg']
  },
  {
    title: 'Trapped',
    chineseTitle: '不能走了',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 10,
    termIndex: 1,
    description: 'Jack and his friends are trapped aboard by Pirate Bamboo, who is angry and refuses to let them leave. What should they do?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '不', meaningIndex: 0}, {simplifiedChar: '可以', meaningIndex: 0}, {simplifiedChar: '坐', meaningIndex: 0}, {simplifiedChar: '在', meaningIndex: 0}, {simplifiedChar: '哭', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '这里', meaningIndex: 0}, {simplifiedChar: '做事', meaningIndex: 0}, {simplifiedChar: '扫地', meaningIndex: 0}, {simplifiedChar: '煮饭', meaningIndex: 0}, {simplifiedChar: '哭', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '9tnjv30qzy',
        elementary: 'af4d691buc',
        intermediate: '1sjqixp158'
      },
      noSubtitles: {
        nursery: '6o4x4zhl2e',
        elementary: '3nkdgcq9zq',
        intermediate: '6m281pg5tt'
      }
    },
    thumbnailsSrc: ['jaf_1_1.jpg']
  },
  {
    title: 'Mister Map',
    chineseTitle: '地图先生',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 11,
    termIndex: 2,
    description: 'To find Pirate Bamboo\'s gems, Jack and his friends will need the help of a mischievous map, who will only assist them if they manage to find him...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '宝石', meaningIndex: 0}, {simplifiedChar: '沙发', meaningIndex: 0}, {simplifiedChar: '找', meaningIndex: 0}, {simplifiedChar: '花盆', meaningIndex: 0}, {simplifiedChar: '里', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '先生', meaningIndex: 0}, {simplifiedChar: '告诉', meaningIndex: 0}, {simplifiedChar: '地图', meaningIndex: 0}, {simplifiedChar: '淘气', meaningIndex: 0}, {simplifiedChar: '面前', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '2zwjuhazpo',
        elementary: 'xxrc5o7tq0',
        intermediate: 'jnw6i9sdg6'
      },
      noSubtitles: {
        nursery: 'kwqjtiesn0',
        elementary: 'e8yecdmhqt',
        intermediate: 'z5o5tsodkj'
      }
    },
    thumbnailsSrc: ['jaf_1_2.jpg']
  },
  {
    title: 'Hide And Seek',
    chineseTitle: '捉迷藏',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 12,
    termIndex: 3,
    description: 'Jack and his friends search high and low aboard the pirate ship, only to find that Mister Map has laid out multiple traps for them in an epic game of hide and seek... Will they manage to catch him?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '分开', meaningIndex: 0}, {simplifiedChar: '吹', meaningIndex: 0}, {simplifiedChar: '灯', meaningIndex: 0}, {simplifiedChar: '灰', meaningIndex: 0}, {simplifiedChar: '风', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '吹向', meaningIndex: 0}, {simplifiedChar: '大风', meaningIndex: 0}, {simplifiedChar: '好玩', meaningIndex: 0}, {simplifiedChar: '旁边', meaningIndex: 0}, {simplifiedChar: '灰尘', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'wy8p010q2c',
        elementary: '6m8js8r6nh',
        intermediate: 'nsj1525c0g'
      },
      noSubtitles: {
        nursery: 'kwqjtiesn0',
        elementary: 'o44lfv71pn',
        intermediate: '287w34i666'
      }
    },
    thumbnailsSrc: ['jaf_1_3.jpg']
  },
  {
    title: 'The Magical Map',
    chineseTitle: '魔幻地图',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 13,
    termIndex: 4,
    description: 'Jack and his friends rescue Mister Map in the nick of time, and in return he agrees to help them. Where are the gems located?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '地图', meaningIndex: 0}, {simplifiedChar: '东', meaningIndex: 0}, {simplifiedChar: '南', meaningIndex: 0}, {simplifiedChar: '西', meaningIndex: 0}, {simplifiedChar: '北', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '全身', meaningIndex: 0}, {simplifiedChar: '出发', meaningIndex: 0}, {simplifiedChar: '力气', meaningIndex: 0}, {simplifiedChar: '害怕', meaningIndex: 0}, {simplifiedChar: '飞快', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'l6j67eph4p',
        elementary: '0s31qv1opk',
        intermediate: '31j4qdeu6b'
      },
      noSubtitles: {
        nursery: 'g1ggaknh6h',
        elementary: 'yd1vad72sh',
        intermediate: 'gz3v224ss0'
      }
    },
    thumbnailsSrc: ['jaf_1_4.jpg']
  },
  {
    title: 'Rain',
    chineseTitle: '下雨了',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 14,
    termIndex: 5,
    description: 'Pirate Bamboo is drenched in a storm, causing him to shrink. Jack and his friends try to help him, and learn an important lesson.',
    keywordsTaught: {
      elementary: [{simplifiedChar: '下雨', meaningIndex: 0}, {simplifiedChar: '大海', meaningIndex: 0}, {simplifiedChar: '小船', meaningIndex: 0}, {simplifiedChar: '晒', meaningIndex: 0}, {simplifiedChar: '雷', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '乌云', meaningIndex: 0}, {simplifiedChar: '打雷', meaningIndex: 0}, {simplifiedChar: '淋湿', meaningIndex: 0}, {simplifiedChar: '雨水', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'bwjzi16n47',
        elementary: '7kgkgnozta',
        intermediate: 'fs7mcaq7kt'
      },
      noSubtitles: {
        nursery: 'mc3t0qrf4s',
        elementary: 'ih6u1p0yfj',
        intermediate: '7kpu08jfox'
      }
    },
    thumbnailsSrc: ['jaf_1_5.jpg']
  },
  {
    title: 'Appreciating Mummy',
    chineseTitle: '妈妈辛苦了',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 15,
    termIndex: 6,
    description: 'This Mother\'s Day, join Jack on an adventure around Singapore as he discovers how much his mother loves him.',
    keywordsTaught: {
      elementary: [{simplifiedChar: '日', meaningIndex: 0}, {simplifiedChar: '历', meaningIndex: 0}, {simplifiedChar: '母', meaningIndex: 0}, {simplifiedChar: '亲', meaningIndex: 0}, {simplifiedChar: '节', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '每年', meaningIndex: 0}, {simplifiedChar: '母亲', meaningIndex: 0}, {simplifiedChar: '快乐', meaningIndex: 0}, {simplifiedChar: '长大', meaningIndex: 0}, {simplifiedChar: '节', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '8mjzrmwsba',
        elementary: 'mybele73g4',
        intermediate: '3wt25w3cxt'
      },
      noSubtitles: {
        nursery: 'uzy9ncox4i',
        elementary: 'twx7y20oe2',
        intermediate: 'nsvuxp828h'
      }
    },
    thumbnailsSrc: ['jaf_1_6.jpg']
  },
  {
    title: 'I Love You Mummy',
    chineseTitle: '妈妈我爱你',
    term: 'Meeting Pirate Bamboo',
    termId: 'jaf_1',
    index: 16,
    termIndex: 7,
    description: 'Jack decides to make a Mother\'s Day present and learns that his mother\'s love for him is unconditional.',
    keywordsTaught: {
      elementary: [{simplifiedChar: '花朵', meaningIndex: 0}, {simplifiedChar: '蛋糕', meaningIndex: 0}, {simplifiedChar: '快乐', meaningIndex: 0}, {simplifiedChar: '爱', meaningIndex: 0}, {simplifiedChar: '都', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '今天', meaningIndex: 0}, {simplifiedChar: '礼物', meaningIndex: 0}, {simplifiedChar: '美丽', meaningIndex: 0}, {simplifiedChar: '喜欢', meaningIndex: 0}, {simplifiedChar: '爱', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'uz5rtkz6eo',
        elementary: '1nq7y7d5ry',
        intermediate: '69q0dd52np'
      },
      noSubtitles: {
        nursery: 'qxwmde3say',
        elementary: '7uhlnk37kg',
        intermediate: 'p81yn8dvdy'
      }
    },
    thumbnailsSrc: ['jaf_1_7.jpg']
  },
  {
    title: 'Veggie The Pig',
    chineseTitle: '猪小弟',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 17,
    termIndex: 0,
    description: 'Jack and his friends approach the first island, but are attacked by Veggie the Pig. What will they do?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '岛', meaningIndex: 0}, {simplifiedChar: '扔', meaningIndex: 0}, {simplifiedChar: '捡', meaningIndex: 0}, {simplifiedChar: '番茄', meaningIndex: 0}, {simplifiedChar: '鸟', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '到达', meaningIndex: 0}, {simplifiedChar: '开始', meaningIndex: 0}, {simplifiedChar: '漂来', meaningIndex: 0}, {simplifiedChar: '番茄', meaningIndex: 0}, {simplifiedChar: '远处', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '3qigqjoyox',
        elementary: '9czge8onug',
        intermediate: 'ue03owd29y'
      },
      noSubtitles: {
        nursery: 's2qdl5zir5',
        elementary: 'w3tb0hvrow',
        intermediate: '1xfdxttqa0'
      }
    },
    thumbnailsSrc: ['jaf_2_0.jpg']
  },
  {
    title: 'Harvesting',
    chineseTitle: '收菜',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 18,
    termIndex: 1,
    description: 'Jack and his friends agree to help Veggie help harvest his vegetables. However, Ling decides to play a trick on Pirate Bamboo...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '南瓜', meaningIndex: 0}, {simplifiedChar: '吃', meaningIndex: 0}, {simplifiedChar: '摘', meaningIndex: 0}, {simplifiedChar: '比', meaningIndex: 0}, {simplifiedChar: '菜', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '努力', meaningIndex: 0}, {simplifiedChar: '南瓜', meaningIndex: 0}, {simplifiedChar: '发抖', meaningIndex: 0}, {simplifiedChar: '吓', meaningIndex: 0}, {simplifiedChar: '愿意', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'me6nm0zu4r',
        elementary: '8y1o3bfx9z',
        intermediate: 'b74xhjh41v'
      },
      noSubtitles: {
        nursery: 'm0ad231rly',
        elementary: 'eusq9jx3lt',
        intermediate: 'jd2e2ml0ls'
      }
    },
    thumbnailsSrc: ['jaf_2_1.jpg']
  },
  {
    title: 'Carrots',
    chineseTitle: '拔萝卜',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 19,
    termIndex: 2,
    description: 'Jack and his friends are unable to pull out a giant carrot and decide to work together as a team to pull it out. However, they accidentally release Snatcher the Wolf... ',
    keywordsTaught: {
      elementary: [{simplifiedChar: '很多', meaningIndex: 0}, {simplifiedChar: '拔', meaningIndex: 0}, {simplifiedChar: '用力', meaningIndex: 0}, {simplifiedChar: '萝卜', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '办法', meaningIndex: 0}, {simplifiedChar: '想出', meaningIndex: 0}, {simplifiedChar: '拔出', meaningIndex: 0}, {simplifiedChar: '萝卜', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'rrvhvtg6p5',
        elementary: '0p9wxukj2l',
        intermediate: 'gxnozl3rg7'
      },
      noSubtitles: {
        nursery: 'i3d2czrix1',
        elementary: 's1vr7mkqiy',
        intermediate: 'n8a8e3zkd9'
      }
    },
    thumbnailsSrc: ['jaf_2_2.jpg']
  },
  {
    title: 'The Blue Gem',
    chineseTitle: '蓝色宝石',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 20,
    termIndex: 3,
    description: 'Jack and his friends hide in Veggie\'s hay hut to hide from Snatcher, only to find that Snatcher has magical weapons...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '入', meaningIndex: 0}, {simplifiedChar: '吐', meaningIndex: 0}, {simplifiedChar: '吸', meaningIndex: 0}, {simplifiedChar: '嘴巴', meaningIndex: 0}, {simplifiedChar: '水果', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '吐出', meaningIndex: 0}, {simplifiedChar: '安全', meaningIndex: 0}, {simplifiedChar: '水果', meaningIndex: 0}, {simplifiedChar: '草屋', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '9z50t6mbdq',
        elementary: 'yjoto107a3',
        intermediate: 'u8abe2ylxs'
      },
      noSubtitles: {
        nursery: 'age27g2y1w',
        elementary: 'lwmrdww6jy',
        intermediate: 't4bq5xdafu'
      }
    },
    thumbnailsSrc: ['jaf_2_3.jpg']
  },
  {
    title: 'Fruity The Pig',
    chineseTitle: '猪二哥',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 21,
    termIndex: 4,
    description: 'Snatcher tries to force Fruity into giving him his gem, and Fruity decides to fight back. Will he manage to defend his gem from Snatcher?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '木屋', meaningIndex: 0}, {simplifiedChar: '树', meaningIndex: 0}, {simplifiedChar: '苹果', meaningIndex: 0}, {simplifiedChar: '西瓜', meaningIndex: 0}, {simplifiedChar: '香蕉', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '偷看', meaningIndex: 0}, {simplifiedChar: '悄悄', meaningIndex: 0}, {simplifiedChar: '树下', meaningIndex: 0}, {simplifiedChar: '苹果', meaningIndex: 0}, {simplifiedChar: '躲', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '0qzvsxe4q1',
        elementary: '5l5lxvkqtg',
        intermediate: 'ffe56rczax'
      },
      noSubtitles: {
        nursery: 'uyqelhul2t',
        elementary: 'gehunuoytv',
        intermediate: 'k421s0fys4'
      }
    },
    thumbnailsSrc: ['jaf_2_4.jpg']
  },
  {
    title: 'The Orange Gem',
    chineseTitle: '橙色宝石',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 22,
    termIndex: 5,
    description: 'Fruity and his orange gem are blown onto Pirate Bamboo\'s ship. However, Snatcher appears suddenly and tries to steal the gem.',
    keywordsTaught: {
      elementary: [{simplifiedChar: '抓住', meaningIndex: 0}, {simplifiedChar: '橙', meaningIndex: 0}, {simplifiedChar: '跳', meaningIndex: 0}, {simplifiedChar: '飞来', meaningIndex: 0}, {simplifiedChar: '马上', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '互相', meaningIndex: 0}, {simplifiedChar: '吸进', meaningIndex: 0}, {simplifiedChar: '担心', meaningIndex: 0}, {simplifiedChar: '橙色', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'isj6ubgdpr',
        elementary: '33u4swds2u',
        intermediate: 'kq3ki5vuc5'
      },
      noSubtitles: {
        nursery: 'cd6l7x0h9u',
        elementary: '744csq52si',
        intermediate: '1r95zj0ioe'
      }
    },
    thumbnailsSrc: ['jaf_2_5.jpg']
  },
  {
    title: 'Porky The Pig',
    chineseTitle: '猪大哥',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 23,
    termIndex: 6,
    description: 'Porky the Pig is alarmed when he hears warnings that Snatcher has been sighted. He sees Pirate Bamboo\'s ship and mistakes it for Snatcher\'s ship...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '狗', meaningIndex: 0}, {simplifiedChar: '猪', meaningIndex: 0}, {simplifiedChar: '羊', meaningIndex: 0}, {simplifiedChar: '蛋', meaningIndex: 0}, {simplifiedChar: '鸡', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '叼走', meaningIndex: 0}, {simplifiedChar: '喂鸡', meaningIndex: 0}, {simplifiedChar: '小狗', meaningIndex: 0}, {simplifiedChar: '羊群', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '7s53pijanf',
        elementary: '004c9tfn2w',
        intermediate: 'w3ixh6zw25'
      },
      noSubtitles: {
        nursery: 'gs69m8ae5n',
        elementary: 'e3r5bp4iy3',
        intermediate: '3v59sebev0'
      }
    },
    thumbnailsSrc: ['jaf_2_6.jpg']
  },
  {
    title: 'The Immovable Force',
    chineseTitle: '吹不动',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 24,
    termIndex: 7,
    description: 'Snatcher appears and tries to steal the orange gem, but what happens when Jack and his friends manage to get their hands on his magical fan?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '咬', meaningIndex: 0}, {simplifiedChar: '坏', meaningIndex: 0}, {simplifiedChar: '扇', meaningIndex: 0}, {simplifiedChar: '牛', meaningIndex: 0}, {simplifiedChar: '马', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '保护', meaningIndex: 0}, {simplifiedChar: '农场', meaningIndex: 0}, {simplifiedChar: '动物', meaningIndex: 0}, {simplifiedChar: '害怕', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '553vft6vqw',
        elementary: '48629mos7q',
        intermediate: 'snb3667428'
      },
      noSubtitles: {
        nursery: '3mn5i42nvf',
        elementary: 'oaarhg0dv0',
        intermediate: 'r2u31kk8eo'
      }
    },
    thumbnailsSrc: ['jaf_2_7.jpg']
  },
  {
    title: 'Snatcher\'s Gourd',
    chineseTitle: '小偷狼的葫芦',
    term: 'Three Little Gems',
    termId: 'jaf_2',
    index: 25,
    termIndex: 8,
    description: 'Snatcher manages to enter Porky\'s house, and tries to steal the remaining gem. How will Jack and his friends react?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '掉', meaningIndex: 0}, {simplifiedChar: '狼', meaningIndex: 0}, {simplifiedChar: '猫', meaningIndex: 0}, {simplifiedChar: '破', meaningIndex: 0}, {simplifiedChar: '葫芦', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '冒出', meaningIndex: 0}, {simplifiedChar: '厉害', meaningIndex: 0}, {simplifiedChar: '摔破', meaningIndex: 0}, {simplifiedChar: '葫芦', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'n8vmj5xl0a',
        elementary: 'wg8nl4t0zg',
        intermediate: '6u43ybspjt'
      },
      noSubtitles: {
        nursery: 'azf0um8d25',
        elementary: 'xuh6k8awsd',
        intermediate: 'z1q2pez4jm'
      }
    },
    thumbnailsSrc: ['jaf_2_8.jpg']
  },
  {
    title: 'The Way Back',
    chineseTitle: '回家的方法',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 26,
    termIndex: 0,
    description: 'To help Jack get back home, his friends decide to head for the Ice and Snow Island, which contains a magical door. What dangers and surprises awaits them?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '冰', meaningIndex: 0}, {simplifiedChar: '堆', meaningIndex: 0}, {simplifiedChar: '漂', meaningIndex: 0}, {simplifiedChar: '玩球', meaningIndex: 0}, {simplifiedChar: '雪人', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '乘船', meaningIndex: 0}, {simplifiedChar: '冰雪', meaningIndex: 0}, {simplifiedChar: '地方', meaningIndex: 0}, {simplifiedChar: '寒冷', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: '8g77vh60zy',
        elementary: 'letwe6689h',
        intermediate: '4g0tl2gkta'
      },
      noSubtitles: {
        nursery: 'r6vm548oro',
        elementary: 'skaotid58x',
        intermediate: '1uthwa01br'
      }
    },
    thumbnailsSrc: ['jaf_3_0.jpg']
  },
  {
    title: 'The Magicial Ice Cream',
    chineseTitle: '魔法冰淇淋',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 27,
    termIndex: 1,
    description: 'On the Ice and Snow Island, a penguin stumbles upon the home of The Three Bears while they are not at home and discover bowls of magical ice cream.',
    keywordsTaught: {
      elementary: [{simplifiedChar: '冰淇淋', meaningIndex: 0}, {simplifiedChar: '吃', meaningIndex: 0}, {simplifiedChar: '熊', meaningIndex: 0}, {simplifiedChar: '碗', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '企鹅', meaningIndex: 0}, {simplifiedChar: '冰屋', meaningIndex: 0}, {simplifiedChar: '吃光', meaningIndex: 0}, {simplifiedChar: '走进', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'klok0rbytn',
        elementary: '1q5rxyrwbc',
        intermediate: 'ek84d1nqt6'
      },
      noSubtitles: {
        nursery: 'l4rh7uksy4',
        elementary: 'c4jtbw7lgw',
        intermediate: 'mz6sepytxx'
      }
    },
    thumbnailsSrc: ['jaf_3_1.jpg']
  },
  {
    title: 'The Little Penguin',
    chineseTitle: '小企鹅',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 28,
    termIndex: 2,
    description: 'The Three Bears return home and find the penguin snacking on their ice cream. Enraged, they kick the penguin out of their house and send it flying...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '云', meaningIndex: 0}, {simplifiedChar: '冰冻', meaningIndex: 0}, {simplifiedChar: '冰块', meaningIndex: 0}, {simplifiedChar: '冰雪', meaningIndex: 0}, {simplifiedChar: '冷', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '三只熊', meaningIndex: 0}, {simplifiedChar: '发现', meaningIndex: 0}, {simplifiedChar: '回来', meaningIndex: 0}, {simplifiedChar: '空碗', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'whixcdyfg6',
        elementary: '76yq8s3zgp',
        intermediate: '0fcrydmlt2'
      },
      noSubtitles: {
        nursery: '4sds55krxs',
        elementary: '2xvgxh0tmp',
        intermediate: '6bhgii10sb'
      }
    },
    thumbnailsSrc: ['jaf_3_2.jpg']
  },
  {
    title: 'The Disguise',
    chineseTitle: '假扮雪人',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 29,
    termIndex: 3,
    description: 'Jack and his friends meet the little penguin who advises them to eat the magical ice cream to hide from the mountain giant...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '冰山', meaningIndex: 0}, {simplifiedChar: '化', meaningIndex: 0}, {simplifiedChar: '巨人', meaningIndex: 0}, {simplifiedChar: '火', meaningIndex: 0}, {simplifiedChar: '高大', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '冰块', meaningIndex: 0}, {simplifiedChar: '出现', meaningIndex: 0}, {simplifiedChar: '变成', meaningIndex: 0}, {simplifiedChar: '火球', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'etgdrufl2d',
        elementary: '6txlb4u79i',
        intermediate: '3gphqujcr5'
      },
      noSubtitles: {
        nursery: 'kvoc0rzm2f',
        elementary: 'u8s58p8bu5',
        intermediate: '3wbwtcsrii'
      }
    },
    thumbnailsSrc: ['jaf_3_3.jpg']
  },
  {
    title: 'The Giant Snowman',
    chineseTitle: '巨雪人',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 30,
    termIndex: 4,
    description: 'Jack and his friends trick the giant snowman using their disguises but just as they pass him, Snowball sneezes, revealing his pointy ears...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '山坡', meaningIndex: 0}, {simplifiedChar: '桥', meaningIndex: 0}, {simplifiedChar: '跑', meaningIndex: 0}, {simplifiedChar: '跟', meaningIndex: 0}, {simplifiedChar: '跳', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '查看', meaningIndex: 0}, {simplifiedChar: '桥边', meaningIndex: 0}, {simplifiedChar: '爬山', meaningIndex: 0}, {simplifiedChar: '靠近', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'fv9u3zren6',
        elementary: '9pn91cxrqx',
        intermediate: 'mfcjsqxx0e'
      },
      noSubtitles: {
        nursery: 'bhzvbujeox',
        elementary: 'dl1ayrzrok',
        intermediate: '0gpmv6rmwc'
      }
    },
    thumbnailsSrc: ['jaf_3_4.jpg']
  },
  {
    title: 'Jack Returns Home',
    chineseTitle: '杰杰回家了',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 31,
    termIndex: 5,
    description: 'Jack and his friends are caught by the giant snowman who is threatening to eat them. Who will rescue them?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '出去', meaningIndex: 0}, {simplifiedChar: '抬', meaningIndex: 0}, {simplifiedChar: '脚', meaningIndex: 0}, {simplifiedChar: '踢', meaningIndex: 0}, {simplifiedChar: '飞', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '消失', meaningIndex: 0}, {simplifiedChar: '竹棍', meaningIndex: 0}, {simplifiedChar: '闪开', meaningIndex: 0}, {simplifiedChar: '飞快', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        nursery: 'zljmluwpl2',
        elementary: 'lvi8byb88j',
        intermediate: '0rdmy7va81'
      },
      noSubtitles: {
        nursery: 'mpx7yhhzjx',
        elementary: 'uce1mz1s39',
        intermediate: 'zxpzikxlp6'
      }
    },
    thumbnailsSrc: ['jaf_3_5.jpg']
  },
  {
    title: 'The Magical Forest',
    chineseTitle: '魔幻森林',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 32,
    termIndex: 6,
    description: 'During Christmas, Jack accidentally enters a magical world and meets his old friends who are headed for the magical tree to get Christmas presents...',
    keywordsTaught: {
      elementary: [],
      intermediate: []
    },
    codes: {
      englishSubtitles: {
        nursery: 'kgitsy491e',
        elementary: 'kgitsy491e',
        intermediate: 'gzacwi847v'
      },
      noSubtitles: {
        nursery: 'j1dhelh6o1',
        elementary: 'j1dhelh6o1',
        intermediate: 'vumb1dqzaw'
      }
    },
    thumbnailsSrc: ['jaf_3_6.jpg']
  },
  {
    title: 'The Magical Tree',
    chineseTitle: '魔法树',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 33,
    termIndex: 7,
    description: 'Jack and his friends take turns receiving gifts from the magical tree, much to the fury of Snatcher the Wolf who does not have any presents. Snatcher decides to steal the presents...',
    keywordsTaught: {
      elementary: [],
      intermediate: []
    },
    codes: {
      englishSubtitles: {
        nursery: '0ttagx68u8',
        elementary: '0ttagx68u8',
        intermediate: '4x19owewsv'
      },
      noSubtitles: {
        nursery: '072g979dbt',
        elementary: '072g979dbt',
        intermediate: '7osr1wva9f'
      }
    },
    thumbnailsSrc: ['jaf_3_7.jpg']
  },
  {
    title: 'The Hero Arrives',
    chineseTitle: '谁来帮忙?',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 34,
    termIndex: 8,
    description: 'Snatcher steals the presents from Jack and his friends, and blow them away with his magical fan. They request help from Pirate Bamboo, who tracks down Snatcher the Wolf who trys to blow them away...',
    keywordsTaught: {
      elementary: [],
      intermediate: []
    },
    codes: {
      englishSubtitles: {
        nursery: 'ca6kn6smbt',
        elementary: 'ca6kn6smbt',
        intermediate: 'pz37cycco0'
      },
      noSubtitles: {
        nursery: 'wlcokuos5x',
        elementary: 'wlcokuos5x',
        intermediate: 'sbgz390jeh'
      }
    },
    thumbnailsSrc: ['jaf_3_8.jpg']
  },
  {
    title: 'The Resolution',
    chineseTitle: '找回礼物',
    term: 'The End Of A Journey',
    termId: 'jaf_3',
    index: 35,
    termIndex: 9,
    description: 'Jack and his friends manage to defend themselves against Snatcher\'s attacks, but discover a sad truth...',
    keywordsTaught: {
      elementary: [],
      intermediate: []
    },
    codes: {
      englishSubtitles: {
        nursery: 'vwrmuouw19',
        elementary: 'vwrmuouw19',
        intermediate: '48hgr8me1m'
      },
      noSubtitles: {
        nursery: 'ay6o94fi36',
        elementary: 'ay6o94fi36',
        intermediate: 'gfvg41wmda'
      }
    },
    thumbnailsSrc: ['jaf_3_9.jpg']
  },        
  {
    title: 'Where shall we go?',
    chineseTitle: '去哪里',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 36,
    termIndex: 0,
    description: 'Meet Bamboo, a pirate panda, and his younger sister Mei Mei. What adventures await them?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '你', meaningIndex: 0}, {simplifiedChar: '哥', meaningIndex: 0}, {simplifiedChar: '妹', meaningIndex: 0}, {simplifiedChar: '我', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '你们', meaningIndex: 0}, {simplifiedChar: '它们', meaningIndex: 0}, {simplifiedChar: '我们', meaningIndex: 0}, {simplifiedChar: '问', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'gngxm2ywr3',
        intermediate: 'ak2lr1rxtf'
      },
      noSubtitles: {
        elementary: 'ujbv2645lh',
        intermediate: 'xjrp7lp03g'
      }
    },
    thumbnailsSrc: ['hdxm_0_0.jpg']
  },
  {
    title: 'Red Riding Hood and the Wolf',
    chineseTitle: '小红帽与小狼',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 37,
    termIndex: 1,
    description: 'While conjuring up food, Red Riding Hood is asked by a wolf to make food for him. What will she say?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '小', meaningIndex: 0}, {simplifiedChar: '开', meaningIndex: 0}, {simplifiedChar: '手', meaningIndex: 0}, {simplifiedChar: '门', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '书包', meaningIndex: 0}, {simplifiedChar: '好香', meaningIndex: 0}, {simplifiedChar: '面包', meaningIndex: 0}, {simplifiedChar: '鼻子', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: '8ehh3b3zak',
        intermediate: 'nriwx0foo0'
      },
      noSubtitles: {
        elementary: 'yz3a49z1u2',
        intermediate: 'ps2w3r76ok'
      }
    },
    thumbnailsSrc: ['hdxm_0_1.jpg']
  },
  {
    title: 'The seven-coloured fruit tree',
    chineseTitle: '七色果树',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 38,
    termIndex: 2,
    description: 'Pirate Bamboo and Mei Mei discover a tree that has seven-colured fruits with magical abilities...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '七', meaningIndex: 0}, {simplifiedChar: '个', meaningIndex: 0}, {simplifiedChar: '子', meaningIndex: 0}, {simplifiedChar: '果', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '下去', meaningIndex: 0}, {simplifiedChar: '果子', meaningIndex: 0}, {simplifiedChar: '长大', meaningIndex: 0}, {simplifiedChar: '长手', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'k3t08o4osp',
        intermediate: 'p9k1xm1jda'
      },
      noSubtitles: {
        elementary: 'nz3k7e9dlv',
        intermediate: 't8gq2rf12j'
      }
    },
    thumbnailsSrc: ['hdxm_0_2.jpg']
  },
  {
    title: 'The greedy wolf',
    chineseTitle: '贪吃的小郎',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 39,
    termIndex: 3,
    description: 'Red Riding Hood makes food for the wolf, but when she can no longer produce more food, the wolf tries to take her basket by force...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '口', meaningIndex: 0}, {simplifiedChar: '大', meaningIndex: 0}, {simplifiedChar: '太', meaningIndex: 0}, {simplifiedChar: '好', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '包子', meaningIndex: 0}, {simplifiedChar: '听见', meaningIndex: 0}, {simplifiedChar: '嘴巴', meaningIndex: 0}, {simplifiedChar: '声音', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: '1pt60grjkb',
        intermediate: 'iwjvpz6q32'
      },
      noSubtitles: {
        elementary: '5zzcc2dki0',
        intermediate: '5agx1tkz8f'
      }
    },
    thumbnailsSrc: ['hdxm_0_3.jpg']
  },
  {
    title: 'Grandma\'s house',
    chineseTitle: '奶奶的家',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 40,
    termIndex: 4,
    description: 'Pirate Bamboo and Mei Mei come to the resuce of Red Riding Hood and save her from the wolf. The wolf decides to ambush them at Grandma\'s place...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '不', meaningIndex: 0}, {simplifiedChar: '吃', meaningIndex: 0}, {simplifiedChar: '她', meaningIndex: 0}, {simplifiedChar: '要', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '不见', meaningIndex: 0}, {simplifiedChar: '这是', meaningIndex: 0}, {simplifiedChar: '那是', meaningIndex: 0}, {simplifiedChar: '马上', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: '899hk0pe0d',
        intermediate: 'itqwenja1n'
      },
      noSubtitles: {
        elementary: 'dtj5ftrsmu',
        intermediate: 'k2ahntnxpz'
      }
    },
    thumbnailsSrc: ['hdxm_0_4.jpg']
  },
  {
    title: 'Who is the real grandma?',
    chineseTitle: '真假奶奶',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 41,
    termIndex: 5,
    description: 'The wolf kidnaps grandma and pretends to be her to trick Red Riding Hood into making more food for him. Will he succed?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '去', meaningIndex: 0}, {simplifiedChar: '来', meaningIndex: 0}, {simplifiedChar: '走', meaningIndex: 0}, {simplifiedChar: '这', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '今天', meaningIndex: 0}, {simplifiedChar: '木屋', meaningIndex: 0}, {simplifiedChar: '正在', meaningIndex: 0}, {simplifiedChar: '看书', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'vrck6gjmqr',
        intermediate: 'hg9f2i2sx1'
      },
      noSubtitles: {
        elementary: '0wd38fxem8',
        intermediate: 'dxeukkj6by'
      }
    },
    thumbnailsSrc: ['hdxm_0_5.jpg']
  },
  {
    title: 'Where is grandma?',
    chineseTitle: '奶奶在哪里',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 42,
    termIndex: 6,
    description: 'The wolf pretends to be grandma to trick Red Riding Hood into making him more food, but he is discovered. What will Red Riding Hood and her friends do?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '多', meaningIndex: 0}, {simplifiedChar: '家', meaningIndex: 0}, {simplifiedChar: '有', meaningIndex: 0}, {simplifiedChar: '里', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '出去', meaningIndex: 0}, {simplifiedChar: '可以', meaningIndex: 0}, {simplifiedChar: '大家', meaningIndex: 0}, {simplifiedChar: '朋友', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'ztoxoub2bs',
        intermediate: 'bafcrag5kk'
      },
      noSubtitles: {
        elementary: 'lkyjcerwzw',
        intermediate: 'px2esr3ick'
      }
    },
    thumbnailsSrc: ['hdxm_0_6.jpg']
  },
  {
    title: 'The little bad wolf',
    chineseTitle: '坏小狼',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 43,
    termIndex: 7,
    description: 'Pirate Bamboo attempts to use his rods to trap the wolf but the wolf has one more trick up his sleeve...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '出', meaningIndex: 0}, {simplifiedChar: '回', meaningIndex: 0}, {simplifiedChar: '看', meaningIndex: 0}, {simplifiedChar: '见', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '回家', meaningIndex: 0}, {simplifiedChar: '回来', meaningIndex: 0}, {simplifiedChar: '好吃', meaningIndex: 0}, {simplifiedChar: '自己', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: '29qpe3sior',
        intermediate: 'vxmsi07ds6'
      },
      noSubtitles: {
        elementary: 'pjsdh841nk',
        intermediate: 'm07j515s2g'
      }
    },
    thumbnailsSrc: ['hdxm_0_7.jpg']
  },
  {
    title: 'The reunion',
    chineseTitle: '大团圆',
    term: 'Red Riding Hood',
    termId: 'hdxm_0',
    index: 44,
    termIndex: 8,
    description: 'Pirate Bamboo confronts the wolf who is trying to make food for himself but is failing. What will they do?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '他', meaningIndex: 0}, {simplifiedChar: '巴', meaningIndex: 0}, {simplifiedChar: '狗', meaningIndex: 0}, {simplifiedChar: '玩', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '他们', meaningIndex: 0}, {simplifiedChar: '地方', meaningIndex: 0}, {simplifiedChar: '好玩', meaningIndex: 0}, {simplifiedChar: '起来', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'yrfaj2zqlc',
        intermediate: 'wqttctnbcy'
      },
      noSubtitles: {
        elementary: 'kc2tdlo540',
        intermediate: 'ur03wvg0wl'
      }
    },
    thumbnailsSrc: ['hdxm_0_8.jpg']
  },
  {
    title: 'A fun place',
    chineseTitle: '好玩的地方',
    term: 'Candy Land',
    termId: 'hdxm_1',
    index: 45,
    termIndex: 0,
    description: 'Mei Mei is bored and wants to go on another adventure with Pirate Bamboo but he is asleep. What will she do and where will they go?',
    keywordsTaught: {
      elementary: [{simplifiedChar: '云', meaningIndex: 0}, {simplifiedChar: '天', meaningIndex: 0}, {simplifiedChar: '白', meaningIndex: 0}, {simplifiedChar: '花', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '天空', meaningIndex: 0}, {simplifiedChar: '有', meaningIndex: 0}, {simplifiedChar: '白云', meaningIndex: 0}, {simplifiedChar: '花园', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'qxbh6fvzhq',
        intermediate: 'zja44jl5t6'
      },
      noSubtitles: {
        elementary: 'iim03e5qzc',
        intermediate: '3emzofhxpt'
      }
    },
    thumbnailsSrc: ['hdxm_1_0.jpg']
  },
  {
    title: 'Candy sister appears',
    chineseTitle: '糖果姐姐',
    term: 'Candy Land',
    termId: 'hdxm_1',
    index: 46,
    termIndex: 1,
    description: 'Far above the clouds of Candy Land, Candy Sister is playing with her candy wheel that produces magical candy that can transform people. However, some of the candy accidentally fall to the ground...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '地', meaningIndex: 0}, {simplifiedChar: '雨', meaningIndex: 0}, {simplifiedChar: '鱼', meaningIndex: 0}, {simplifiedChar: '鸟', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '下雨', meaningIndex: 0}, {simplifiedChar: '东西', meaningIndex: 0}, {simplifiedChar: '小鸟', meaningIndex: 0}, {simplifiedChar: '鱼儿', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'vmcjg2vub4',
        intermediate: 'ogflp2terf'
      },
      noSubtitles: {
        elementary: 'riwlys1kbn',
        intermediate: '388swk0abp'
      }
    },
    thumbnailsSrc: ['hdxm_1_1.jpg']
  },
  {
    title: 'Jack and the magical candy',
    chineseTitle: '杰克吃糖果',
    term: 'Candy Land',
    termId: 'hdxm_1',
    index: 47,
    termIndex: 2,
    description: 'Jack discovers a giant candy cane that rises to the sky and climbs it. He meets with Candy Sister who gives him magical candy...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '上', meaningIndex: 0}, {simplifiedChar: '下', meaningIndex: 0}, {simplifiedChar: '头', meaningIndex: 0}, {simplifiedChar: '舌', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '地面', meaningIndex: 0}, {simplifiedChar: '舌头', meaningIndex: 0}, {simplifiedChar: '草地', meaningIndex: 0}, {simplifiedChar: '这里', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'y037jvlddu',
        intermediate: 'g5vosnmcma'
      },
      noSubtitles: {
        elementary: 'yeaxwecozb',
        intermediate: 'r54cetpujk'
      }
    },
    thumbnailsSrc: ['hdxm_1_2.jpg']
  },
  {
    title: 'Naughty Jack',
    chineseTitle: '坏杰克',
    term: 'Candy Land',
    termId: 'hdxm_1',
    index: 48,
    termIndex: 3,
    description: 'Candy Sister gives Jack magical candy that transforms him into different animals and forms. When Candy Sister refuses to give him more candy, Jack turns nasty...',
    keywordsTaught: {
      elementary: [{simplifiedChar: '只', meaningIndex: 0}, {simplifiedChar: '哭', meaningIndex: 0}, {simplifiedChar: '在', meaningIndex: 0}, {simplifiedChar: '羊', meaningIndex: 0}],
      intermediate: [{simplifiedChar: '你好', meaningIndex: 0}, {simplifiedChar: '几只羊', meaningIndex: 0}, {simplifiedChar: '说话', meaningIndex: 0}, {simplifiedChar: '还好', meaningIndex: 0}]
    },
    codes: {
      englishSubtitles: {
        elementary: 'pzbvfi2hpj',
        intermediate: 'yldsq0d6uw'
      },
      noSubtitles: {
        elementary: 'pyuf9fzen5',
        intermediate: 'w6grijtyyd'
      }
    },
    thumbnailsSrc: ['hdxm_1_3.jpg']
  }     
  ];  

//

//clear old stories, then add back
Story.find({}).remove(function() {
  Story.create(storiesData, function() {
    console.log('finished adding stories');
  });
});

// setup tos true account to active

//console.log("make account to active if the tos is true");
//User.update({tos:true}, {$set:{active:true}}, {multi:true}, function(err){
  //console.log(err);
//});

//console.log("store parentEmail as parent Ids");
//User.find({}, function(err, rows){

  //rows.forEach(function(val, idx){
    //if (val.parentEmail) {
      ////console.log("Have parentEmail", val.parentEmail);
      //// get parentId
      //User.findOne({email:val.parentEmail}, function(err, row){
        //if (row && val.parents.indexOf(row._id) == -1){
          //console.log("put", row._id, "in parents");
          ////val.parents.push(row._id)
          //val.parents = [row._id];
          //val.save();
        //}

      //})
    //}
  //});

//});

// create userIndex if not validate counter exist
console.log("checking userIndex counter");
Counter.find({category:"userIndex"}, function(err, rows){
  if (rows.length == 0){
    console.log("there is no userIndex counter, create one.");
    var counter = new Counter();
    counter.category = "userIndex";
    counter.save();
  } else {
    console.log("there is an userIndex counter.");
  }

})

// for test
exports.modules = {
  storiesData: storiesData
};
