let scoreKey1 = "score1"
let scoreKey2 = "score2"
let Student = function(name,age,score1,score2){
   this.name=name;
   this.age = age;
   this.score = {
      [scoreKey1]:score1,
      [scoreKey2]:score2
   }
   this.getInfo= function(){
      return `ten : ${this.name} tuoi: ${age}, diem so 1: ${this.score[scoreKey1]}, diem so2 : ${this.score[scoreKey2]}`
   }
}
const student1 = new Student("Tung",19,6,3);
const student2 = new Student("Toan",16,3,6);
const student3 = new Student("Tuan",16,3,10);
const student4 = new Student("Tien",16,3,8);



let students = [student1,student2,student3,student4];
// let result = [];
// for (const student of students) {
//    if(student.age>=18){
//       result.push("Da du 18 tuoi");
//    }
//    else{
//       result.push("chua du 18 tuoi");
//    }
// }
let result = students.map(
   function(student){
      if(student.age>=18){
         return "Da du 18 tuoi";
      }
      else{
         return "chua du 18 tuoi";
      }
   }
)
// let sum = 0;
// for (const student of students) {
//    sum+=student.score.score1+student.score.score2
// }
let sum = students.reduce(
   function(sum,student){
      return sum+=student.score.score1+student.score.score2;
   }
,0)

// let _OLaiLop = [];
// for (const student of students) {
//    if(student.score.score1<3||student.score.score2<3|| student.score.score1+student.score.score2<8){
//       _OLaiLop.push(student);
//    }
// }
let _OLaiLop = students.filter(function(student){
   return !(student.score.score1<3||student.score.score2<3|| student.score.score1+student.score.score2<8);
})

// let check = true;
// for (const student of studens) {
//    if(student.score.score1<3||student.score.score2<3|| student.score.score1+student.score.score2<8){
//       check=false;
//       break;
//    }
// }

let check = students.every(function(student){
   return student.score.score1<3||student.score.score2<3|| student.score.score1+student.score.score2<8;
})
let check2 = students.some(function(student){
   return student.score.score1<3||student.score.score2<3|| student.score.score1+student.score.score2<8;
})

students.sort(function(a,b){
   if(a.age==b.age){
      let Scorea = a.score.score1+a.score.score2;
      let Scoreb = b.score.score1+b.score.score2;
      return Scorea-Scoreb;
   }
   return a.age-b.age;
});
