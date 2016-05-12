(function(){
	'use strict';
	var id = function(idName){
		return document.getElementById(idName);
	}

	var	calc = id('calculateMyAge'),
		horoscope = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];


	//Clock
	//Test comment
	function myFunc12(){
		var clockTime = new Date(),
			seconds = clockTime.getSeconds(),
			minutes = clockTime.getMinutes(),
			hours = clockTime.getHours(),
			ampm = 'am';

			if(hours > 12){
				ampm = 'pm';
				hours -= 12;
			}
			if(hours == 0) hours = 12;
			if(hours == 12) ampm = 'pm';
		
		//Times in string
		var secondInString = seconds.toString(),
			minuteInString = minutes.toString();
		if(secondInString.length < 2) secondInString = '0'+secondInString;
		if(minuteInString.length < 2) minuteInString = '0'+minuteInString;	
		id('second').innerHTML = secondInString;
		id('minute').innerHTML = minuteInString;
		id('hour').innerHTML = hours.toString();
		id('ampm').innerHTML = ampm;
		
	}

	function myFunc24(){
		var clockTime = new Date(),
			seconds = clockTime.getSeconds(),
			minutes = clockTime.getMinutes(),
			hours = clockTime.getHours();
		
		//Times in string
		var secondInString = seconds.toString(),
			minuteInString = minutes.toString();
		if(secondInString.length < 2) secondInString = '0'+secondInString;
		if(minuteInString.length < 2) minuteInString = '0'+minuteInString;	
		id('second').innerHTML = secondInString;
		id('minute').innerHTML = minuteInString;
		id('hour').innerHTML = hours.toString();
		
	}
	var myFormat;
	function clockFunction(format){

		myFormat = setInterval(format, 1000);
	
	}

	id('f12').onclick = function(){
		clearInterval(myFormat);
		clockFunction(myFunc12);
	}
	id('f24').onclick = function(){
		clearInterval(myFormat);
		clockFunction(myFunc24);
	}
	clockFunction(myFunc12);
	
	

	

	//Onclick button CALCULATE
	calc.onclick = function(){

		//Inputs for YEAR, MONTH, DATE
		var yearDOM = document.getElementById('year'),
			monthDOM = document.getElementById('month'),
			dateDOM = document.getElementById('date'),
			year = Number(yearDOM.options[yearDOM.selectedIndex].value),
			month = Number(monthDOM.options[monthDOM.selectedIndex].value),
			date = Number(dateDOM.options[dateDOM.selectedIndex].value);


		//New Date Object for Present Time
		var	presentTime = new Date();

		//New Date Object for Date of Birth
		var	dateOfBirth = new Date();

		//Setting Date
		Date.prototype.setOurDate = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		//Setting Month
		Date.prototype.setOurMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		//Setting Month Date
		Date.prototype.setOurMonthDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		//Getting Date
		Date.prototype.getOurDay = function(dateObject){
			return this.setOurDate[dateObject.getDay()];
		}

		//Getting Month
		Date.prototype.getOurMonth = function(dateObject){
			return this.setOurMonth[dateObject.getMonth()];
		}

		//Set YEAR, MONTH, DATE from Input
		dateOfBirth.setFullYear(year);
		dateOfBirth.setMonth(month);
		dateOfBirth.setDate(date);

		//Get Birth YEAR, MONTH, DATE 
		var birthYear = dateOfBirth.getFullYear(),
		    birthMonth = dateOfBirth.getMonth(),
		    birthStringMonth = dateOfBirth.getOurMonth(dateOfBirth), //Month in String
		    birthDate = dateOfBirth.getDate(),
		    birthDay = dateOfBirth.getOurDay(dateOfBirth), //Day in String
		    birthMS = dateOfBirth.getTime();

		//get present YEAR, MONTH, DATE
		var presentYear = presentTime.getFullYear(),
			presentMonth = presentTime.getMonth(),
			presentStringMonth = presentTime.getOurMonth(presentTime), //Month in String
			presentDate = presentTime.getDate(),
			presentDay = presentTime.getOurDay(presentTime), //Day in String
			presentMS = presentTime.getTime();

		//Leap Year Test
		if(presentYear % 4 === 0) Date.prototype.setOurMonthDates[1]++ ;



		//Age calculation function
		function currentAge(){
			var currentMonth, currentYear, currentDay, previousMonth, notValid;
			
			if( presentMS > birthMS ){

				currentYear  = presentYear - birthYear,
				previousMonth = (presentMonth === 0) ? 11 : presentMonth - 1;

				if(presentDate >= birthDate){					
					currentDay   = (presentDate === birthDate)? 0 : presentDate - birthDate,
					currentMonth = presentMonth - birthMonth;

					if(presentMonth < birthMonth){
						currentMonth = Date.prototype.setOurMonth.length - birthMonth + presentMonth,
						currentYear -= 1;
					}

				}else if(presentDate < birthDate){					
						currentDay = Date.prototype.setOurMonthDates[previousMonth] - birthDate + presentDate,
						currentMonth = presentMonth - birthMonth - 1;

					if(presentMonth <= birthMonth){
						currentMonth = Date.prototype.setOurMonth.length - birthMonth + presentMonth - 1,
						currentYear -= 1;
					}
				}				
			}else{
				notValid = 'You\'re not yet borned!';
			}

			return {
				year: currentYear,
				month: currentMonth,
				day: currentDay,
				invalid: notValid,
			}
		}

		//Checking Birth Leap year
		if(birthYear % 4 === 0) {
			Date.prototype.setOurMonthDates[1] = 29 ;
		}else{
			Date.prototype.setOurMonthDates[1] = 28 ;
		}

		//Declaring currentage() API
		if(date <= Date.prototype.setOurMonthDates[month]){
			var yourOld   = currentAge().year,
				yourMonth = currentAge().month,
				yourDay   = currentAge().day,
				inValid   = currentAge().invalid;
		}else{
			console.log(Date.prototype.setOurMonth[month] + ', '+year+' doesn\'t have ' + date + 'days!');
		}

		console.log(yourOld);
		console.log(yourMonth);
		console.log(yourDay);
		// console.log(inValid);




		//Horoscope function
		function setHoroscope(horDate, horMonth){

			var myHoroscope;

			if( (horMonth == 2 &&  horDate >= 21) || (horMonth == 3 && horDate <= 19) ){
					myHoroscope = horoscope[0];
			}else if( (horMonth == 3 &&  horDate >= 20) || (horMonth == 4  && horDate <= 20) ){
					myHoroscope = horoscope[1];
			}else if((horMonth == 4 &&  horDate >= 21)  || (horMonth == 5  && horDate <= 20) ){
					myHoroscope = horoscope[2];
			}else if((horMonth == 5 &&  horDate >= 21)  || (horMonth == 6  && horDate <= 22) ){
					myHoroscope = horoscope[3];
			}else if((horMonth == 6 &&  horDate >= 23)  || (horMonth == 7  && horDate <= 22) ){
					myHoroscope = horoscope[4];
			}else if((horMonth == 7 &&  horDate >= 23)  || (horMonth == 8  && horDate <= 22) ){
					myHoroscope = horoscope[5];
			}else if((horMonth == 8 &&  horDate >= 23)  || (horMonth == 9  && horDate <= 22) ){
					myHoroscope = horoscope[6];
			}else if((horMonth == 9 &&  horDate >= 23)  || (horMonth == 10 && horDate <= 21) ){
					myHoroscope = horoscope[7];
			}else if((horMonth == 10 &&  horDate >= 22) || (horMonth == 11 && horDate <= 21) ){
					myHoroscope = horoscope[8];
			}else if((horMonth == 11 &&  horDate >= 22) || (horMonth == 0  && horDate <= 19) ){
					myHoroscope = horoscope[9];
			}else if((horMonth == 0 &&  horDate >= 20)  || (horMonth == 1  && horDate <= 18) ){
					myHoroscope = horoscope[10];
			}else if((horMonth == 1 &&  horDate >= 19)  || (horMonth == 2  && horDate <= 20) ){
					myHoroscope = horoscope[11];
			}

			return myHoroscope;
		}
		
		var myHoroscope  = setHoroscope(date,month);

		console.log(myHoroscope);



	}


}());