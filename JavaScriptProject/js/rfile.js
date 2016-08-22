var fs = require("fs");
var jsonData = [];
var csVdata = fs.readFileSync('India2011.csv');
var stringData = csVdata.toString();
var lines = stringData.split('\r\n');
var headers=lines[0].split(',');


var rows = lines.length; //3047

var agegroup=headers.indexOf("Age-group");//5
var total=headers.indexOf("Total/ Rural/ Urban");//4
var literatePersons=headers.indexOf("Literate - Persons");//12
var statecode=headers.indexOf("State Code");//1
var area=headers.indexOf("Area Name");//3
var educationlevelgradmale=headers.indexOf("Educational level - Graduate & above - Males");//40
var educationlevelgradfemale=headers.indexOf("Educational level - Graduate & above - Females")//41
var b0=headers.indexOf("Educational level - Literate without educational level - Persons");
var b1=headers.indexOf("Educational level - Below Primary - Persons");//18
var b2=headers.indexOf("Educational level - Primary - Persons");//21
var b3=headers.indexOf("Educational level - Middle - Persons");//24
var b4=headers.indexOf("Educational level - Matric/Secondary - Persons");//27
var b5=headers.indexOf("Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons");//30
var b6=headers.indexOf("Educational level - Non-technical diploma or certificate not equal to degree - Persons");//33
var b7=headers.indexOf("Educational level - Technical diploma or certificate not equal to degree - Persons");//36
var b8=headers.indexOf("Educational level - Graduate & above - Persons");//39
var b9=headers.indexOf("Educational level - Unclassified - Persons");//42




//Split the data by , and push it into jsondata.
for (var i = 1; i < rows; i++) {
    var line = lines[i];
    if (line != null && line != '' && line.length != 0) {
       var data = line.split(",");
       jsonData.push(data);
    }
}
    

//Part 1- Age-group wise Literacy All India
agewiseliteracy(jsonData); //function declaration

function agewiseliteracy(jsonData) { //function defination
    
    var sumage = 0;
    var agegroupar = []; //array for age-group
    var b =[]; // final data to be stored


    for (var k = 0; k < jsonData.length; k++) {

        agegroupar[k] = jsonData[k][agegroup];
    }

    
    
    var agedistinct=[];
    var flag;
    for(var p=0;p<agegroupar.length;p++)
    {
        flag=false;
        for(var q=0;q<p;q++)
        {
            if(agegroupar[p]==agegroupar[q]){
                flag=true;
                break;
            }
        }
        if(!flag)
        {
            agedistinct.push(agegroupar[p]);
        }
    }
    var len=agedistinct.length;

    for (var j = 1; j <= len; j++) {

        if (agegroupar[j] != "All ages") {

            for (var i = 0; i < jsonData.length; i++) {

                if (agegroupar[j] == jsonData[i][agegroup]) {

                    if (jsonData[i][total] == "Total")

                    {
                        if (jsonData[i][agegroup] != "All ages") {
                            sumage = sumage + parseInt(jsonData[i][literatePersons]);
                        }

                    }

                }

            }
            b[b.length]={ "Agegroup": agegroupar[j], "Literatepersons": sumage };
            sumage=0;

        } //end if

    } // end for loop
    if(b)
    fs.writeFileSync("newage.json",JSON.stringify(b),encoding="utf8");
   
    
}

//Graduate Population of India-State and Gender-wise
graduatepopulation(jsonData);

function graduatepopulation(jsonData) {

    var areaname = [];
    var areaname1 = [];
    var statename = [];
    var statename1 = [];

    for (var k = 0; k < jsonData.length; k++) {

       areaname[k] = jsonData[k][statecode];
       statename[k] = jsonData[k][area];
    }
    
    for (var b = 0; b < areaname.length; b++) {
        if (areaname[b] != areaname[b + 1]) {
            
            areaname1.push(areaname[b]);

        }

    }

    for (var b = 0; b < statename.length; b++) {
        if (statename[b] != statename[b + 1]) {
            
            statename1.push(statename[b]);

        }

    }
    

    var edumale = [];
    var edufemale = [];
    var c = [];
    var m = [];
    var h = 0;


    for (var u = 0; u < jsonData.length; u++) {
        if (jsonData[u][total] == "Total" && jsonData[u][area] == statename1[h]) {
            if (jsonData[u][agegroup] == "All ages") {
                c[u] = { "AreaName": statename1[h], "GraduateaboveMales": parseFloat(jsonData[u][educationlevelgradmale]), "GraduateaboveFemales": parseFloat(jsonData[u][educationlevelgradfemale]) };
                m.push(c[u]);
            }
            h++;
        }

    }
    fs.writeFileSync("newgraduate.json", JSON.stringify(m), encoding = "utf8");

   
}

//Education categorywise of All India
educationcategorywise(jsonData);

function educationcategorywise(jsonData) {
   
    var m = [];
    var a1 = 0;
    var a2 = 0,
        a3 = 0,
        a4 = 0,
        a5 = 0,
        a6 = 0,
        a7 = 0,
        a8 = 0,
        a9 = 0,
        a0 = 0;
    var areacode = [];
    var areacode1 = [];

    for (var k = 0; k < jsonData.length; k++) {

        areacode[k] = jsonData[k][statecode];
        
    }
    //for distinct area code
    for (var b = 0; b < areacode.length; b++) {
        if (areacode[b] != areacode[b + 1]) {
           
            areacode1.push(areacode[b]);

        }

    }

    var h = 0;
    var i=0;
    for (var n = 0; n < jsonData.length; n++) {
        if (jsonData[n][statecode] == areacode1[h] && jsonData[n][total] == "Total") {
            if (jsonData[n][agegroup] == "All ages") {
                a0 = a0 + parseInt(jsonData[n][b0]);
                a1 = a1 + parseInt(jsonData[n][b1]);
                a2 = a2 + parseInt(jsonData[n][b2]);
                a3 = a3 + parseInt(jsonData[n][b3]);
                a4 = a4 + parseInt(jsonData[n][b4]);
                a5 = a5 + parseInt(jsonData[n][b5]);
                a6 = a6 + parseInt(jsonData[n][b6]);
                a7 = a7 + parseInt(jsonData[n][b7]);
                a8 = a8 + parseInt(jsonData[n][b8]);
                a9 = a9 + parseInt(jsonData[n][b9]);


                h++;
            }

        }

    }


    

    m = [ {"EducationCategory":headers[b0],"TotalPopulation":a0},
            {"EducationCategory":headers[b1],"TotalPopulation":a1},
            {"EducationCategory":headers[b2],"TotalPopulation":a2},
            {"EducationCategory":headers[b3],"TotalPopulation":a3},
            {"EducationCategory":headers[b4],"TotalPopulation":a4},
            {"EducationCategory":headers[b5],"TotalPopulation":a5},
            {"EducationCategory":headers[b6],"TotalPopulation":a6},
            {"EducationCategory":headers[b7],"TotalPopulation":a7},
            {"EducationCategory":headers[b8],"TotalPopulation":a8},
            {"EducationCategory":headers[b9],"TotalPopulation":a9}
        ];    

        fs.writeFileSync("neweducation.json", JSON.stringify(m), encoding = "utf8");
    
}
