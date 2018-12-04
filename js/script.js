var	contentBubbles = document.querySelector('.contentBubbles'),
	arrD = [];

// ���������� ��������� ����� ����� ����� min (������������) � max (�� ������� max)
// ������������� ������ Math.round() ���� ��� ������������� �������������!
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
	
function createBubble (i = 0, sumD = 0) {
	var contentWeight = contentBubbles.clientWidth,
		minD = ((contentWeight > 1000) ? (Math.floor(contentWeight / 30)) : 20),
		maxD = Math.floor(contentWeight / 10),
		newD = 0,
		spaceD = 40;
	
	//���������� � ������ ������� ������ ����
	newD = getRandomInt(minD, maxD);	
	arrD[i] = newD;
	sumD += newD;
	sumD += spaceD; //���� �������
	
	//������ ��� � ��������������� ���������
	var newBubble = document.createElement("div");
	newBubble.classList.add('bubble');
	
	/*���� ����*/
	var colorBubble = 'bubbleYellow';
	if (i%4 === 0) {
		colorBubble = 'bubbleRed';
	}
	else if (i%3 === 0) {
		colorBubble = 'bubbleBlue';
	}
	else if (i%2 === 0) {
		colorBubble = 'bubbleGreen';
	}
	newBubble.classList.add(colorBubble);
	
	var bublleOptions = arrD[i] + 'px';
	newBubble.style.width = bublleOptions;
	newBubble.style.height = bublleOptions;
	newBubble.style.borderRadius = bublleOptions;
	
	newBubble.textContent = arrD[i];	//��� ������� ������� ����� �� ����
	contentBubbles.appendChild(newBubble);
	
	if ((contentWeight - sumD) > (maxD + spaceD)) {
		//���� ���������� ��������� ����� ������, ��� ������������ ����� � ������ ��������
		i++;
		createBubble(i, sumD);
	}
}


/*������ ������� 2 ���� � ���������, ����� �� ��� ������������
���������:
k			- ������� ���������, ������������� �� 1, ���������� ����� �������� ������� ���� ��������� (������)
flagWasSwap	- ����, �������� ��� �� ������ ���� ������������, ������������ ����� ����� ��������
n			- ������ ���������� � ������� ��������, ����������� �� 1 ����� �������� ������
startTime		- ������� ���������� �������, �������, ����������� � �� � ������������� ����� ������� setTime
*/
function sortBubbles (k = 0, flagWasSwap = false, n = arrD.length-1, startTime = 0) {
	var i = k;
	if (arrD[i] > arrD[i+1]) {
		//������ ������� ��������
		var tempD = arrD[i];
		arrD[i] = arrD[i+1];
		arrD[i+1] = tempD;
		
		flagWasSwap = true;
	}
	
	startTime += 1;
	setTimeout(function() 
	{
		var bubbles = document.querySelectorAll('.bubble');
		console.log(i);
		//�������� ����
		bubbles[i].classList.add('bubbleInFocus');
		bubbles[i+1].classList.add('bubbleInFocus');
	}, startTime*1000);	
		
	if (flagWasSwap) {	
		startTime += 1;
		setTimeout(function() 
		{
			var bubbles = document.querySelectorAll('.bubble');
			
			//�������� ������������ ����
			bubbles[i].classList.add('bubbleFalse');
			bubbles[i+1].classList.add('bubbleFalse');
		}, startTime*1000, i);
		
		startTime += 1;
		setTimeout(function() 
		{
			var bubbles = document.querySelectorAll('.bubble');
			
			//������ ������� ����
			contentBubbles.removeChild(bubbles[i+1]);
			contentBubbles.insertBefore(bubbles[i+1], bubbles[i]);
		}, startTime*1000, i);
	}
	
	//������� ��������� � �����
	startTime += 1;
	setTimeout(function() 
	{
		var bubbles = document.querySelectorAll('.bubble');
		
		bubbles[i].classList.remove('bubbleInFocus');
		bubbles[i].classList.remove('bubbleFalse');
		
		bubbles[i+1].classList.remove('bubbleInFocus');
		bubbles[i+1].classList.remove('bubbleFalse');
	}, startTime*1000, i);
	
	k++;
	
	if ((k === n) && (!flagWasSwap)) {
		//����� �� ���������� ���� � �� ���� ������������
		//��� �����, �������� ����
	}
	else {
		if (k === n) {
			//����� �� ���������� ����, ������������ ����, ������� ���� ���������� ������
			k = 0;
			n--;
			flagWasSwap = false;	
		}
		sortBubbles(k, flagWasSwap, n, startTime);
	}
}






