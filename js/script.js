let	contentBubbles = document.querySelector('.contentBubbles'),
	arrD = [];
	
function onLoadPage () {
	createBubble();
	//sortBubbles();
}

function createBubble (i = 0) {
	 
	if (getD(i)) {
		//���� ��������� �����,
		let newBubble = createObject();
		
		editOptionsBubble(newBubble, i);
		addStyleBubble(newBubble, i);
		contentBubbles.appendChild(newBubble);
		
		i++;
		createBubble(i);
	}
}

/*������ div ��� �������� ����*/
function createObject () {
	return  document.createElement("div");
}

/*�������� � �������� ����*/
function getD(i) {
	const contentWeight = contentBubbles.clientWidth,
		MIN_D = ((contentWeight > 1000) ? (Math.floor(contentWeight / 30)) : 20),
		MAX_D = ((contentWeight > 1000) ? (Math.floor(contentWeight / 10)) : 30),
		SPACE_D = 40;
		
	let newD = getRandomInt(MIN_D, MAX_D);
	
	let sumArrD = getSumArr() + newD + (SPACE_D * (i-1));
	
	let flagFreePlace = false;
	if ((contentWeight - sumArrD) > 0) {
		//���������� ����� �������� �������, ��� ����� � ���������� ��������� ����������
		arrD[i] = newD;
		flagFreePlace = true;
	}
	return flagFreePlace;
}

/* ���������� ��������� ����� ����� ����� min (������������) � max (�� ������� max)
������������� ������ Math.round() ���� ��� ������������� �������������!
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getSumArr () {
	// ��� ������� �������� ������� ��������� �������,
	// ������������� ��������� ���������� ������ ���������� �����
	let result = arrD.reduce(function(sum, current) {
	  return sum + current;
	}, 0);
	
	return result;
}

//����� ������� div ������ ����
function editOptionsBubble (bubble, i) {
	let bublleOptions =  arrD[i] + 'px';
	bubble.style.width = bublleOptions;
	bubble.style.height = bublleOptions;
	bubble.style.borderRadius = bublleOptions;
	
	bubble.textContent = arrD[i];	//��� ������� ������� ����� �� ����
}

/*��������� ������ ��� ������������ div ������ ����*/
function addStyleBubble (bubble, i) {
	bubble.classList.add('bubble');
	
	/*���� ����*/
	let colorBubble = 'bubbleYellow';
	switch (i%4) {
		case 0: 
			colorBubble = 'bubbleRed';
			break;
		case 1: 
			colorBubble = 'bubbleBlue';
			break;
		case 2:
			colorBubble = 'bubbleGreen';
			break;
	}	
	bubble.classList.add(colorBubble);
}

/*������ ������� 2 ���� � ���������, ����� �� ��� ������������
���������:
k			- ������� ���������, ������������� �� 1, ���������� ����� �������� ������� ���� ��������� (������)
flagWasSwap	- ����, �������� ��� �� ������ ���� ������������, ������������ ����� ����� ��������
n			- ������ ���������� � ������� ��������, ����������� �� 1 ����� �������� ������
startTime		- ������� ���������� �������, �������, ����������� � �� � ������������� ����� ������� setTime
*/
function sortBubbles (i = 0, flagWasSwap = false, n = arrD.length-1) {
		
	let flagWillSwapBubbles = false;
	
	if (arrD[i] > arrD[i+1]) {
		//������ ������� ��������
		let tempD = arrD[i];
		arrD[i] = arrD[i+1];
		arrD[i+1] = tempD;
		
		flagWasSwap = true;
		
		flagWillSwapBubbles = true;
	}
	
	setTimeout(function(i) 
	{
		let numberOfChecks = 0;
		//����� ���
		let nowStep = document.getElementById('nowStep');
		nowStep.textContent = numberOfChecks;
		
		let bubbles = contentBubbles.querySelectorAll('.bubble');
		let bubble1 = bubbles[i];
		let bubble2 = bubbles[i+1];
				
		//�������� ����
		bubble1.classList.add('bubbleInFocus');
		bubble2.classList.add('bubbleInFocus');
		
		setTimeout(function() 
		{		
			if (flagWillSwapBubbles) {
				//�������� ������������ ����
				bubble1.classList.add('bubbleFalse');
				bubble2.classList.add('bubbleFalse');
			}
			
			setTimeout(function() 
			{			
				if (flagWillSwapBubbles) {
					//������ ������� ����
					contentBubbles.removeChild(bubble2);
					let newPlaceBubble = contentBubbles.insertBefore(bubble2, bubble1);
					
					bubble1.classList.remove('bubbleFalse');
					bubble2.classList.remove('bubbleFalse');
				}
							
				//������� ��������� � �����
				bubble1.classList.remove('bubbleInFocus');
				bubble2.classList.remove('bubbleInFocus');
				numberOfChecks++;
			}, 300);
		}, 300);
	}, 300, i);
	
	i++;
	
	if (i === n) {
		//����� �� ���������� ����
		if (!flagWasSwap) {
			//�� ���� ������������
			//totalSteps.textContent = numberOfChecks;
			return;
		}
		//������������ ����, ������� ���� ���������� ������	
		i = 0;
		n--;
		flagWasSwap = false;
	}
	setTimeout(function(i) 
	{
		sortBubbles(i, flagWasSwap, n);
	}, 1000, i);
}


/*
�������� ���������,
����� �� ���� ����� ������ 1 ��� �������� ������ �����,
���������� �� ������ ���������, �� ���� ����� ���������� startTime � �������,

document �������� �� content

������� � ��������� ������� �������� ������� � ��������� � �������� ������������� �� �������,
�� ���� ����� ��������� �������, ������� ����� ����� 2 ������ �������
*/
