/*
input: A-Z

Voyelles: A E I O U.

voyelle peut être changé que par des consonnes.
consonne peut être changé que par des voyelles.

input -> output: tps
BANANA -> AAAAAA: 3s

input:
SUFIANE -> _______: ?s


parse la string, pour recup une lettre
on garde que le U
on recup la taille de la chaine
init un time a 1 (parceque on a deja un U)
init un tableau XXX vide

on prend l'index de la lettre qu'on veut utiliser pour changer

parcourir la chaine,
    verifier qu'on tombe pas sur la letter choisi -> on fait rien on continue
    verifie si c'est une consonne -> on change en U (la lettre choisi) + increment du time de 1seconde
    verifie si c'est une voyelle -> on change en consonne et on ajoute la consonne dns le tableau XXX
*/

function isVoyelle(char){
  const v = ['A','E','I','O','U']
  return v.includes(char)
}

function countVYL(str) {
  var m = str.match(/[aeiou]/gi);
  return m === null ? 0 : m.length;
}

function getTime(string, char){
  console.log(string, char)
  const charIsVoyelle = isVoyelle(char)
  let time = 0
  let newStr = ''
  for(let i = 0; i< string.length; i++){
    var eleIsVoyelle = isVoyelle(string[i]) 
    if((charIsVoyelle && !eleIsVoyelle) || (!charIsVoyelle && eleIsVoyelle)){
     time ++
    }
    else if(
      ((!charIsVoyelle && !eleIsVoyelle) || (charIsVoyelle && eleIsVoyelle)) && char !== string[i]) {
      time = time +2
    }
    newStr = newStr.concat(char)
    }
    return newStr +'   '+time+'s' 
}

function res(){
  let string = process.argv[2] ? process.argv[2].toUpperCase() : 'SUFIANE'
  if(string.length < 2)
    return 'Minimum two char in string'
  var chars = string.split('');
  let nbMaxcharRepet = 0
  let char = null
  const countVoyelle = countVYL(string)
  const countConsonne = string.length - countVoyelle
  let isVoyelleBool
  let timeRes

  for (let i = 0; i < chars.length; i++) {
    if(nbMaxcharRepet == string.split(chars[i]).length - 1){
      if(countVoyelle < countConsonne && isVoyelle(chars[i])){
        isVoyelleBool = isVoyelle(chars[i])
        char = chars[i]
      }
      else if(countVoyelle > countConsonne && !isVoyelle(chars[i])){
        isVoyelleBool = !isVoyelle(chars[i])
        char = chars[i]
      }
    }
    else if(nbMaxcharRepet < (string.split(chars[i]).length - 1)){
      nbMaxcharRepet = string.split(chars[i]).length - 1
      isVoyelleBool = isVoyelle(chars[i])
      char = chars[i]
    }
  }

  if((isVoyelleBool && ((countVoyelle - nbMaxcharRepet) < countConsonne)) || 
    (!isVoyelleBool && (countConsonne - nbMaxcharRepet) < countVoyelle)){
    timeRes = getTime(string,char)
  }
  else{
    if(countVoyelle > 0 && countVoyelle < countConsonne)
      timeRes = getTime(string, string.match(/[aeiou]/gi)[0])
    else if(countConsonne > 0 && countConsonne < countVoyelle)
      timeRes = getTime(string, string.replace(/[aeiou]/gi, '')[0])
    else
      timeRes = getTime(string,string[0])
  }
  return timeRes
}


console.log(res())

/*
Exemple de test

node algo.js UUUK
node algo.js BANANA
node algo.js SUFIANE
node algo.js SWIOUAEE

PS: quand c'est le même résultat (temps) je prends par défaut la premiere lettre de la string
  ex: node algo.js  SUFINNEE 
  le N et le E renvoi 8s, je prends en compte le premier trouvé

*/


