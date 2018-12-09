let	arrD = [];
	
function onLoadPage () {
	createBubble();
	sortBubbles();
}

function createBubble (i = 0) {
	 
	if (checkFreeSpace(i)) {
		//���� ��������� �����,
		let newBubble = createObject();
		
		editOptionsBubble(newBubble, i);
		addStyleBubble(newBubble, i);
		appendBubble(newBubble);
		
		i++;
		createBubble(i);
	}
}

/*������ div ��� �������� ����*/
function createObject () {
	return  document.createElement("div");
}

/*�������� ��������� �����*/
function checkFreeSpace(i) {
	let contentBubbles = document.querySelector('.contentBubbles');
	const contentWeight = contentBubbles.clientWidth,
		MIN_D = ((contentWeight > 1000) ? (Math.floor(contentWeight / 30)) : 20),
		MAX_D = ((contentWeight > 1000) ? (Math.floor(contentWeight / 10)) : 30),
		SPACE_D = 40;
		
	let newD = getRandomInt(MIN_D, MAX_D);
	
	let sumArrD = getSumArr() + newD + (SPACE_D * (i+1));
	
	let flagFreePlace = false;
	if ((contentWeight - sumArrD) > 0) {
		//���������� ����� �������� �������, ��� ����� � ���������� ��������� ����������
		addDtoArr(newD, i);
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

/*������ ������� - ����� ���� ���������
https://learn.javascript.ru/array-iteration */
function getSumArr () {
	// ��� ������� �������� ������� ��������� �������,
	// ������������� ��������� ���������� ������ ���������� �����
	let result = arrD.reduce(function(sum, current) {
	  return sum + current;
	}, 0);
	
	return result;
}

/*��������� ����� ������� � ������*/
function addDtoArr (D, i) {
	arrD[i] = D;
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

/*��������� ��������� div � ������� �� ��������*/
function appendBubble (bubble) {
	let contentBubbles = document.querySelector('.contentBubbles');
	contentBubbles.appendChild(bubble);
}

/*������ ������� 2 ���� � ���������, ����� �� ��� ������������
���������:
i			- ������� ���������, ������������� �� 1, ���������� ����� �������� ������� ���� ��������� (������)
flagWasSwap	- ����, �������� ��� �� ������ ���� ������������, ������������ ����� ����� ��������
n			- ������ ���������� � ������� ��������, ����������� �� 1 ����� �������� ������
*/
function sortBubbles (iL = 0, flagWasSwap = false, n = arrD.length-1) {
	let flagEnd = false;
	
	if (iL === n) {
		//����� �� ���������� ����
		if (!flagWasSwap) {
			//�� ���� ������������
			flagEnd = true;
		}
		else {
			//������������ ����, ������� ���� ���������� ������	
			iL = 0;
			n--;
			flagWasSwap = false;
		}
	}
	
	let iR = iL + 1;
	
	let flagSwappedBubbles = compareD(iL, iR);	//��������, ����� �� ������������
	if (flagSwappedBubbles) {
		flagWasSwap = true;	//�� ���� ������ ���� ������������
	}
	
	let timeoutMs = 300;
	
	setTimeout(function() 
	{
		let numberOfChecks = 0;
		//����� ���
		/*numberOfChecks++;
		let nowStep = document.getElementById('nowStep');
		nowStep.textContent = numberOfChecks;*/
					
		addClass(iL, iR, 'bubbleInFocus'); //�������� ����
		
		setTimeout(function() 
		{		
			if (flagSwappedBubbles) {
				addClass(iL, iR, 'bubbleFalse'); //�������� ������������ ����
			}
			
			setTimeout(function() 
			{			
				if (flagSwappedBubbles) {
					swappedBubbles(iL, iR); //������ ������� ����				
					removeClass(iL, iR, 'bubbleFalse'); //������� ��������� � �����, ������� ���� �������������
				}
				removeClass(iL, iR, 'bubbleInFocus'); //������� ��������� � �����
				
				if (flagEnd) {
					return;
				}
				sortBubbles(iR, flagWasSwap, n);
			}, timeoutMs);
		}, timeoutMs);
	}, timeoutMs);
}

function compareD (i1, i2) {
	let flagSwap = false;
	
	if (arrD[i1] > arrD[i2]) {
		//������ ������� ��������
		let tempD = arrD[i1];
		arrD[i1] = arrD[i2];
		arrD[i2] = tempD;
		
		flagSwap = true;
	}
	return flagSwap;
}

function addClass (iFrom, iTo, className) {
	let contentBubbles = document.querySelector('.contentBubbles');
	let bubbles = contentBubbles.querySelectorAll('.bubble');
	for (let i = iFrom; i <= iTo; i++) {
		bubbles[i].classList.add(className);
	}
}

function swappedBubbles (iB1, iB2) {
	let contentBubbles = document.querySelector('.contentBubbles');
	let bubbles = contentBubbles.querySelectorAll('.bubble');

	contentBubbles.removeChild(bubbles[iB2]);
	let newPlaceBubble = contentBubbles.insertBefore(bubbles[iB2], bubbles[iB1]);
}

function removeClass (iFrom, iTo, className) {
	let contentBubbles = document.querySelector('.contentBubbles');
	let bubbles = contentBubbles.querySelectorAll('.bubble');
	for (let i = iFrom; i <= iTo; i++) {
		bubbles[i].classList.remove(className);
	}
}