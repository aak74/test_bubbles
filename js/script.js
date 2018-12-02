var
	container = document.querySelector('.container'),
	contentWeight = container.clientWidth - 50,
	minD = 20,
	maxD = Math.floor(contentWeight / 10),
	countBubbles = 0,
	arrD = [];

// ���������� ��������� ����� ����� ����� min (������������) � max (�� ������� max)
// ������������� ������ Math.round() ���� ��� ������������� �������������!
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
	
function createBubbles () {
	//������ ������ ��������� �����
	
	var i = 0;
	var sumD = 0;
	var newD = 0;
	while (sumD < contentWeight) {
		newD = getRandomInt(minD, maxD);
		sumD += newD;
		sumD += 10; //���� �������
		if (sumD < contentWeight) {
			arrD[i] = newD;
			i++;
		}
	}
	countBubbles = i;
	
	//������ ���� � ���������������� ����������
	for (var i = 0; i < countBubbles; i++) {
		var newBubble = document.createElement("div");
		newBubble.classList.add('bubble');
		newBubble.style.width = arrD[i] + 'px';
		newBubble.style.height = arrD[i] + 'px';
		newBubble.style.borderRadius = arrD[i] + 'px';
		
		newBubble.textContent = arrD[i];
		container.appendChild(newBubble);
	}
	
	setTimeout("sortBubbles()", 3000);
}

function sortBubbles () {
	for (var i = 0; i < countBubbles-1; i++) {
		var f = 0;
		for (var j = 0; j < countBubbles-1-i; j++) {
			var bubbles = document.querySelectorAll('.bubble');
			
			//�������� ������������ ����
			bubbles[j].classList.add('bubbleInFocus');
			bubbles[j+1].classList.add('bubbleInFocus');
			
			if (arrD[j] > arrD[j+1]) {
				//������ ������� ��������
				var tempD = arrD[j];
				arrD[j] = arrD[j+1];
				arrD[j+1] = tempD;
				
				bubbles[j].classList.add('bubbleFalse');
				bubbles[j+1].classList.add('bubbleFalse');
				//������ ������� ����
				container.removeChild(bubbles[j+1]);
				var newPositionBubble = container.insertBefore(bubbles[j+1], bubbles[j]);
				
				f = 1;
			}
			bubbles[j].classList.remove('bubbleInFocus');
			bubbles[j].classList.remove('bubbleFalse');
			bubbles[j+1].classList.remove('bubbleInFocus');
			bubbles[j+1].classList.remove('bubbleFalse');
		}

		if (f === 0) {
			//�� ���� �� ������ ������ �� ������
			//�������� ������� �� ����������
			break;
		}
	}
}