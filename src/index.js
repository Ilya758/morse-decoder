const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};
const SPACE = '**********';
function decode(expr) {
    const reducer = Array.from(expr).map((e, i) => ((i + 1) % 10 === 0) ? e = e + ' ' : e = e).join('');

    const regSpace = /[*]/g

    const spaceTransform = reducer.replace(regSpace, ' ');

    const regZero = /(1)[0-1]*/g;

    const split = reducer.split(' ');

    const splicer = split.slice(0, -1);

    const dash = ['11', '-'];

    const dot = ['10', '.'];

    const map = splicer.map((e, i) => e = e.match(regZero));

    const fractMap = map.map((e, i) => (e === null) ? e = ' ' : (e.toString().length > 2) ?
        e = e
            .toString()
            .split('')
            .map((el, ndx) => ((ndx + 1) % 2 === 0) ? el = el + ' ' : el = el).join('').trim().split(' ') :
        e = e.join());

    const innerArraySplicer = fractMap.map((el, i) => (el === ' ') ? el = el :
        (el.toString().length > 2) ?
            Array.from(el).map((elem, index) => (elem === dash[0]) ?
                elem = dash[1] :
                elem = dot[1]).join('') :
            (el === dash[0]) ?
                el = dash[1] :
                el = dot[1]);

    const symbolReducer = innerArraySplicer.map((elem => (elem === ' ') ? elem = elem : elem = MORSE_TABLE[elem]));
    return symbolReducer.join('');
}


module.exports = {
    decode
}