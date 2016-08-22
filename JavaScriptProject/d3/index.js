const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={}; 
var isHeader=true;
var header2=true;
var header3=true;

var agp,lip,lim,lif;

const rl = readline.createInterface({
  input: fs.createReadStream('India2011.csv')
});
rl.on('line', function(line) {
 
 append(line);
});
rl.on('close',function(line) {

	const rl1 = readline.createInterface({
  input: fs.createReadStream('IndiaST2011.csv')
	});
	rl1.on('line', function(line) {
		if(header2){
			header2=false;
		}
			else{
 	append(line);
 	}
	});
	rl1.on('close',function(line) {

	const rl2 = readline.createInterface({
  input: fs.createReadStream('IndiaSC2011.csv')
	});
	rl2.on('line', function(line) {
	if(header3){
		header3=false;}
			else{
 	append(line);
 	}
	});
	});
});


function append(line)
{
	var lineRecords= line.trim().split(',');
 	
     if(isHeader){  
     for(var i=0;i<lineRecords.length;i++){     
         header[i]=lineRecords[i];
     }
         isHeader=false;

         agp=header.indexOf("Age-group");
         lip=header.indexOf("Literate - Persons");

     }else{
              tempData[header[agp]]=lineRecords[agp];
              tempData[header[lip]]=lineRecords[lip];
             /* 
              tempData[header[lif]]=lineRecords[lif];*/
      
         jsonData.push(tempData);
        }      
 
  
        tempData={};
    fs.writeFileSync("india1.json",JSON.stringify(jsonData),encoding="utf8");
}

var data = JSON.parse("india1.json");
var newData = {rows: []},
    index;

for (var i = 0; i < data.rows.length;i++){
    index = newDataContains(data.rows[i].key);
    if (index == -1){
        newData.rows.push({key: data.rows[i].key, value: data.rows[i].value});
    } else {
        newData.rows[index].value += data.rows[i].value;
    }
}
        
function newDataContains(key){
    for (var i=0; i < newData.rows.length; i++){
        if (JSON.stringify(newData.rows[i].key) == JSON.stringify(key)) {
            return i;
            break;
        }
    }
    return -1;
}

console.log(newData);