let	contentBubbles = document.querySelector('.contentBubbles'),
	arrD = [];

// ���������� ��������� ����� ����� ����� min (������������) � max (�� ������� max)
// ������������� ������ Math.round() ���� ��� ������������� �������������!
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
	
function createBubble (i = 0, sumD = 0) {
	const contentWeight = contentBubbles.clientWidth,
		MIN_D = ((contentWeight > 1000) ? (Math.floor(contentWeight / 30)) : 20),
		MAX_D = Math.floor(contentWeight / 10),
		SPACE_D = 40
	let	newD = 0;
	
	//���������� � ������ ������� ������ ����
	newD = getRandomInt(MIN_D, MAX_D);	
	arrD[i] = newD;
	sumD += newD;
	sumD += SPACE_D; //���� �������
	
	//������ ��� � ��������������� ���������
	let newBubble = document.createElement("div");
	newBubble.classList.add('bubble');
	
	/*���� ����*/
	let colorBubble = 'bubbleYellow';
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
	
	let bublleOptions = arrD[i] + 'px';
	newBubble.style.width = bublleOptions;
	newBubble.style.height = bublleOptions;
	newBubble.style.borderRadius = bublleOptions;
	
	newBubble.textContent = arrD[i];	//��� ������� ������� ����� �� ����
	contentBubbles.appendChild(newBubble);
	
	if ((contentWeight - sumD) > (MAX_D + SPACE_D)) {
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
	let i = k;

	startTime += 300;
	setTimeout(function() 
	{
		//�������� ����
		let bubbles = document.querySelectorAll('.bubble');
		bubbles[i].classList.add('bubbleInFocus');
		bubbles[i+1].classList.add('bubbleInFocus');
	}, startTime, i);
	
	if (arrD[i] > arrD[i+1]) {
		//������ ������� ��������
		let tempD = arrD[i];
		arrD[i] = arrD[i+1];
		arrD[i+1] = tempD;
		
		flagWasSwap = true;
	
		startTime += 300;
		setTimeout(function() 
		{		
			//�������� ������������ ����
			let bubbles = document.querySelectorAll('.bubble');
			bubbles[i].classList.add('bubbleFalse');
			bubbles[i+1].classList.add('bubbleFalse');
		}, startTime, i);
		
		startTime += 300;
		setTimeout(function() 
		{			
			//������ ������� ����
			let bubbles = document.querySelectorAll('.bubble');
			
			contentBubbles.removeChild(bubbles[i+1]);
			let newPlaceBubble = contentBubbles.insertBefore(bubbles[i+1], bubbles[i]);
			
			bubbles[i].classList.remove('bubbleFalse');
			bubbles[i+1].classList.remove('bubbleFalse');
		}, startTime, i);
	}
	
	//������� ��������� � �����
	startTime += 300;
	setTimeout(function() 
	{	
		let bubbles = document.querySelectorAll('.bubble');
		bubbles[i].classList.remove('bubbleInFocus');
		bubbles[i+1].classList.remove('bubbleInFocus');
	}, startTime, i);
	
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






