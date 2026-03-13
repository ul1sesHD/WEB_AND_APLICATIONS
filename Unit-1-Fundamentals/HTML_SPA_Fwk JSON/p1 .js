var boolDataMode_XML = 1; 
var boolDataMode_JSON = 2; 
var boolDataMode = boolDataMode_JSON; 

var txt='<students>';

txt += '<student>';
txt += '<ID>12345</ID>';
txt += '<name>Juan</name>';
txt += '<sex>Male</sex>';
txt += '<maritalStatus>Single</maritalStatus>';
txt += '</student>';


txt += '<student>';
txt += '<ID>12347</ID>';
txt += '<name>Leticia</name>';
txt += '<sex>Female</sex>';
txt += '<maritalStatus>Single</maritalStatus>';
txt += '</student>';



txt += '<student>';
txt += '<ID>12348</ID>';
txt += '<name>Pedro</name>';
txt += '<sex>Male</sex>';
txt += '<maritalStatus>Married</maritalStatus>';
txt += '</student>';


txt+='</students>';

var parser= new DOMParser();
var xmlDoc= parser.parseFromString(txt,"text/xml");

var txtj = '{"student":['
		    + '{"ID":92345,"name":"Juan", "sex":"Male","maritalStatus":"Single"},'
		    + '{"ID":92347,"name":"Lety", "sex":"Female","maritalStatus":"Single"},'
		    + '{"ID":92348,"name":"Pedro", "sex":"Male","maritalStatus":"Married"}'
			+ ']}';
var students = JSON.parse(txtj);

function s_create()
{
	document.getElementById("s_create").style.display = "block";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
}
function sendData()
{
	id = document.getElementById("IDA").value;
	name = document.getElementById("nameA").value;
	sex = ""; 
	if (document.getElementById("sexMA").checked == true)
		sex = "Male";
	else
		sex = "Female"; 
	maritalStatus = document.getElementById("maritalStatusA").value; 
	
	if (boolDataMode == boolDataMode_XML)
	{
		newEleID = xmlDoc.createElement("ID");
		newTxtID = xmlDoc.createTextNode(id); 
		newEleID.appendChild(newTxtID); 
		
		newEleName = xmlDoc.createElement("name"); 
		newTxtName = xmlDoc.createTextNode(name); 
		newEleName.appendChild(newTxtName); 
		
		newEleSex = xmlDoc.createElement("sex"); 
		newTxtSex = xmlDoc.createTextNode(sex); 
		newEleSex.appendChild(newTxtSex); 

		newEleMaritalStatus = xmlDoc.createElement("maritalStatus"); 
		newTxtMaritalStatus= xmlDoc.createTextNode(maritalStatus); 
		newEleMaritalStatus.appendChild(newTxtMaritalStatus); 
		
		newEleA = xmlDoc.createElement("student"); 
		newEleA.appendChild(newEleID); 
		newEleA.appendChild(newEleName); 
		newEleA.appendChild(newEleSex); 
		newEleA.appendChild(newEleMaritalStatus); 
		
		xmlDoc.getElementsByTagName("students")[0].appendChild(newEleA);
	}
	else if (boolDataMode == boolDataMode_JSON)
	{
		var obj = {
			ID: id,
			name: name,
			sex: sex,
			maritalStatus: maritalStatus
		};
		students.student.push(obj);
	}
	alert("Student created")  
}
	

function s_delete()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "block";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
}

function deleteData()
{
	ID = document.getElementById("IDB").value; 
	i = 0; 
	flag = false; 
	
	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("student");
		l = x.length; 
	}
	else if (boolDataMode == boolDataMode_JSON)
	{
		l = students.student.length; 
	}
	
	while ((i < l) && (flag == false))
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].childNodes[0].nodeValue == ID)
			{
				userconf = confirm("Delete student: "
									+ x[i].childNodes[0].childNodes[0].nodeValue
									+ " - "
									+ x[i].childNodes[1].childNodes[0].nodeValue
									+ "?"
									); 
				if (userconf == true)
				{ 
					x[i].parentNode.removeChild(x[i]);
					alert("Student deleted");
				}
				flag = true; 
			}
			else
			{
				i++
			}
		}
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (students.student[i].ID == ID)
			{
				userconf = confirm("Delete student: "
									+ students.student[i].ID
									+ " - "
									+ students.student[i].name
									+ "?"
									); 
				if (userconf == true)
				{ 
					students.student.splice(i,1)
					alert("Student deleted");
				}
				flag = true; 
			}
			else
			{
				i++
			}
		}
	}
	
	if (flag == false)
	{
		alert("Student not found."); 
	}
}

function s_update()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "block";
	document.getElementById("s_report").style.display = "none";
}

var indexFound = -1; 

function changeData()
{
	ID = document.getElementById("searchC").value; 
	i = 0; 
	flag = false; 
	
	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("student");
		l = x.length; 
	}
	else if (boolDataMode == boolDataMode_XML)
	{
		l = students.student.length; 
	}
	
	while ((i < l) && (flag == false))
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].childNodes[0].nodeValue == ID)
			{
				document.getElementById("IDC").value = 
					x[i].childNodes[0].childNodes[0].nodeValue; 
				document.getElementById("nameC").value = 
					x[i].childNodes[1].childNodes[0].nodeValue; 
				if (x[i].childNodes[2].childNodes[0].nodeValue == "Female")
				{
					document.getElementById("sexFC").checked = true;  
					document.getElementById("sexMC").checked = false; 
				}
				else
				{
					document.getElementById("sexFC").checked = false;  
					document.getElementById("sexMC").checked = true; 
				}
				document.getElementById("maritalStatusC").value = 
					x[i].childNodes[3].childNodes[0].nodeValue; 
				indexFound = i; 
				flag = true; 
			}
			else
			{
				i++
			}
		}
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (students.student[i].ID)
			{
				document.getElementById("IDC").value = students.student[i].ID; 
				document.getElementById("nameC").value = students.student[i].name;
				if (students.student[i].sex == "Female")
				{
					document.getElementById("sexFC").checked = true;  
					document.getElementById("sexMC").checked = false; 
				}
				else
				{
					document.getElementById("sexFC").checked = false;  
					document.getElementById("sexMC").checked = true; 
				}
				document.getElementById("maritalStatusC").value = students.student[i].maritalStatus; 
				indexFound = i; 
				flag = true; 
			}
			else
			{
				i++
			}
		}
	}
	
	if (flag)
		document.getElementById("formUpdate").style.display = "block";
	else
	{
		document.getElementById("formUpdate").style.display = "none";
		alert("Student not found."); 
	}
}

function updateData()
{
	i = indexFound; 
	
	if (document.getElementById("sexFC").checked == true)
		sex = "Female"; 
	else
		sex = "Male"; 
	
	if (boolDataMode == boolDataMode_XML)
	{
		x = xmlDoc.getElementsByTagName("student");
	
		x[i].childNodes[0].childNodes[0].nodeValue = document.getElementById("IDC").value; 
		x[i].childNodes[1].childNodes[0].nodeValue = document.getElementById("nameC").value; 
		x[i].childNodes[2].childNodes[0].nodeValue = sex; 
		x[i].childNodes[3].childNodes[0].nodeValue = document.getElementById("maritalStatusC").value; 
	}
	else if (boolDataMode == boolDataMode_JSON)
	{
		students.student[i].ID = document.getElementById("IDC").value; 
		students.student[i].name = document.getElementById("nameC").value; 
		students.student[i].sex = sex; 
		students.student[i].maritalStatus = document.getElementById("maritalStatusC").value; 
	}
	
	alert("Student updated");
}	

function s_search()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "block";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "none";
}

function search()
{
	field = document.getElementById("fieldSearch").value; 
	value = document.getElementById("textSearch").value;
	count = 0; 

	if (boolDataMode == boolDataMode_XML)
	{
		a = xmlDoc.getElementsByTagName("student"); 
		x = xmlDoc.getElementsByTagName(field);
		l = a.length; 
	}
	else if (boolDataMode == boolDataMode_JSON)
	{
		l = students.student.length; 
	}
	
	var table= document.getElementById("resultSearch");

	table.innerHTML="";
	table.innerHTML="<thead><tr>"
					+"<th>ID</th>"
					+"<th>Name</th>"
					+"<th>Sex</th>"
					+"<th>Marital Status</th>"
					+"</tr></thead>"
					+"<tbody>";

	for(i=0;i<l;i++)
	{
		if (boolDataMode == boolDataMode_XML)
		{
			if (x[i].childNodes[0].nodeValue == value)
			{
				table.innerHTML+= "<tr>"
						+"<td>"
						+ x[i].childNodes[0].childNodes[0].nodeValue
						+ "</td>"

						+"<td>"
						+ x[i].childNodes[1].childNodes[0].nodeValue
						+ "</td>"

						+"<td>"
						+ x[i].childNodes[2].childNodes[0].nodeValue
						+ "</td>"

						+"<td>"
						+ x[i].childNodes[3].childNodes[0].nodeValue
						+ "</td>"

						+"</tr>";
			}
		}
		else if (boolDataMode == boolDataMode_JSON)
		{
			if (students.student[i][field] == value)
			{
				table.innerHTML+= "<tr>"
						+"<td>"
						+ students.student[i].ID
						+ "</td>"

						+"<td>"
						+ students.student[i].name
						+ "</td>"

						+"<td>"
						+ students.student[i].sex
						+ "</td>"

						+"<td>"
						+ students.student[i].maritalStatus
						+ "</td>"

						+"</tr>";
			}
		}
		
	}

	table.innerHTML += "</tbody>";

	
}

function s_report()
{
	document.getElementById("s_create").style.display = "none";
	document.getElementById("s_delete").style.display = "none";
	document.getElementById("s_search").style.display = "none";
	document.getElementById("s_update").style.display = "none";
	document.getElementById("s_report").style.display = "block";


	var table= document.getElementById("tableReport");

	table.innerHTML="";
	table.innerHTML="<thead><tr>"
					+"<th>ID</th>"
					+"<th>Name</th>"
					+"<th>Sex</th>"
					+"<th>Marital Status</th>"
					+"</tr></thead>"
					+"<tbody>";
	
	if (boolDataMode == boolDataMode_XML)
	{
		x=xmlDoc.getElementsByTagName ("student");
		l= x.length;

		for(i=0;i<l;i++){
			table.innerHTML+= "<tr>"
							+"<td>"
							+ x[i].childNodes[0].childNodes[0].nodeValue
							+ "</td>"

							+"<td>"
							+ x[i].childNodes[1].childNodes[0].nodeValue
							+ "</td>"

							+"<td>"
							+ x[i].childNodes[2].childNodes[0].nodeValue
							+ "</td>"

							+"<td>"
							+ x[i].childNodes[3].childNodes[0].nodeValue
							+ "</td>"

							+"</tr>";
		}
	}
	else if (boolDataMode == boolDataMode_JSON)
	{
		for (i=0; i < students.student.length; i++)
		{
			table.innerHTML += "<tr>"
							+  "<td>"
							+  students.student[i].ID
							+  "</td>"
							+  "<td>"
							+  students.student[i].name
							+  "</td>"
							+  "<td>"
							+  students.student[i].sex
							+  "</td>"
							+  "<td>"
							+  students.student[i].maritalStatus
							+  "</td>"
							+  "</tr>";
		}
	}

table.innerHTML += "</tbody>";


}
