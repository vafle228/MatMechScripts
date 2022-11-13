// // abc -> a, ab, abc
// // abcd -> a, ab, abc, abcd
// const substr = "ababc";
// const obj = new Object();

// for (let i = 0; i < substr.length; i++)
//     obj[substr.substring(0, i + 1)] = (function() {
//         const next_step = new Object();
//         for (let j = 0; j < substr.length; j++) {
//             const new_char = substr[j];
//             const current_str = substr.substring(0, i + 1)
//             const desired_str = substr.substring(0, Math.min(substr.length, i + 2));

//             if (desired_str === current_str + new_char)
//                 next_step[new_char] = substr.length < i + 2 ? "" : desired_str;
            
//             else {
//                 for (let pos = 1; pos <= current_str.length; pos++) {
//                     if (pos === current_str.length) { next_step[new_char] = ""; break; }

//                     console.log(current_str.substring(pos));
                    
//                     if (obj[current_str.substring(pos) + new_char] !== undefined){
//                         next_step[new_char] = current_str.substring(pos) + new_char; break;
//                     }
//                 }
//             }
//         }
//         return next_step;
//     })();

// console.log(obj);

// for (let i = 0; i < substr.length; i++)
//     console.log(`${substr.substring(0, i + 1)}: `, obj[substr.substring(0, i + 1)]);


// t = "abaxabaz"
// m = t.length
// alph = new Array()
// //Определяем алфавит строки t
// for(let i = 0; i<m; i++)
//     alph[t.charAt(i)] = 0
// //В двумерном массиве del храним таблицу переходов
// del=new Array(m+1)
// for(j=0;j<=m;j++)
//     del[j]=new Array()
// //Инициализируем таблицу переходов
// for(i in alph)
//     del[0][i]=0
// //Формируем таблицу переходов
// for(j=0;j<m;j++){
//     prev=del[j][t.charAt(j)]
//     del[j] [t .charAt(j)]=j+1
//     for(i in alph)
//         del[j+1][i]=del[prev][i]
// }
// //Выводим таблицу переходов
// for(j=0; j<=m; j++){
//     out=""
//     for(i in alph)
//         out+=del[j] [i] + "";
//     console.log(out)
// }

