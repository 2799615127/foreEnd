import {Base64} from "js-base64";
let letter= ['z','x','c','v','b','n','m','a','s','d','f','g'
  ,'h','j','k','l','q','w','e','r','t','y','u','i','o','p'];
let letrerMixup= ['p','n','h','f','q','v','l','k','c','x','d','t',
  'j','a','o','i','e','m','w','g','s','u','z','b','r','y'];
let bigMixup= ['C','I','F','M','E','Q','A','S','V','H','R','K','X',
  'D','U','G','Z','B','W','L','T','P','Y','O','J','N'];
let letterBig= ['Z','X','C','V','B','N','M','A','S','D','F','G','H'
  ,'J','K','L','Q','W','E','R','T','Y','U','I','O','P'];
let arr=['1','2','3','4','5','6','7','8','9','0'];
let arrRand= ['5','1','9','7','3','8','0','4','6','2'];

/**
 * base64加密
 * @param content 待加密内容
 * @return byte[]
 */
const base64Encrypt=(content)=> {
  let base= Base64.encode(content).split("");
  for(let i=0;i<base.length;i++) {
    for(let a=0;a<arr.length;a++){
      if(base[i]==arr[a]) {
        base[i]=arrRand[a];
        a=10;
      }
    }

    for(let a=0;a<letter.length;a++){
      if(base[i]==letter[a]) {
        base[i]=letrerMixup[a];
        a=26;
      }else if(base[i]==letterBig[a]) {
        base[i]=bigMixup[a];
        a=26;
      }
    }
  }
  return base.join('');
}
/**
 * base64解密
 * @param encoderContent 已加密内容
 * @return byte[]
 */
const base64Decrypt=(content)=> {
  let base= content.split("");
  for(let i=0;i<base.length;i++) {
      for(let a=0;a<arrRand.length;a++){
        if(base[i]==arrRand[a]) {
          base[i]=arr[a];
          a=10;
        }
      }
        for(let a=0;a<letter.length;a++){
          if(base[i]==letrerMixup[a]) {
            base[i]=letter[a];
            a=26;
          }else if(base[i]==bigMixup[a]) {
            base[i]=letterBig[a];
            a=26;
          }
        }

  }
  return Base64.decode(base.join(''));
}


export default {name: "base64",base64Encrypt,base64Decrypt}
