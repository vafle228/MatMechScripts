const AutomatonConstructor = require("./Automaton/automatonconstructor");

const automaton = AutomatonConstructor.constructAutomaton("abaxabaz");


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

